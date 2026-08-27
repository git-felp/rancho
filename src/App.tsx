import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { RouletteStage } from './components/RouletteStage';
import { ClaimStage } from './components/ClaimStage';
import { LiveWinnersFeed } from './components/LiveWinnersFeed';
import { SecurityFooter } from './components/SecurityFooter';
import { sound } from './utils/audio';

export default function App() {
  const [stage, setStage] = useState<'roulette' | 'claim'>('roulette');
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleProceedToClaim = () => {
    setStage('claim');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950 font-sans relative overflow-x-hidden">
      {/* Background Decorative Gradients */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-amber-600/10 via-amber-500/5 to-transparent pointer-events-none filter blur-3xl -z-10" />
      <div className="fixed bottom-0 right-0 w-96 h-96 bg-emerald-600/10 pointer-events-none filter blur-3xl -z-10" />

      {/* Main Header */}
      <Header
        currentStage={stage}
        onStageChange={(newStage) => {
          setStage(newStage);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Dynamic Stage Body */}
      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {stage === 'roulette' ? (
            <motion.div
              key="roulette-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <RouletteStage onProceedToClaim={handleProceedToClaim} />
            </motion.div>
          ) : (
            <motion.div
              key="claim-stage"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
            >
              <ClaimStage onBackToRoulette={() => setStage('roulette')} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Live Winners Toast Ticker */}
      <LiveWinnersFeed />

      {/* Institutional / Regulatory Footer */}
      <SecurityFooter />
    </div>
  );
}
