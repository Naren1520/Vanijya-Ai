# The Vanijya Ai 🌾

An AI-powered platform that empowers India's local vendors by enabling real-time multilingual communication, AI price discovery, and smart negotiation inside local markets (mandis).

![Vanijya Ai](https://img.shields.io/badge/Next.js-16.1.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🚀 Features

### 🗣️ Multilingual Communication
- **Voice-First Interface**: Speak naturally in your native language
- **6 Languages Supported**: Hindi, Tamil, Telugu, Kannada, Marathi, English
- **Real-time Translation**: AI-powered context-aware translation
- **Cultural Intelligence**: Understands local market customs and phrases

### 💰 Smart Price Discovery
- **AI Price Recommendations**: Fair price suggestions based on real-time market data
- **Market Comparison**: Compare prices across nearby mandis
- **Demand Indicators**: High/Medium/Low demand analysis
- **Trend Analysis**: Price movement predictions and seasonal patterns

### 🤝 Negotiation Assistant
- **Local Language Phrases**: Culturally appropriate negotiation suggestions
- **Counter-offer Guidance**: AI-powered negotiation strategies
- **Context-aware Responses**: Situation-specific communication help

### 📊 Vendor Dashboard
- **Performance Analytics**: Track daily and weekly price trends
- **Market Insights**: AI-powered recommendations for optimal selling
- **Nearby Mandi Comparison**: Real-time price comparison across locations
- **Best Time to Sell**: Data-driven timing recommendations

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Indian-inspired color palette
- **Animations**: Framer Motion for smooth micro-interactions
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **UI Design**: Glassmorphism with earthy Indian color scheme

## 🎨 Design Philosophy

### Visual Identity
- **Color Palette**: Saffron, earth tones, and mandi green
- **Typography**: Inter for body text, Poppins for headings
- **UI Pattern**: Glassmorphism cards with soft gradients
- **Animations**: Subtle floating elements and smooth transitions

### User Experience
- **Mobile-First**: Optimized for low-end devices
- **Voice-First**: Large buttons and clear audio feedback
- **Accessibility**: High contrast, large fonts, screen reader friendly
- **Offline Capable**: Core features work without internet

##  Pages Overview

###  Landing Page (`/`)
- Hero section with animated grain particles
- Feature highlights with glassmorphic cards
- Trust indicators and social proof
- Call-to-action for demo and onboarding

###  Live Demo (`/demo`)
- Interactive voice input with ripple animations
- Language selection interface
- Real-time price analysis display
- Negotiation phrase suggestions

###  Dashboard (`/dashboard`)
- Vendor performance metrics
- Weekly price trend charts
- AI-powered insights and recommendations
- Nearby mandi comparison

###  How It Works (`/how-it-works`)
- Step-by-step process visualization
- Technology explanations
- Feature deep-dives with animations

###  Impact (`/impact`)
- Usage statistics and growth metrics
- Vendor testimonials in multiple languages
- India map with mandi coverage
- Mission and future goals

##  Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multilingual-mandi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

##  Project Structure

```
multilingual-mandi/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── demo/              # Live demo page
│   │   ├── dashboard/         # Vendor dashboard
│   │   ├── how-it-works/      # Process explanation
│   │   ├── impact/            # Impact metrics
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   └── ui/                # Reusable UI components
│   │       ├── Navbar.tsx     # Navigation component
│   │       ├── Footer.tsx     # Footer component
│   │       ├── GlassCard.tsx  # Glassmorphic card
│   │       └── VoiceButton.tsx # Voice input button
│   └── lib/
│       ├── types.ts           # TypeScript type definitions
│       └── mockData.ts        # Mock API data and functions
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind CSS configuration
└── package.json
```

##  Key Components

### GlassCard
Reusable glassmorphic card component with hover effects and optional AI glow.

### VoiceButton
Interactive voice input button with ripple animations and recording states.

### Navbar
Responsive navigation with language selector and mobile menu.

### Mock Data System
Comprehensive mock data structure for:
- Price recommendations
- Negotiation suggestions
- Vendor analytics
- Market comparisons

## 🌐 Multilingual Support

The platform supports 6 major Indian languages:

| Language | Native Script | Code |
|----------|---------------|------|
| English | English | `en` |
| Hindi | हिंदी | `hi` |
| Tamil | தமிழ் | `ta` |
| Telugu | తెలుగు | `te` |
| Kannada | ಕನ್ನಡ | `kn` |
| Marathi | मराठी | `mr` |

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

##  Future Enhancements

### Phase 2 Features
- [ ] Real AI integration (speech recognition, translation)
- [ ] Live market data feeds
- [ ] Vendor authentication system
- [ ] Push notifications for price alerts
- [ ] Offline data synchronization

### Phase 3 Features
- [ ] Direct buyer-seller connections
- [ ] Payment integration
- [ ] Inventory management
- [ ] Quality assessment tools
- [ ] Logistics coordination

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- Inspired by the hardworking vendors in India's mandis
- Built with love for inclusive technology
- Designed to bridge language barriers and promote fair trade


## Developer 

- Name      ->Naren S J
- Email     ->narensonu1520@gmail.com
- contact   ->8296833381
- Portfolio -> https://narensj.netlify.app
- Linkedin  -> https://www.linkedin.com/in/narensj20

---