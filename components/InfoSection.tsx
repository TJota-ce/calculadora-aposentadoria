import React from 'react';
import { BookOpen, ShieldCheck, Clock, AlertTriangle, Calculator } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <div className="mt-16 space-y-12 text-slate-700">
      
      {/* 1. Como usar a Calculadora - TOP */}
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-md border-t-4 border-brand-500">
         <h4 className="flex items-center text-xl font-bold text-brand-800 mb-4">
            <Calculator className="w-5 h-5 mr-2" />
            Como usar a Calculadora iJota
         </h4>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
               <span className="font-bold text-brand-600 block mb-2">1. Dados Financeiros</span>
               <p className="text-sm text-slate-600 leading-relaxed">Informe sua renda mensal, o valor que já possui investido e quanto de patrimônio deseja acumular.</p>
            </div>
            <div>
               <span className="font-bold text-brand-600 block mb-2">2. Dados Pessoais</span>
               <p className="text-sm text-slate-600 leading-relaxed">Defina a porcentagem da renda que irá investir, sua idade atual e a idade que pretende parar.</p>
            </div>
            <div>
               <span className="font-bold text-brand-600 block mb-2">3. Projeções</span>
               <p className="text-sm text-slate-600 leading-relaxed">Estime uma taxa de rentabilidade anual realista e quanto deseja gastar por mês na aposentadoria.</p>
            </div>
            <div>
               <span className="font-bold text-brand-600 block mb-2">4. Análise</span>
               <p className="text-sm text-slate-600 leading-relaxed">Veja se sua meta é viável, quanto deixará de herança e ajuste seus aportes conforme necessário.</p>
            </div>
         </div>
      </div>

      {/* Middle Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        
        {/* Left Column */}
        <div className="space-y-8">
          <div>
            <h3 className="flex items-center text-xl font-bold text-brand-800 mb-3">
              <BookOpen className="w-5 h-5 mr-2" />
              Entenda mais sobre a Aposentadoria
            </h3>
            <div className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm">
               <p className="text-sm leading-relaxed text-slate-600">
               A aposentadoria é o afastamento remunerado do trabalhador concedido pelo INSS. É um direito garantido pela Constituição Federal e depende de contribuições mensais ao longo da vida profissional.
               Existem diferentes tipos de aposentadoria, com regras que variam conforme o tempo de contribuição, idade e categoria profissional.
               </p>
            </div>
          </div>

          <div>
            <h3 className="flex items-center text-xl font-bold text-brand-800 mb-3">
              <ShieldCheck className="w-5 h-5 mr-2" />
              Fator Previdenciário
            </h3>
            <div className="bg-brand-50 p-5 rounded-xl border border-brand-100">
              <p className="text-sm leading-relaxed text-brand-900">
                O fator previdenciário é uma fórmula que considera idade, expectativa de vida e tempo de contribuição.
                Basicamente: quanto mais cedo você se aposenta, menor tende a ser o benefício mensal. Esse fator é crucial para regras de transição e aposentadorias antigas.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <h3 className="flex items-center text-xl font-bold text-brand-800 mb-3">
              <Clock className="w-5 h-5 mr-2" />
              Principais Tipos
            </h3>
            <ul className="space-y-4">
              <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
                <span className="font-semibold text-brand-700 block mb-1">Por Idade</span>
                <p className="text-sm text-slate-600">Homens podem se aposentar a partir dos 65 anos e mulheres aos 62. O cálculo base considera 60% da média salarial, com acréscimos por ano extra de contribuição.</p>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
                <span className="font-semibold text-brand-700 block mb-1">Aposentadoria Especial</span>
                <p className="text-sm text-slate-600">Para trabalhadores expostos a agentes nocivos. Exige idade mínima entre 55 e 60 anos dependendo do risco, além do tempo de exposição.</p>
              </li>
              <li className="bg-white p-4 rounded-lg shadow-sm border border-slate-100 transition-shadow hover:shadow-md">
                <span className="font-semibold text-brand-700 block mb-1">Por Invalidez</span>
                <p className="text-sm text-slate-600">Benefício para quem se torna permanentemente incapaz de trabalhar. Requer avaliação médica do INSS.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Importante - BOTTOM */}
      <div className="pt-4">
          <h3 className="flex items-center text-xl font-bold text-amber-700 mb-3">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Importante
          </h3>
          <div className="bg-amber-50 p-6 rounded-xl border border-amber-100">
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm text-amber-900">
              <li className="flex items-start"><span className="mr-2 text-amber-600">•</span> Estas simulações são estimativas baseadas em juros compostos constantes.</li>
              <li className="flex items-start"><span className="mr-2 text-amber-600">•</span> O mercado financeiro varia e rentabilidade passada não garante futuro.</li>
              <li className="flex items-start"><span className="mr-2 text-amber-600">•</span> Os valores reais do INSS dependem da sua base de contribuição oficial.</li>
              <li className="flex items-start"><span className="mr-2 text-amber-600">•</span> Considere a inflação ao projetar valores para daqui a 20 ou 30 anos.</li>
              <li className="flex items-start md:col-span-2 pt-2 font-medium"><span className="mr-2 text-amber-600">•</span> Procure sempre um especialista financeiro ou previdenciário para um cálculo oficial e detalhado.</li>
            </ul>
          </div>
        </div>
    </div>
  );
};