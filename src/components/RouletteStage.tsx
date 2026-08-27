import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Gift, ArrowRight, RefreshCw, Flame, CheckCircle, ShieldAlert, Star } from 'lucide-react';
import { sound } from '../utils/audio';

interface RouletteStageProps {
  onProceedToClaim: () => void;
}

export const RouletteStage: React.FC<RouletteStageProps> = ({ onProceedToClaim }) => {
  const [attempt, setAttempt] = useState<number>(0);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [currentRotation, setCurrentRotation] = useState<number>(0);
  const [showTryAgainModal, setShowTryAgainModal] = useState<boolean>(false);
  const [showWinnerModal, setShowWinnerModal] = useState<boolean>(false);
  const [extraChanceActive, setExtraChanceActive] = useState<boolean>(false);

  const triggerSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const spinDuration = 5500; // 5.5s
    sound.playWheelSpinLoop(spinDuration);

    let targetAngle = 0;

    if (attempt === 0) {
      // Land on retry slice (approx 1250 deg relative or +7 spins)
      targetAngle = 360 * 6 + 170;
    } else {
      // Land on 2 iPhones 16 Pro Max jackpot slice
      targetAngle = currentRotation + 360 * 6 + 215;
    }

    setCurrentRotation(targetAngle);

    setTimeout(() => {
      setIsSpinning(false);

      if (attempt === 0) {
        sound.playTryAgain();
        setShowTryAgainModal(true);
        setExtraChanceActive(true);
        setAttempt(1);
      } else {
        sound.playWinFanfare();
        // Fire celebration confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.55 },
          colors: ['#ffd700', '#f59e0b', '#10b981', '#ffffff', '#3b82f6'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 80,
            angle: 60,
            spread: 60,
            origin: { x: 0 },
            colors: ['#ffd700', '#f59e0b', '#10b981'],
          });
          confetti({
            particleCount: 80,
            angle: 120,
            spread: 60,
            origin: { x: 1 },
            colors: ['#ffd700', '#f59e0b', '#10b981'],
          });
        }, 300);

        setShowWinnerModal(true);
      }
    }, spinDuration);
  };

  const handleCloseTryAgain = () => {
    setShowTryAgainModal(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-6 px-3 sm:px-4 max-w-4xl mx-auto min-h-[calc(100vh-80px)]">
      {/* Banner / Headline */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-2xl mx-auto mb-6"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-bold uppercase tracking-wider mb-3 shadow-lg shadow-amber-500/10">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>RODADA PREMIADA OFICIAL</span>
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
        </div>

        <h1 id="cta-text" className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight font-display">
          Gire a <span className="text-amber-400 shimmer-text">Roleta</span> para ganhar o seu{' '}
          <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 bg-clip-text text-transparent underline decoration-amber-500 decoration-wavy decoration-2">
            Mega Prêmio
          </span>
          !
        </h1>

        <p className="text-slate-300 text-sm sm:text-base mt-2 font-medium">
          {extraChanceActive ? (
            <span className="text-emerald-400 font-bold flex items-center justify-center gap-1.5 animate-pulse">
              <Sparkles className="w-4 h-4" /> 01 CHANCE EXTRA ATIVADA PARA VOCÊ! GIRE AGORA!
            </span>
          ) : (
            <span>Você tem <strong className="text-amber-400">1 Tentativa Grátis</strong> liberada para girar agora.</span>
          )}
        </p>
      </motion.div>

      {/* Roulette Outer Container */}
      <div className="relative flex flex-col items-center justify-center my-4">
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/30 via-yellow-500/20 to-amber-600/30 rounded-full filter blur-3xl scale-110 pointer-events-none" />

        {/* Roulette Wheel Body */}
        <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] rounded-full p-2 bg-gradient-to-tr from-amber-700 via-yellow-400 to-amber-600 shadow-[0_0_50px_rgba(245,158,11,0.4)] border-4 border-amber-300/80 flex items-center justify-center">
          
          {/* Spinning Wheel Image */}
          <div
            id="roleta2"
            style={{
              transform: `rotate(${currentRotation}deg)`,
              transition: isSpinning
                ? 'transform 5.5s cubic-bezier(0.12, 0.8, 0.15, 1)'
                : 'none',
            }}
            className="w-full h-full rounded-full overflow-hidden flex items-center justify-center relative shadow-inner"
          >
            <img
              src="/up1/images/roletanova.png"
              alt="Roleta Premiada"
              className="w-full h-full object-contain pointer-events-none select-none drop-shadow-2xl"
              onError={(e) => {
                // Fallback if public path varies
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Center Spin Hub & Pointer Button */}
          <button
            id="roleta3"
            onClick={triggerSpin}
            disabled={isSpinning}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center group cursor-pointer hover:scale-105 active:scale-95 transition-transform z-20 disabled:opacity-90 bg-transparent border-0"
          >
            <img
              src="/up1/images/button-gire.png"
              alt="Girar"
              className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
              onError={(e) => {
                // Fallback button styling if image not loaded
                const btn = e.currentTarget.parentElement;
                if (btn) {
                  btn.className = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-300 border-4 border-slate-950 shadow-2xl flex items-center justify-center cursor-pointer";
                }
              }}
            />
          </button>
        </div>
      </div>

      {/* Main Big CTA Button */}
      <div className="w-full max-w-md mt-6 px-2">
        <motion.button
          id="button-cta"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={triggerSpin}
          disabled={isSpinning}
          className="shine-button runSpin w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-lg sm:text-xl shadow-[0_10px_30px_rgba(245,158,11,0.4)] border-2 border-amber-200 flex items-center justify-center gap-3 cursor-pointer disabled:opacity-60 transition-all font-display"
        >
          {isSpinning ? (
            <>
              <RefreshCw className="w-6 h-6 animate-spin text-slate-950" />
              <span>RODANDO A ROLETA...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-6 h-6 text-slate-950" />
              <span>{extraChanceActive ? 'GIRAR MINHA CHANCE EXTRA' : 'GIRE PARA GANHAR'}</span>
              <ArrowRight className="w-6 h-6 text-slate-950" />
            </>
          )}
        </motion.button>
      </div>

      {/* Verified security trust pills */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-6 text-xs text-slate-400">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Sorteio 100% Auditado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 text-amber-400" />
          <span>Certificado Oficial</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Trophy className="w-4 h-4 text-yellow-400" />
          <span>Entrega Garantida para todo o Brasil</span>
        </div>
      </div>

      {/* MODAL 1: TRY AGAIN (1st Attempt) */}
      <AnimatePresence>
        {showTryAgainModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseTryAgain}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              id="popup-try-again"
              className="relative w-full max-w-md bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl z-10"
            >
              {/* Sweat icon / Emoji */}
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-600 to-yellow-300 p-1 shadow-lg shadow-amber-500/30 mb-4 flex items-center justify-center">
                <img
                  src="/up1/images/sweat.png"
                  alt="Uma pena!"
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-display mb-2">
                Uma pena!
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                Você foi o grande selecionado e ganhou{' '}
                <span className="inline-block font-extrabold text-emerald-400 text-lg px-2 py-0.5 bg-emerald-950/60 rounded-md border border-emerald-500/40 animate-pulse">
                  01 chance extra
                </span>
                . Boa sorte!
              </p>

              <button
                id="try-again-button"
                onClick={() => {
                  handleCloseTryAgain();
                  triggerSpin();
                }}
                className="shine-button w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-base sm:text-lg shadow-lg shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" />
                <span>Tentar Novamente</span>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: WINNER POPUP (2nd Attempt) */}
      <AnimatePresence>
        {showWinnerModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/85 backdrop-blur-lg"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 30 }}
              id="popup"
              className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_60px_rgba(245,158,11,0.4)] z-10 overflow-hidden"
            >
              {/* Confetti Glow Background */}
              <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full filter blur-3xl pointer-events-none" />

              <div className="w-16 h-16 mx-auto mb-2 flex items-center justify-center">
                <img
                  src="/up1/images/star-struck.png"
                  alt="Parabéns"
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-black uppercase mb-3">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>GANHADOR CONFIRMADO</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white font-display leading-tight mb-2">
                Parabéns!
              </h2>

              <p className="text-slate-300 text-sm sm:text-base font-medium">
                Você acaba de ganhar:
              </p>

              {/* Prize Highlight Box */}
              <div className="my-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border-2 border-amber-400/60 shadow-lg">
                <div className="flex justify-center mb-2">
                  <img
                    src="/up1/2/images/IPNHO-IPORDS-3.png"
                    alt="2 iPhones 16 Pro Max + AirPods"
                    className="h-28 object-contain animate-bounce"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-emerald-400 font-display">
                  2 iPhones 16 PRO MAX + 1 AirPods
                </h3>
                <p className="text-xs text-amber-300 font-bold mt-1">
                  ✓ Título Premiado Liberado para Resgate
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
                Seu título foi sorteado com sucesso no sistema oficial. Clique no botão abaixo para ir até a página de entrega dos seus prêmios.
              </p>

              <button
                id="resgatar-premio"
                onClick={onProceedToClaim}
                className="shine-button w-full py-4 sm:py-5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black text-lg sm:text-xl shadow-[0_10px_30px_rgba(16,185,129,0.4)] border-2 border-emerald-200 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-display"
              >
                <span>Resgatar seu Prêmio</span>
                <ArrowRight className="w-6 h-6 text-slate-950" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

