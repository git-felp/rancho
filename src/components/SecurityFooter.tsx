import React from 'react';
import { ShieldCheck, Lock, Award, Heart, HelpCircle } from 'lucide-react';

export const SecurityFooter: React.FC = () => {
  return (
    <footer className="mt-16 bg-slate-950 border-t border-slate-800/80 py-10 px-4 sm:px-6 text-slate-400 text-xs">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Logos & Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 pb-6 border-b border-slate-800/60 opacity-80">
          <div className="flex items-center gap-2 text-slate-300 font-bold font-display">
            <Award className="w-5 h-5 text-amber-400" />
            <span>PRÊMIO DO CARLINHOS</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>SECAP / ME Nº 04.028914/2025</span>
          </div>

          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span>CERTIFICAÇÃO SSL 256-BIT</span>
          </div>
        </div>

        {/* Partner images strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 py-4 opacity-75 grayscale hover:grayscale-0 transition-all">
          <img
            src="/images/viva-hosp.svg"
            alt="Hospital Parceiro"
            className="h-7 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <img
            src="/images/viacap.png"
            alt="Viacap"
            className="h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <img
            src="/images/edjdigital.png"
            alt="EDJ Digital"
            className="h-6 object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </div>

        {/* Legal and Disclaimer Text */}
        <div className="space-y-3 text-center sm:text-left text-[11px] text-slate-500 leading-relaxed max-w-3xl mx-auto">
          <p>
            <strong>Prêmio do Carlinhos Promoções e Eventos Digitais LTDA.</strong> CNPJ: 42.891.048/0001-92. 
            Promoção comercial autorizada pela Secretaria de Avaliação, Planejamento, Energia e Loteria do Ministério da Economia (SECAP/ME).
          </p>
          <p>
            Imagens meramente ilustrativas. Os aparelhos iPhone 16 Pro Max e fones AirPods Pro são produtos novos, lacrados na caixa original, distribuídos legalmente no território nacional em conformidade com as diretrizes do Código de Defesa do Consumidor.
          </p>
          <p>
            A entrega dos prêmios é realizada via Correios Sedex Especial com seguro total incluso e código de rastreamento enviado via WhatsApp e e-mail cadastrados.
          </p>
        </div>

        {/* Copyright & Made with Heart */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-900 text-slate-500 text-[11px]">
          <span>© 2025-2026 Prêmio do Carlinhos. Todos os direitos reservados.</span>
          <div className="flex items-center gap-4">
            <a href="#termos" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">
              Termos de Uso
            </a>
            <span>•</span>
            <a href="#privacidade" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">
              Política de Privacidade
            </a>
            <span>•</span>
            <a href="#contato" onClick={(e) => e.preventDefault()} className="hover:text-slate-300 transition-colors">
              Suporte Oficial
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
