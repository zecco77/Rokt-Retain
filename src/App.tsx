import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, RefreshCw, HandCoins, Info, ShieldCheck, CheckCircle2, Loader2, Sparkles } from 'lucide-react';

export default function App() {
  const [isRoktMode, setIsRoktMode] = useState(true);
  const [returnReason, setReturnReason] = useState<string>('');
  const [processState, setProcessState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [successData, setSuccessData] = useState({ title: '', desc: '' });
  const [selectedOffer, setSelectedOffer] = useState<'exchange' | 'keep' | 'partner' | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleReasonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setReturnReason(e.target.value);
    setSelectedOffer(null);
  };

  const handleAction = (title: string, desc: string) => {
    setProcessState('loading');
    setTimeout(() => {
      setSuccessData({ title, desc });
      setProcessState('success');
    }, 1500);
  };

  const handleConfirmAction = () => {
    if (selectedOffer === 'exchange') {
      handleAction('Exchange Initiated', 'Your $10 bonus credit has been applied to your account. Select your new size.');
    } else if (selectedOffer === 'keep') {
      handleAction('Offer Accepted', 'You kept the item. A 20% partial refund has been issued to your original payment method.');
    } else if (selectedOffer === 'partner') {
      handleAction('Offer Claimed', 'Your HelloFresh offer has been added to your account. Check your email for details on how to redeem. Your refund has also been processed.');
    } else {
      handleAction('Refund Processed', 'Your full refund has been initiated. You will receive an email confirmation shortly.');
    }
  };

  const resetState = () => {
    setIsRoktMode(true);
    setReturnReason('');
    setSelectedOffer(null);
    setProcessState('idle');
  };

  const showRoktModule = isRoktMode && returnReason !== '';

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-rokt-magenta/20">
      {/* Top Rokt Nav Bar */}
      <header className="glass-header-dark text-white px-6 py-4 flex items-center justify-between z-20 sticky top-0">
        <div className="flex items-center gap-8">
          <img 
            src="https://cdn.prod.website-files.com/65fde97097a89753eefc6b3d/6647c57384cad4dbf8aecf64_rokt-logo.svg" 
            alt="Rokt" 
            className="h-5 md:h-6 brightness-0 invert opacity-90"
          />
          <nav className="hidden md:flex gap-6 text-[13px] font-medium text-white/70">
            <span className="cursor-pointer hover:text-white transition-colors">Products</span>
            <span className="cursor-pointer hover:text-white transition-colors">Resources</span>
            <span className="cursor-pointer hover:text-white transition-colors">Company</span>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-white/10 px-4 py-1.5 rounded-full text-[11px] font-semibold text-white uppercase tracking-widest border border-white/20 backdrop-blur-md">
            Prototype Demo
          </div>
        </div>
      </header>

      {/* Prototype Control Bar */}
      <div className="glass-header-light px-6 py-4 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h1 className="font-semibold text-gray-900 text-base">Rokt Retain</h1>
          <p className="text-[13px] text-gray-500 mt-0.5">Exploring the returns moment as an untapped Transaction Moment.</p>
        </div>
        
        <div className="flex items-center bg-black/5 p-1 rounded-full border border-black/5 shadow-inner">
          <button
            onClick={() => { setIsRoktMode(false); setReturnReason(''); }}
            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
              !isRoktMode 
                ? 'bg-white text-gray-900 shadow-sm border border-black/5' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
            }`}
          >
            Standard Flow
          </button>
          <button
            onClick={() => { setIsRoktMode(true); setReturnReason(''); }}
            className={`px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-300 ${
              isRoktMode 
                ? 'bg-rokt-magenta text-white shadow-md' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-black/5'
            }`}
          >
            With Rokt Retain
          </button>
        </div>
      </div>

      {/* Main Content Area - The Mock eCommerce Site */}
      <main className="flex-grow flex items-start justify-center p-6 sm:p-12 z-0">
        <div className="w-full max-w-3xl glass-panel rounded-[2rem] overflow-hidden">
          {/* eCommerce Header */}
          <div className="px-8 py-7 border-b border-black/5 flex items-center justify-between bg-white/30">
            <div className="font-serif text-2xl font-semibold tracking-tight text-gray-900">Acme Studio</div>
            <div className="text-[13px] font-medium text-gray-500 bg-white/50 px-3 py-1 rounded-full border border-black/5 shadow-sm">Order #8472-B93</div>
          </div>

          <div className="p-8 sm:p-10 relative">
            <AnimatePresence mode="wait">
              {processState === 'success' ? (
                <motion.div
                  key="success-state"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6 shadow-sm border border-green-500/20">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h2 className="text-[22px] font-semibold text-gray-900 mb-3 tracking-tight">{successData.title}</h2>
                  <p className="text-gray-500 text-[14px] max-w-sm mb-8 leading-relaxed">
                    {successData.desc}
                  </p>
                  <button
                    onClick={resetState}
                    className="apple-button-primary px-8 py-3 rounded-xl text-[14px] font-medium"
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="text-[22px] font-semibold text-gray-900 mb-8 tracking-tight">Start a Return</h2>
                  
                  {/* Item Summary */}
                  <div className="flex gap-6 mb-8 p-5 bg-white/40 rounded-2xl border border-white/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
                    <div className="h-24 w-24 bg-black/5 rounded-xl overflow-hidden shrink-0 flex items-center justify-center border border-black/5 shadow-inner">
                      <span className="text-gray-400 text-xs font-medium uppercase tracking-wider">Image</span>
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="font-medium text-gray-900 text-[15px]">Merino Wool Crewneck Sweater</h3>
                      <p className="text-gray-500 text-[13px] mt-1.5">Color: Charcoal &nbsp;&middot;&nbsp; Size: Medium</p>
                      <p className="font-semibold text-gray-900 mt-2.5">$128.00</p>
                    </div>
                  </div>

                  {/* Return Form */}
                  <div className="mb-10 space-y-5">
                    <div>
                      <label htmlFor="reason" className="block text-[13px] font-medium text-gray-600 mb-2.5 ml-1">
                        Why are you returning this item?
                      </label>
                      <div className="relative group">
                        <select
                          id="reason"
                          value={returnReason}
                          onChange={handleReasonChange}
                          className="block w-full appearance-none rounded-xl apple-input px-4 py-3.5 pr-10 text-[15px] text-gray-900 focus:outline-none cursor-pointer"
                        >
                          <option value="" disabled>Select a reason...</option>
                          <option value="too-small">Too small</option>
                          <option value="too-large">Too large</option>
                          <option value="didnt-like">Didn't like the style/color</option>
                          <option value="defective">Item was defective/damaged</option>
                          <option value="other">Other</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 group-hover:text-gray-600 transition-colors">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="comments" className="block text-[13px] font-medium text-gray-600 mb-2.5 ml-1">
                        Additional details (optional)
                      </label>
                      <textarea
                        id="comments"
                        rows={3}
                        className="block w-full rounded-xl apple-input px-4 py-3 text-[15px] text-gray-900 focus:outline-none resize-none"
                        placeholder="Tell us more about why you're returning this..."
                      />
                    </div>
                  </div>

                  {/* Action Area */}
                  <div className="space-y-6">
                    <AnimatePresence mode="wait">
                      {showRoktModule && (
                        <motion.div
                          key="rokt-module"
                          initial={{ opacity: 0, height: 0, y: 15 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -15 }}
                          transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 pb-8 border-t border-black/5">
                            <div className="flex items-center justify-between mb-5">
                              <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4 text-rokt-magenta drop-shadow-sm" />
                                Wait, before you go...
                              </h4>
                              <button 
                                onClick={() => setShowInfo(!showInfo)}
                                className="text-[11px] font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1.5 transition-colors bg-black/5 px-2.5 py-1 rounded-full border border-black/5"
                              >
                                <Info className="w-3.5 h-3.5" />
                                Why am I seeing this?
                              </button>
                            </div>

                            <AnimatePresence>
                              {showInfo && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                                  animate={{ opacity: 1, height: 'auto', marginBottom: 20 }}
                                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                  className="overflow-hidden"
                                >
                                  <div className="text-[13px] text-gray-500 bg-black/5 p-4 rounded-xl border border-black/5">
                                    Rokt Brain™ analyzes real-time signals to provide personalized offers that provide a better return experience for you, and help us retain revenue.
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                              {/* Offer 1: Exchange */}
                              <div 
                                onClick={() => setSelectedOffer('exchange')}
                                className={`rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer transition-all duration-300 ${
                                  selectedOffer === 'exchange' ? 'bg-gray-900 shadow-xl scale-[1.02] border border-gray-900' : 'bg-white shadow-sm hover:shadow-md border border-black/5'
                                }`}
                              >
                                <div className="absolute top-0 right-0 bg-rokt-magenta text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-xl z-10 shadow-sm flex items-center gap-1.5 uppercase tracking-wide">
                                  <Sparkles className="w-3 h-3" />
                                  Highly Recommended
                                </div>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-5 border mt-2 transition-colors ${selectedOffer === 'exchange' ? 'bg-white/10 text-white border-white/20' : 'bg-blue-50 text-blue-500 border-blue-100/50'}`}>
                                  <RefreshCw className="w-5 h-5" />
                                </div>
                                <h5 className={`font-semibold mb-2 text-[15px] tracking-tight transition-colors ${selectedOffer === 'exchange' ? 'text-white' : 'text-gray-900'}`}>Exchange instead</h5>
                                <p className={`text-[13px] mb-6 flex-grow leading-relaxed transition-colors ${selectedOffer === 'exchange' ? 'text-gray-300' : 'text-gray-500'}`}>Swap for a different size and get a <strong className={`font-semibold transition-colors ${selectedOffer === 'exchange' ? 'text-white' : 'text-gray-800'}`}>$10 bonus credit</strong> towards your next purchase.</p>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedOffer('exchange'); handleAction('Exchange Initiated', 'Your $10 bonus credit has been applied to your account. Select your new size.'); }}
                                  className={`w-full py-2.5 rounded-xl text-[13px] font-semibold text-center transition-colors ${
                                    selectedOffer === 'exchange' ? 'bg-rokt-magenta text-white' : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  Exchange Item
                                </button>
                              </div>

                              {/* Offer 2: Keep It */}
                              <div 
                                onClick={() => setSelectedOffer('keep')}
                                className={`rounded-3xl p-6 flex flex-col h-full group relative overflow-hidden cursor-pointer transition-all duration-300 ${
                                  selectedOffer === 'keep' ? 'bg-gray-900 shadow-xl scale-[1.02] border border-gray-900' : 'bg-white shadow-sm hover:shadow-md border border-black/5'
                                }`}
                              >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-5 border transition-colors ${selectedOffer === 'keep' ? 'bg-white/10 text-white border-white/20' : 'bg-green-50 text-green-500 border-green-100/50'}`}>
                                  <HandCoins className="w-5 h-5" />
                                </div>
                                <h5 className={`font-semibold mb-2 text-[15px] tracking-tight transition-colors ${selectedOffer === 'keep' ? 'text-white' : 'text-gray-900'}`}>Keep it for less</h5>
                                <p className={`text-[13px] mb-6 flex-grow leading-relaxed transition-colors ${selectedOffer === 'keep' ? 'text-gray-300' : 'text-gray-500'}`}>Accept a <strong className={`font-semibold transition-colors ${selectedOffer === 'keep' ? 'text-white' : 'text-gray-800'}`}>20% partial refund</strong> right now and skip the hassle of shipping it back.</p>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedOffer('keep'); handleAction('Offer Accepted', 'You kept the item. A 20% partial refund has been issued to your original payment method.'); }}
                                  className={`w-full py-2.5 rounded-xl text-[13px] font-semibold text-center transition-colors ${
                                    selectedOffer === 'keep' ? 'bg-rokt-magenta text-white' : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  Accept 20% Refund
                                </button>
                              </div>

                              {/* Offer 3: Partner Offer (Rokt Network) */}
                              <div 
                                onClick={() => setSelectedOffer('partner')}
                                className={`rounded-3xl p-6 flex flex-col h-full relative overflow-hidden cursor-pointer transition-all duration-300 ${
                                  selectedOffer === 'partner' ? 'bg-gray-900 shadow-xl scale-[1.02] border border-gray-900' : 'bg-white shadow-sm hover:shadow-md border border-black/5'
                                }`}
                              >
                                <div className="flex items-center gap-2.5 mb-5 mt-2">
                                  <div className="w-8 h-8 bg-[#93C94E] rounded-full flex items-center justify-center text-white font-bold text-[11px]">HF</div>
                                  <span className={`text-[11px] font-bold uppercase tracking-wide transition-colors ${selectedOffer === 'partner' ? 'text-white' : 'text-gray-800'}`}>HelloFresh</span>
                                </div>
                                <h5 className={`font-semibold mb-2 text-[15px] tracking-tight transition-colors ${selectedOffer === 'partner' ? 'text-white' : 'text-gray-900'}`}>A gift for you</h5>
                                <p className={`text-[13px] mb-6 flex-grow leading-relaxed transition-colors ${selectedOffer === 'partner' ? 'text-gray-300' : 'text-gray-500'}`}>Enjoy <strong className={`font-semibold transition-colors ${selectedOffer === 'partner' ? 'text-white' : 'text-gray-800'}`}>50% off your first box</strong> + free shipping as a thank you.</p>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setSelectedOffer('partner'); handleAction('Offer Claimed', 'Your HelloFresh offer has been added to your account. Check your email for details on how to redeem. Your refund has also been processed.'); }}
                                  className={`w-full py-2.5 rounded-xl text-[13px] font-semibold text-center transition-colors ${
                                    selectedOffer === 'partner' ? 'bg-rokt-magenta text-white' : 'bg-gray-100 text-gray-700'
                                  }`}
                                >
                                  Claim Offer
                                </button>
                              </div>
                            </div>

                            {/* Mock Metrics Strip */}
                            <div className="mt-8 px-6 py-3.5 bg-white shadow-sm rounded-2xl flex items-center justify-between">
                              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-mono tracking-wider font-semibold uppercase">
                                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                                Rokt Brain™ Active
                              </div>
                              <div className="flex gap-4 text-[11px] font-medium text-gray-500">
                                <span>Est. revenue retained: <strong className="text-gray-800 font-semibold">$25.60</strong></span>
                                <span className="text-gray-200">|</span>
                                <span>Network fill: <strong className="text-gray-800 font-semibold">92%</strong></span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Standard Continue Button */}
                    <motion.button
                      layout
                      onClick={showRoktModule ? handleConfirmAction : () => handleAction('Refund Processed', 'Your full refund has been initiated. You will receive an email confirmation shortly.')}
                      disabled={processState === 'loading'}
                      className={`w-full py-4 rounded-2xl text-[15px] font-medium transition-all duration-300 flex items-center justify-center ${
                        showRoktModule
                          ? selectedOffer 
                            ? 'apple-button-rokt shadow-lg shadow-rokt-magenta/20' 
                            : 'bg-black/5 text-gray-400 border border-transparent hover:bg-black/10 hover:text-gray-700'
                          : 'apple-button-primary shadow-lg shadow-black/10'
                      } ${processState === 'loading' ? 'opacity-70 pointer-events-none' : ''}`}
                    >
                      {processState === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        !showRoktModule ? 'Confirm Refund' : 
                        selectedOffer === 'exchange' ? 'Confirm Exchange' :
                        selectedOffer === 'keep' ? 'Confirm 20% Refund' :
                        selectedOffer === 'partner' ? 'Claim Offer & Continue' :
                        'Confirm Refund'
                      )}
                    </motion.button>
                    
                    <AnimatePresence>
                      {showRoktModule && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-center text-[12px] text-gray-400 mt-3 font-medium"
                        >
                          By confirming refund, you will lose the offers above.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-center z-10">
        <p className="text-[12px] text-gray-500 bg-white/40 inline-block px-4 py-2 rounded-full backdrop-blur-md border border-white/50 shadow-sm">
          <strong className="text-gray-700">Concept prototype — Rokt Retain</strong> — designed to explore the return moment as an untapped Transaction Moment.
        </p>
      </footer>
    </div>
  );
}

