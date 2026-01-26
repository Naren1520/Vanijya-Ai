// Speech Recognition Service using Web Speech API and Gemini AI for enhancement

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  language: string;
}

export class VoiceRecognitionService {
  private recognition: any;
  private isListening: boolean = false;
  private currentLanguage: string = 'en';

  constructor() {
    if (typeof window !== 'undefined') {
      // Check for browser support
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.setupRecognition();
      }
    }
  }

  private setupRecognition() {
    if (!this.recognition) return;

    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.maxAlternatives = 1;
  }

  // Language mapping for speech recognition
  private getRecognitionLanguage(langCode: string): string {
    const langMap: { [key: string]: string } = {
      'en': 'en-US',
      'hi': 'hi-IN',
      'ta': 'ta-IN',
      'te': 'te-IN',
      'kn': 'kn-IN',
      'mr': 'mr-IN'
    };
    return langMap[langCode] || 'en-US';
  }

  public setLanguage(language: string) {
    this.currentLanguage = language;
    if (this.recognition) {
      this.recognition.lang = this.getRecognitionLanguage(language);
    }
  }

  public isSupported(): boolean {
    return !!this.recognition;
  }

  public async startListening(): Promise<SpeechRecognitionResult> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        reject(new Error('Speech recognition not supported'));
        return;
      }

      if (this.isListening) {
        reject(new Error('Already listening'));
        return;
      }

      this.isListening = true;
      this.recognition.lang = this.getRecognitionLanguage(this.currentLanguage);

      let finalTranscript = '';
      let confidence = 0;
      let hasResolved = false;

      // Set a timeout to prevent indefinite listening
      const timeout = setTimeout(() => {
        if (!hasResolved) {
          hasResolved = true;
          this.isListening = false;
          if (this.recognition) {
            this.recognition.stop();
          }
          resolve({
            transcript: finalTranscript || '',
            confidence: confidence,
            language: this.currentLanguage
          });
        }
      }, 5000); // 5 second timeout

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          confidence = event.results[i][0].confidence || 0.8;
          
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // If we have a final result, resolve immediately
        if (finalTranscript && !hasResolved) {
          hasResolved = true;
          clearTimeout(timeout);
          this.isListening = false;
          resolve({
            transcript: finalTranscript.trim(),
            confidence: confidence,
            language: this.currentLanguage
          });
        }
      };

      this.recognition.onerror = (event: any) => {
        if (!hasResolved) {
          hasResolved = true;
          clearTimeout(timeout);
          this.isListening = false;
          
          // Handle specific error types gracefully
          if (event.error === 'no-speech') {
            // No speech detected - resolve with empty result instead of rejecting
            resolve({
              transcript: '',
              confidence: 0,
              language: this.currentLanguage
            });
          } else if (event.error === 'audio-capture') {
            reject(new Error('Microphone access denied. Please allow microphone access and try again.'));
          } else if (event.error === 'not-allowed') {
            reject(new Error('Microphone permission denied. Please enable microphone access in your browser settings.'));
          } else if (event.error === 'network') {
            reject(new Error('Network error. Please check your internet connection.'));
          } else {
            reject(new Error(`Speech recognition error: ${event.error}`));
          }
        }
      };

      this.recognition.onend = () => {
        if (!hasResolved) {
          hasResolved = true;
          clearTimeout(timeout);
          this.isListening = false;
          // If no final transcript was captured, resolve with empty result
          resolve({
            transcript: finalTranscript || '',
            confidence: confidence,
            language: this.currentLanguage
          });
        }
      };

      try {
        this.recognition.start();
      } catch (error) {
        hasResolved = true;
        clearTimeout(timeout);
        this.isListening = false;
        reject(error);
      }
    });
  }

  public stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  public getIsListening(): boolean {
    return this.isListening;
  }
}

// Singleton instance
let voiceService: VoiceRecognitionService | null = null;

export const getVoiceRecognitionService = (): VoiceRecognitionService => {
  if (!voiceService) {
    voiceService = new VoiceRecognitionService();
  }
  return voiceService;
};

// Enhanced speech recognition with Gemini AI for better accuracy
export async function enhancedSpeechRecognition(
  rawTranscript: string,
  language: string,
  context: string = 'agricultural products'
): Promise<string> {
  // If no Gemini API key, return raw transcript
  if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
    console.log('No Gemini API key found, using raw transcript');
    return rawTranscript;
  }

  try {
    const { getGeminiModel, languageMap } = await import('./gemini');
    const model = getGeminiModel();
    const langName = languageMap[language as keyof typeof languageMap] || 'English';
    
    const prompt = `You are helping improve speech recognition accuracy for Indian agricultural market conversations.
    
    Raw speech transcript: "${rawTranscript}"
    Language: ${langName}
    Context: ${context}
    
    Please correct any obvious speech recognition errors and return the most likely intended text.
    Consider common agricultural product names, market terminology, and natural speech patterns.
    
    Return only the corrected text, no explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const correctedText = response.text().trim();
    
    // Return corrected text if it seems reasonable, otherwise return original
    return correctedText.length > 0 && correctedText.length < rawTranscript.length * 3 
      ? correctedText 
      : rawTranscript;
  } catch (error) {
    console.error('Enhanced speech recognition error:', error);
    
    // Check if it's an API key or model error
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('not found')) {
        console.log('Gemini API issue, using raw transcript');
      } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
        console.log('Gemini API rate limit reached, using raw transcript');
      }
    }
    
    return rawTranscript;
  }
}