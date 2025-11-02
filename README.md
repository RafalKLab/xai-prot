# AI Stock Recommendation Demo

An interactive front-end demonstration of an AI-powered stock recommendation system that visualizes the user flow from stock selection to trade execution.

## 🚀 Features

- **6-Step Interactive Flow**: Complete user journey from stock selection to trade completion
- **AI Simulation**: Mock AI analysis with realistic delays and explanations
- **SHAP-style Explanations**: Detailed breakdown of AI decision factors
- **Human-in-the-Loop**: Trade confirmation step demonstrating AI augmentation
- **Multiple AI Modes**: Toggle between Recommend, Advisor, and Auto modes
- **Modern UI**: Clean, responsive design with smooth animations
- **Progress Tracking**: Visual progress bar and step indicators

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icons

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## 🎯 User Flow

1. **Stock Selection** - Choose from available stocks
2. **AI Analysis** - Watch AI analyze the selected stock
3. **User Decision** - Make a decision based on AI recommendation
4. **Trade Confirmation** - Confirm trade details (Human-in-the-Loop)
5. **Trade Execution** - AI processes the trade
6. **Results** - View trade outcome

## 🎨 Design Features

- **Color-coded Steps**: 
  - 🟢 Green: User actions
  - 🟡 Yellow: AI processing steps
  - ⚪ Grey: Decision points
- **Animated AI Steps**: Pulsing glow effect for AI processing
- **Responsive Design**: Works on desktop and mobile
- **Smooth Transitions**: Framer Motion animations throughout

## 🔧 Customization

### Adding New Stocks
Edit `src/services/aiMock.js` and add to the `availableStocks` array:

```javascript
{ symbol: 'NEW', name: 'New Company Inc.', sector: 'Technology' }
```

### Modifying AI Recommendations
Update the `analyzeStock` function in `aiMockService` to change recommendation logic.

### Styling Changes
Modify `tailwind.config.js` to customize colors, animations, and design tokens.

## 📱 Responsive Design

The app is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎭 AI Modes

- **Recommend Mode**: AI provides recommendations, human decides
- **Advisor Mode**: AI advises with explanations, human confirms
- **Auto Mode**: AI executes trades automatically (simulated)

## 🚀 Deployment

Build for production:
```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment to any static hosting service.

## 📄 License

MIT License - feel free to use this demo for your projects!
