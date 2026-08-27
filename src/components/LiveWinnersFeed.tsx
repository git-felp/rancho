import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Sparkles } from 'lucide-react';
import { WINNERS_LIST } from '../data/mockData';
import { WinnerNotification } from '../types';

export const LiveWinnersFeed: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % WINNERS_LIST.length);
        setIsVisible(true);
      }, 400);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const winner: WinnerNotification = WINNERS_LIST[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-30 max-w-sm pointer-events-none">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={winner.id + currentIndex}
            initial={{ opacity: 0, y: 25, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            id="people"
            className="flex items-center gap-3 bg-slate-900/95 border border-amber-500/30 rounded-2xl p-2.5 sm:p-3 shadow-2xl shadow-black/80 backdrop-blur-md pointer-events-auto"
          >
            <div className="relative">
              <img
                src={winner.avatar}
                alt={winner.nome}
                id="people-img"
                className="w-11 h-11 rounded-full object-cover border-2 border-amber-400/80 shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 bg-amber-500 rounded-full p-0.5 shadow">
                <Trophy className="w-3 h-3 text-slate-950" />
              </div>
            </div>

            <div className="text-left text-xs leading-tight pr-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-200">
                <span>{winner.nome}</span>
                <span className="text-[10px] text-slate-400 font-medium">({winner.cidade}/{winner.estado})</span>
              </div>
              <p id="people-p" className="text-slate-300 mt-0.5">
                Acabou de ganhar <b className="text-amber-400 font-extrabold">{winner.premio}</b>!
              </p>
              <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>{winner.tempo} • Verificado</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
