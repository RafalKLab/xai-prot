import React from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, TrendingDown, Minus, Info, CheckCircle, XCircle, Clock } from 'lucide-react';

const StepCard = ({ 
  step, 
  isActive, 
  isCompleted, 
  isAIStep, 
  children, 
  className = '' 
}) => {
  const getStepIcon = () => {
    switch (step) {
      case 1: return <TrendingUp className="w-6 h-6" />;
      case 2: return <Brain className="w-6 h-6" />;
      case 3: return <Info className="w-6 h-6" />;
      case 4: return <CheckCircle className="w-6 h-6" />;
      case 5: return <Clock className="w-6 h-6" />;
      case 6: return <CheckCircle className="w-6 h-6" />;
      default: return <Minus className="w-6 h-6" />;
    }
  };

  const getStepColor = () => {
    if (isCompleted) return 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-lg';
    if (isAIStep) return 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg';
    return 'bg-gradient-to-r from-slate-200 to-slate-300 text-slate-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`
        relative p-8 rounded-2xl shadow-xl border border-white/20 transition-all duration-300
        ${isActive ? 'border-blue-300/50 shadow-2xl bg-white/90 backdrop-blur-sm' : 'bg-white/70 backdrop-blur-sm'}
        ${isAIStep && isActive ? 'animate-pulse-glow ai-glow-effect active' : ''}
        ${className}
      `}
    >
      {/* Step Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`
            w-10 h-10 rounded-full flex items-center justify-center
            ${getStepColor()}
          `}>
            {getStepIcon()}
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-800">
              Step {step}
            </h3>
            {isAIStep && (
              <span className="text-sm text-orange-600 font-semibold bg-orange-100 px-2 py-1 rounded-full">
                AI Processing
              </span>
            )}
          </div>
        </div>
        
        {isCompleted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <CheckCircle className="w-6 h-6 text-success-green" />
          </motion.div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-4">
        {children}
      </div>

      {/* AI Glow Effect */}
      {isAIStep && isActive && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-yellow-200/20 to-orange-200/20 pointer-events-none" />
      )}
    </motion.div>
  );
};

export default StepCard;
