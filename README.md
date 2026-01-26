# The Vanijya AI 🌾

- https://vanijya-ai.vercel.app/

An AI-powered platform that empowers India's local vendors by enabling **real-time multilingual communication**, **AI price discovery**, and **smart negotiation** inside local markets (mandis) using **Google Gemini AI** with **secure authentication** and **cloud data storage**.

![Vanijya Ai](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Gemini AI](https://img.shields.io/badge/Gemini_AI-Integrated-4285F4?style=for-the-badge&logo=google)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![NextAuth](https://img.shields.io/badge/NextAuth.js-Authentication-000000?style=for-the-badge&logo=next.js)

##  Features

###  **Secure Authentication System** ✨
- **Google OAuth Integration** with NextAuth.js
- **User Profile Management** with secure data storage
- **Protected Routes** and session management
- **MongoDB Integration** for persistent user data
- **Profile Setup Flow** after first login

###  **Real AI Integration** ✨
- **Google Gemini AI** for translation and market analysis
- **Live Speech Recognition** with AI enhancement
- **Smart Price Analysis** using real-time market intelligence
- **AI-Generated Market Insights** with comprehensive analysis
- **Dynamic Market Data** tailored to user queries
- **Context-Aware Translation** preserving cultural nuances

###  **Multilingual Communication**
- **Voice-First Interface**: Speak naturally in your native language
- **6 Languages Supported**: Hindi, Tamil, Telugu, Kannada, Marathi, English
- **Real-time AI Translation**: Gemini-powered context-aware translation
- **Cultural Intelligence**: Understands local market customs and phrases
- **Enhanced Speech Recognition**: AI-improved accuracy for agricultural terms

###  **Smart Market Analysis**
- **AI-Powered Market Data**: Gemini AI generates comprehensive market analysis
- **Dynamic Pricing Intelligence**: Real-time price analysis based on user queries
- **Weekly Trend Analysis**: AI-generated price trends with reasoning
- **Market Sentiment Analysis**: AI insights on market conditions
- **Strategic Recommendations**: Personalized advice for vendors
- **Risk Assessment**: AI-identified market risks and mitigation strategies

###  **Negotiation Assistant**
- **AI-Generated Phrases**: Culturally appropriate negotiation suggestions
- **Counter-offer Guidance**: Gemini AI-powered negotiation strategies
- **Context-aware Responses**: Situation-specific communication help
- **Multi-language Support**: Negotiation phrases in all supported languages

###  **Intelligent Dashboard**
- **Real-time Market Search**: Query any market for AI-generated insights
- **Interactive Commodity Analysis**: Click commodities for detailed trends
- **AI Market Intelligence**: Comprehensive market sentiment and predictions
- **Economic Factor Analysis**: Weather, inflation, and policy impacts
- **Nearby Market Comparisons**: AI-generated competitive analysis
- **Personalized Insights**: Tailored recommendations based on user profile

##  Tech Stack

### **Frontend**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Indian-inspired color palette
- **Animations**: Framer Motion for smooth micro-interactions
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### **Authentication & Security**
- **NextAuth.js**: Secure OAuth authentication
- **Google OAuth**: Social login integration
- **Session Management**: Secure user sessions
- **Protected Routes**: Authentication-based access control
- **Environment Security**: Secure API key management

### **Database & Storage**
- **MongoDB Atlas**: Cloud database for user data
- **User Profiles**: Secure storage of user information
- **Session Storage**: Persistent authentication state
- **Data Validation**: Server-side input validation
- **Connection Pooling**: Optimized database performance

### **AI Integration**
- **Google Gemini AI**: For translation, market analysis, and content generation
- **Web Speech API**: For voice recognition with AI enhancement
- **Real-time Processing**: Live translation and analysis capabilities
- **Intelligent Fallbacks**: Dynamic data generation when AI is unavailable
- **Market Intelligence**: AI-powered comprehensive market analysis

### **API Architecture**
- **Market Data API**: `/api/market-data` - AI-powered market analysis
- **Translation API**: `/api/translate` - Real-time text translation
- **Price Analysis API**: `/api/analyze-price` - AI-powered market analysis
- **Negotiation API**: `/api/negotiation-phrases` - Generate negotiation phrases
- **User Management API**: `/api/users/profile` - User data operations
- **Authentication API**: `/api/auth/*` - NextAuth.js endpoints

##  Design Philosophy

### Visual Identity
- **Color Palette**: Saffron, earth tones, and mandi green
- **Typography**: Inter for body text, Poppins for headings
- **UI Pattern**: Glassmorphism cards with soft gradients
- **Animations**: Subtle floating elements and smooth transitions

### User Experience
- **Mobile-First**: Optimized for low-end devices
- **Voice-First**: Large buttons and clear audio feedback
- **Accessibility**: High contrast, large fonts, screen reader friendly
- **AI-Enhanced**: Smart features that learn and adapt
- **Secure by Design**: Privacy-focused user experience

##  Pages Overview

###  **Landing Page** (`/`)
- Hero section with animated grain particles
- Feature highlights with glassmorphic cards
- Trust indicators and social proof
- Authentication-aware navigation

###  **Authentication Flow**
- **Sign In** (`/auth/signin`) - Google OAuth login
- **Profile Setup** (`/auth/profile-setup`) - User information collection
- **Protected Routes** - Automatic authentication checks

###  **AI Assistant** (`/demo`) - **AI-Powered**
- **Real Voice Recognition** with Gemini AI enhancement
- **Interactive Price Analysis** using live AI processing
- **AI-Generated Negotiation Phrases** in selected language
- **Market Insights** powered by Gemini AI
- **Accessible to all users** (no authentication required)

###  **Dashboard** (`/dashboard`) - **Protected Route**
- **AI Market Search**: Query any market for real-time analysis
- **Interactive Market Data**: AI-generated comprehensive insights
- **Dynamic Commodity Analysis**: Click-to-explore detailed trends
- **Market Intelligence**: AI sentiment analysis and predictions
- **Personalized Recommendations**: User-specific market advice
- **Economic Analysis**: Weather, policy, and economic factor impacts

###  **How It Works** (`/how-it-works`)
- Step-by-step process visualization
- AI technology explanations
- Authentication and security features
- Feature deep-dives with animations

###  **Impact** (`/impact`)
- Usage statistics and growth metrics
- Vendor testimonials in multiple languages
- India map with mandi coverage
- Mission and future goals

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- **MongoDB Atlas Account** (free tier available)
- **Google Cloud Console Account** for OAuth
- **Gemini AI API Key** (get from [Google AI Studio](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Naren1520/Vanijya-Ai.git
   cd multilingual-mandi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # Gemini AI Configuration
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # MongoDB Configuration
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=vanijya_ai
   
   # Application Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   NEXT_PUBLIC_APP_NAME=Vanijya AI
   ```

4. **Test database connection**
   ```bash
   npm run test:db
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🔧 Setup Guides

### AI Integration
For detailed AI integration setup, see [GEMINI_SETUP.md](./GEMINI_SETUP.md)

### Authentication Setup
For Google OAuth setup, see [GOOGLE_AUTH_SETUP.md](./GOOGLE_AUTH_SETUP.md)

### Database Setup
For MongoDB configuration, see [MONGODB_SETUP.md](./MONGODB_SETUP.md)

### Quick Setup Summary:
1. **AI**: Get API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Auth**: Configure Google OAuth in [Google Cloud Console](https://console.cloud.google.com/)
3. **Database**: Set up MongoDB Atlas cluster
4. **Test**: Use `/test-gemini` and `/api-test` pages for verification

##  Project Structure

```
multilingual-mandi/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # NextAuth.js authentication
│   │   │   ├── users/         # User management endpoints
│   │   │   ├── market-data/   # AI market analysis endpoint
│   │   │   ├── translate/     # Translation endpoint
│   │   │   ├── analyze-price/ # Price analysis endpoint
│   │   │   └── negotiation-phrases/ # Negotiation API
│   │   ├── auth/              # Authentication pages
│   │   │   ├── signin/        # Google OAuth login
│   │   │   └── profile-setup/ # User profile collection
│   │   ├── demo/              # AI-powered assistant (public)
│   │   ├── dashboard/         # AI market dashboard (protected)
│   │   ├── how-it-works/      # Process explanation
│   │   ├── impact/            # Impact metrics
│   │   ├── test-gemini/       # AI testing page
│   │   ├── layout.tsx         # Root layout with providers
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── AuthWrapper.tsx    # Authentication wrapper
│   │   ├── Providers.tsx      # Context providers
│   │   └── ui/                # Reusable UI components
│   │       ├── Navbar.tsx     # Navigation with auth
│   │       ├── Footer.tsx     # Footer component
│   │       ├── GlassCard.tsx  # Glassmorphic card
│   │       ├── VoiceButton.tsx # AI-enhanced voice input
│   │       └── MarketSuggestions.tsx # Market search suggestions
│   ├── contexts/
│   │   ├── AuthContext.tsx    # Authentication state
│   │   └── LanguageContext.tsx # Multilingual state
│   └── lib/
│       ├── auth.ts            # NextAuth configuration
│       ├── mongodb.ts         # Database connection
│       ├── gemini.ts          # Gemini AI integration
│       ├── speechRecognition.ts # Enhanced speech recognition
│       ├── translations.json   # Translation data
│       ├── types.ts           # TypeScript definitions
│       ├── models/            # Database models
│       └── services/          # Database services
├── public/                     # Static assets
├── scripts/                    # Utility scripts
├── .env.example               # Environment variables template
├── GEMINI_SETUP.md           # AI setup guide
├── GOOGLE_AUTH_SETUP.md      # Authentication setup guide
├── MONGODB_SETUP.md          # Database setup guide
├── tailwind.config.ts        # Tailwind configuration
└── package.json
```

##  AI Features in Detail

### **Smart Market Analysis**
- **Dynamic Data Generation**: AI creates market-specific insights
- **Comprehensive Analysis**: Market sentiment, trends, and predictions
- **Economic Intelligence**: Weather, inflation, and policy impacts
- **Strategic Recommendations**: Personalized vendor advice
- **Risk Assessment**: AI-identified risks with mitigation strategies

### **Intelligent Translation**
- **Context Preservation**: Maintains agricultural and market terminology
- **Cultural Adaptation**: Respects local customs and phrases
- **Real-time Processing**: Instant translation across 6 languages
- **Fallback System**: Static translations when AI is unavailable

### **Voice Recognition Enhancement**
- **Multi-language Support**: Recognizes speech in all supported languages
- **AI Post-processing**: Enhanced accuracy for agricultural terms
- **Noise Filtering**: Improved recognition in noisy environments
- **Context Understanding**: Better interpretation of market-specific vocabulary

##  Authentication & Security

### **Authentication Flow**
1. **Landing Page** → Sign In button for unauthenticated users
2. **Google OAuth** → Secure authentication via Google
3. **Profile Setup** → Collect user information (name, phone, address)
4. **Dashboard Access** → Full platform features available
5. **Session Management** → Persistent login across sessions

### **Security Features**
- **OAuth 2.0**: Industry-standard authentication
- **Secure Sessions**: NextAuth.js session management
- **Protected Routes**: Authentication-based access control
- **Data Encryption**: Secure storage of user information
- **Environment Security**: API keys and secrets protection

### **User Data Management**
- **Profile Storage**: MongoDB Atlas cloud storage
- **Data Validation**: Server-side input validation
- **Privacy Protection**: Secure handling of personal information
- **GDPR Compliance**: User data rights and protection

##  Database Architecture

### **User Collection Schema**
```typescript
{
  _id: ObjectId,
  id: string,           // Custom ID
  email: string,        // Google account email
  name: string,         // User's full name
  phone: string,        // Phone number
  address: string,      // Complete address
  googleId: string,     // Google OAuth ID
  avatar?: string,      // Profile picture URL
  createdAt: Date,      // Account creation date
  updatedAt: Date       // Last update date
}
```

### **Database Features**
- **MongoDB Atlas**: Cloud-hosted database
- **Connection Pooling**: Optimized performance
- **Data Validation**: Schema enforcement
- **Backup & Recovery**: Automated cloud backups
- **Scalability**: Auto-scaling based on usage

##  Multilingual Support

The platform supports 6 major Indian languages with AI-powered translation:

| Language | Native Script | Code | AI Translation | Authentication |
|----------|---------------|------|----------------|----------------|
| English | English | `en` | ✅ Gemini AI | ✅ Supported |
| Hindi | हिंदी | `hi` | ✅ Gemini AI | ✅ Supported |
| Tamil | தமிழ் | `ta` | ✅ Gemini AI | ✅ Supported |
| Telugu | తెలుగు | `te` | ✅ Gemini AI | ✅ Supported |
| Kannada | ಕನ್ನಡ | `kn` | ✅ Gemini AI | ✅ Supported |
| Marathi | मराठी | `mr` | ✅ Gemini AI | ✅ Supported |

##  Security & Performance

### **Security**
- **OAuth 2.0 Authentication**: Secure Google login
- **Environment Variable Protection**: API keys and secrets security
- **Rate Limiting**: AI API call protection
- **Input Validation**: Server-side data sanitization
- **Session Security**: Secure cookie management
- **Database Security**: MongoDB Atlas encryption

### **Performance**
- **Connection Pooling**: Optimized database connections
- **AI Request Caching**: Efficient API usage
- **Progressive Loading**: Optimized user experience
- **Bundle Optimization**: Minimized JavaScript payload
- **CDN Integration**: Fast asset delivery

##  Color Palette

```css
/* Saffron Shades */
--saffron-500: #f97316;
--saffron-600: #ea580c;

/* Earth Tones */
--earth-500: #b8915a;
--earth-800: #70533a;

/* Mandi Colors */
--mandi-green: #22c55e;
--mandi-brown: #8b5a3c;
--mandi-cream: #fef7ed;
```

##  Current Features (Production Ready)

### **Completed Features** ✅
- [x] **Google OAuth Authentication** with NextAuth.js
- [x] **MongoDB Integration** for user data storage
- [x] **Real AI Integration** (Gemini AI)
- [x] **Live Speech Recognition** with AI enhancement
- [x] **Real-time Translation** capabilities
- [x] **AI Market Analysis** with comprehensive insights
- [x] **Interactive Dashboard** with market search
- [x] **User Profile Management** with secure storage
- [x] **Protected Routes** and session management
- [x] **Multilingual Support** across all pages
- [x] **Responsive Design** for all devices
- [x] **Production Deployment** ready

### **Future Enhancements**
- [ ] Live market data feeds integration
- [ ] Push notifications for price alerts
- [ ] Advanced AI models for better accuracy
- [ ] Direct buyer-seller connections
- [ ] Payment integration
- [ ] Inventory management with AI insights
- [ ] Quality assessment using computer vision
- [ ] Logistics coordination with AI optimization

##  Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Google Gemini AI** for powerful language processing capabilities
- **MongoDB Atlas** for reliable cloud database services
- **NextAuth.js** for secure authentication solutions
- Inspired by the hardworking vendors in India's mandis
- Built with love for inclusive technology
- Designed to bridge language barriers and promote fair trade

##  Developer 

- **Name**: Naren S J
- **Email**: narensonu1520@gmail.com
- **Contact**: 8296833381
- **Portfolio**: https://narensj.netlify.app
- **LinkedIn**: https://www.linkedin.com/in/narensj20

---