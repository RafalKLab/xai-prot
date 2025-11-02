// Mock AI service for stock recommendations
export const aiMockService = {
  // Simulate AI analysis delay
  async analyzeStock(stockSymbol) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockRecommendations = [
      {
        symbol: stockSymbol,
        recommendation: 'BUY',
        confidence: 84,
        price: 156.78,
        change: '+2.34%',
        explanation: {
          factors: [
            { name: 'Volume', impact: '+12%', description: 'Trading volume increased significantly' },
            { name: 'Sentiment', impact: '+8%', description: 'Positive news sentiment detected' },
            { name: 'Technical', impact: '+15%', description: 'Strong technical indicators' },
            { name: 'Earnings', impact: '+6%', description: 'Upcoming earnings beat expectations' },
            { name: 'Market', impact: '-3%', description: 'Overall market volatility' }
          ],
          riskFactors: [
            'High volatility period',
            'Sector rotation risk',
            'Interest rate sensitivity'
          ]
        }
      },
      {
        symbol: stockSymbol,
        recommendation: 'SELL',
        confidence: 76,
        price: 89.45,
        change: '-1.23%',
        explanation: {
          factors: [
            { name: 'Volume', impact: '-8%', description: 'Declining trading volume' },
            { name: 'Sentiment', impact: '-12%', description: 'Negative sentiment indicators' },
            { name: 'Technical', impact: '-18%', description: 'Bearish technical patterns' },
            { name: 'Earnings', impact: '-5%', description: 'Earnings miss expectations' },
            { name: 'Market', impact: '+2%', description: 'Market conditions improving' }
          ],
          riskFactors: [
            'Regulatory concerns',
            'Competition pressure',
            'Supply chain issues'
          ]
        }
      },
      {
        symbol: stockSymbol,
        recommendation: 'HOLD',
        confidence: 62,
        price: 234.12,
        change: '+0.45%',
        explanation: {
          factors: [
            { name: 'Volume', impact: '+3%', description: 'Stable trading volume' },
            { name: 'Sentiment', impact: '+1%', description: 'Neutral sentiment' },
            { name: 'Technical', impact: '-2%', description: 'Mixed technical signals' },
            { name: 'Earnings', impact: '+4%', description: 'Earnings in line with expectations' },
            { name: 'Market', impact: '+2%', description: 'Market conditions stable' }
          ],
          riskFactors: [
            'Uncertainty in sector',
            'Pending regulatory decisions',
            'Seasonal factors'
          ]
        }
      }
    ];
    
    return mockRecommendations[Math.floor(Math.random() * mockRecommendations.length)];
  },

  // Simulate trade execution
  async executeTrade(tradeData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = Math.random() > 0.1; // 90% success rate
    
    return {
      success,
      tradeId: `T${Date.now()}`,
      timestamp: new Date().toISOString(),
      message: success 
        ? 'Trade executed successfully!' 
        : 'Trade execution failed. Please try again.'
    };
  },

  // Get additional market data
  async getAdditionalData(stockSymbol) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      sector: 'Technology',
      marketCap: '$2.1T',
      peRatio: 28.5,
      dividend: '2.1%',
      analystRating: 'Overweight',
      priceTarget: '$180.00',
      volatility: 'Medium',
      beta: 1.2
    };
  }
};

// Available stocks for selection
export const availableStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
  { symbol: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
  { symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'E-commerce' },
  { symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
  { symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Social Media' },
  { symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Entertainment' }
];

// AI Mode configurations
export const aiModes = {
  RECOMMEND: {
    name: 'Recommend',
    description: 'AI provides recommendations, human decides',
    automationLevel: 20,
    color: 'bg-blue-100 text-blue-800'
  },
  ADVISOR: {
    name: 'Advisor', 
    description: 'AI advises with explanations, human confirms',
    automationLevel: 50,
    color: 'bg-yellow-100 text-yellow-800'
  },
  AUTO: {
    name: 'Auto',
    description: 'AI executes trades automatically',
    automationLevel: 90,
    color: 'bg-red-100 text-red-800'
  }
};
