import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft, 
  Brain, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
  BarChart3,
  DollarSign,
  Settings
} from 'lucide-react';

import StepCard from './components/StepCard';
import { aiMockService, availableStocks, aiModes } from './services/aiMock';

const App = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedStock, setSelectedStock] = useState(null);
  const [aiRecommendation, setAiRecommendation] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [userDecision, setUserDecision] = useState(null);
  const [tradeData, setTradeData] = useState(null);
  const [tradeResult, setTradeResult] = useState(null);
  const [aiMode, setAiMode] = useState('RECOMMEND');
  const [additionalData, setAdditionalData] = useState(null);

  const totalSteps = 6;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStockSelect = async (stock) => {
    setSelectedStock(stock);
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    const recommendation = await aiMockService.analyzeStock(stock.symbol);
    setAiRecommendation(recommendation);
    setIsAnalyzing(false);
    
    // Auto-advance to next step
    setTimeout(() => {
      setCurrentStep(2);
    }, 500);
  };

  const handleUserDecision = (decision) => {
    setUserDecision(decision);
    
    if (decision === 'buy') {
      setTradeData({
        symbol: selectedStock.symbol,
        action: 'BUY',
        quantity: 100,
        price: aiRecommendation.price,
        total: aiRecommendation.price * 100
      });
      setCurrentStep(4);
    } else if (decision === 'reject') {
      setCurrentStep(6);
    } else if (decision === 'more-data') {
      // Fetch additional data
      aiMockService.getAdditionalData(selectedStock.symbol)
        .then(data => {
          setAdditionalData(data);
          setCurrentStep(3);
        });
    }
  };

  const handleTradeConfirm = async (confirmed) => {
    if (confirmed) {
      const result = await aiMockService.executeTrade(tradeData);
      setTradeResult(result);
      setCurrentStep(6);
    } else {
      setCurrentStep(6);
    }
  };

  const resetFlow = () => {
    setCurrentStep(1);
    setSelectedStock(null);
    setAiRecommendation(null);
    setIsAnalyzing(false);
    setShowExplanation(false);
    setUserDecision(null);
    setTradeData(null);
    setTradeResult(null);
    setAdditionalData(null);
  };

  const getRecommendationIcon = (recommendation) => {
    switch (recommendation) {
      case 'BUY': return <TrendingUp className="w-6 h-6 text-green-600" />;
      case 'SELL': return <TrendingDown className="w-6 h-6 text-red-600" />;
      case 'HOLD': return <Minus className="w-6 h-6 text-yellow-600" />;
      default: return <Info className="w-6 h-6 text-gray-600" />;
    }
  };

  const getRecommendationColor = (recommendation) => {
    switch (recommendation) {
      case 'BUY': return 'bg-green-100 text-green-800 border-green-300';
      case 'SELL': return 'bg-red-100 text-red-800 border-red-300';
      case 'HOLD': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="glass-card border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold gradient-text text-shadow">
                AI Stock Recommendation Demo
              </h1>
              <p className="text-slate-600 text-lg mt-2">
                Interactive demonstration of AI-powered stock analysis
              </p>
            </div>
            
            {/* AI Mode Toggle */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Settings className="w-5 h-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-700">AI Mode:</span>
              </div>
              <div className="flex space-x-1 bg-white/50 backdrop-blur-sm rounded-xl p-1 border border-white/20">
                {Object.entries(aiModes).map(([key, mode]) => (
                  <button
                    key={key}
                    onClick={() => setAiMode(key)}
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300
                      ${aiMode === key 
                        ? mode.color + ' shadow-lg transform scale-105' 
                        : 'text-slate-600 hover:text-slate-800 hover:bg-white/30'
                      }
                    `}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="glass-card border-b border-white/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex items-center">
                <motion.div 
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold
                    ${step <= currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg' 
                      : 'bg-white/50 text-slate-400 border border-white/20'
                    }
                  `}
                  animate={step === currentStep ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  {step}
                </motion.div>
                {step < totalSteps && (
                  <div className={`
                    w-16 h-2 mx-3 rounded-full
                    ${step < currentStep 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
                      : 'bg-white/30'
                    }
                  `} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Stock Selection */}
          {currentStep === 1 && (
            <StepCard step={1} isActive={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Select a Stock to Analyze
                </h2>
                <p className="text-gray-600 mb-6">
                  Choose from our available stocks for AI-powered analysis
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {availableStocks.map((stock) => (
                    <motion.button
                      key={stock.symbol}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleStockSelect(stock)}
                      className="group p-6 bg-white/80 backdrop-blur-sm border border-white/30 rounded-2xl hover:border-blue-300/50 hover:bg-blue-50/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <div className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                        {stock.symbol}
                      </div>
                      <div className="text-sm text-slate-600 mt-1">
                        {stock.name}
                      </div>
                      <div className="text-xs text-slate-500 mt-2 bg-slate-100 px-2 py-1 rounded-full inline-block">
                        {stock.sector}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 2: AI Analysis */}
          {currentStep === 2 && (
            <StepCard step={2} isActive={true} isAIStep={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  AI Analysis Complete
                </h2>
                
                {isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex justify-center">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
                      />
                    </div>
                    <p className="text-gray-600">
                      AI is analyzing {selectedStock?.symbol}...
                    </p>
                  </div>
                ) : aiRecommendation && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center space-x-4">
                      {getRecommendationIcon(aiRecommendation.recommendation)}
                      <div className="text-center">
                        <div className={`
                          px-4 py-2 rounded-lg border-2 font-semibold text-lg
                          ${getRecommendationColor(aiRecommendation.recommendation)}
                        `}>
                          {aiRecommendation.recommendation}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Confidence: {aiRecommendation.confidence}%
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Price</span>
                        <span className="text-lg font-semibold text-gray-800">
                          ${aiRecommendation.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-700">Change</span>
                        <span className={`text-sm font-medium ${
                          aiRecommendation.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {aiRecommendation.change}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-center space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowExplanation(true)}
                        className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      >
                        Why This Recommendation?
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleNext}
                        className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-lg hover:shadow-xl font-semibold"
                      >
                        Continue
                      </motion.button>
                    </div>
                  </div>
                )}
              </div>
            </StepCard>
          )}

          {/* Step 3: User Decision */}
          {currentStep === 3 && (
            <StepCard step={3} isActive={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Make Your Decision
                </h2>
                <p className="text-gray-600 mb-6">
                  Based on the AI recommendation, what would you like to do?
                </p>

                {additionalData && (
                  <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
                    <h3 className="font-semibold text-blue-800 mb-2">Additional Market Data</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>Sector: {additionalData.sector}</div>
                      <div>Market Cap: {additionalData.marketCap}</div>
                      <div>P/E Ratio: {additionalData.peRatio}</div>
                      <div>Dividend: {additionalData.dividend}</div>
                      <div>Analyst Rating: {additionalData.analystRating}</div>
                      <div>Price Target: {additionalData.priceTarget}</div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUserDecision('buy')}
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Buy</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUserDecision('reject')}
                    className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Reject</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUserDecision('more-data')}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                  >
                    <BarChart3 className="w-5 h-5" />
                    <span>More Data</span>
                  </motion.button>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 4: Trade Confirmation */}
          {currentStep === 4 && (
            <StepCard step={4} isActive={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Confirm Your Trade
                </h2>
                <p className="text-gray-600 mb-6">
                  Please review and confirm your trade details
                </p>

                {tradeData && (
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Symbol:</span>
                        <span className="font-semibold">{tradeData.symbol}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Action:</span>
                        <span className="font-semibold text-green-600">{tradeData.action}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Quantity:</span>
                        <span className="font-semibold">{tradeData.quantity} shares</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per share:</span>
                        <span className="font-semibold">${tradeData.price}</span>
                      </div>
                      <div className="flex justify-between border-t pt-3">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-bold text-lg">${tradeData.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTradeConfirm(true)}
                    className="px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Confirm Trade</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleTradeConfirm(false)}
                    className="px-8 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
                  >
                    <XCircle className="w-5 h-5" />
                    <span>Cancel</span>
                  </motion.button>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 5: Trade Execution */}
          {currentStep === 5 && (
            <StepCard step={5} isActive={true} isAIStep={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Executing Trade
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
                    />
                  </div>
                  <p className="text-gray-600">
                    Processing your trade...
                  </p>
                </div>
              </div>
            </StepCard>
          )}

          {/* Step 6: Results */}
          {currentStep === 6 && (
            <StepCard step={6} isActive={true} className="bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Trade Complete
                </h2>

                {tradeResult ? (
                  <div className="space-y-6">
                    <div className={`p-6 rounded-lg ${
                      tradeResult.success 
                        ? 'bg-green-50 border border-green-200' 
                        : 'bg-red-50 border border-red-200'
                    }`}>
                      <div className="flex justify-center mb-4">
                        {tradeResult.success ? (
                          <CheckCircle className="w-12 h-12 text-green-500" />
                        ) : (
                          <XCircle className="w-12 h-12 text-red-500" />
                        )}
                      </div>
                      <p className={`text-lg font-semibold ${
                        tradeResult.success ? 'text-green-800' : 'text-red-800'
                      }`}>
                        {tradeResult.message}
                      </p>
                      {tradeResult.success && (
                        <p className="text-sm text-gray-600 mt-2">
                          Trade ID: {tradeResult.tradeId}
                        </p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <XCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-lg font-semibold text-gray-800">
                        Trade Cancelled
                      </p>
                      <p className="text-gray-600 mt-2">
                        No trade was executed
                      </p>
                    </div>
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFlow}
                  className="px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start New Analysis
                </motion.button>
              </div>
            </StepCard>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`
              px-6 py-2 rounded-lg flex items-center space-x-2 transition-all
              ${currentStep === 1 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-gray-500 text-white hover:bg-gray-600'
              }
            `}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentStep === totalSteps}
            className={`
              px-6 py-2 rounded-lg flex items-center space-x-2 transition-all
              ${currentStep === totalSteps 
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }
            `}
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* SHAP Explanation Modal */}
      {showExplanation && aiRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                AI Recommendation Explanation
              </h3>
              <button
                onClick={() => setShowExplanation(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Key Factors</h4>
                <div className="space-y-2">
                  {aiRecommendation.explanation.factors.map((factor, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700">{factor.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm font-medium ${
                          factor.impact.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {factor.impact}
                        </span>
                        <span className="text-xs text-gray-500">
                          {factor.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-3">Risk Factors</h4>
                <ul className="space-y-1">
                  {aiRecommendation.explanation.riskFactors.map((risk, index) => (
                    <li key={index} className="text-sm text-gray-700 flex items-center">
                      <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExplanation(false)}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default App;
