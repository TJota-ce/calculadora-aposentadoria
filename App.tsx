import React, { useState } from 'react';
import { calculateRetirement, formatCurrency, formatNumberInput } from './utils/calculations';
import { SimulationData, SimulationResult } from './types';
import { InputField } from './components/InputField';
import { InfoSection } from './components/InfoSection';
import { TrendingUp, Calculator as CalculatorIcon, Trash2 } from 'lucide-react';

const App: React.FC = () => {
  const [formData, setFormData] = useState<SimulationData>({
    monthlyIncome: 10000,
    currentInvestments: 20000,
    targetPatrimony: 1000000,
    investPercentage: 20,
    currentAge: 30,
    retirementAge: 65,
    annualReturn: 10,
    monthlySpendingRetirement: 5000,
  });

  const [results, setResults] = useState<SimulationResult | null>(null);

  // Handles standard numeric inputs (allowing decimals via . or , handled by browser type="number" usually, or simple parsing)
  const handleInputChange = (field: keyof SimulationData, value: string) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  // Handles money inputs where we want to strip non-digits to allow "10.000,00" formatting (cents logic)
  const handleMoneyChange = (field: keyof SimulationData, value: string) => {
    // Remove everything that is not a digit
    const cleanValue = value.replace(/\D/g, '');
    // Divide by 100 to treat input as cents
    const numValue = cleanValue === '' ? 0 : parseInt(cleanValue, 10) / 100;
    setFormData((prev) => ({ ...prev, [field]: numValue }));
  };

  const handleCalculate = () => {
    const calculated = calculateRetirement(formData);
    setResults(calculated);
    
    // Always scroll to results
    setTimeout(() => {
      document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleClear = () => {
    setFormData({
      monthlyIncome: 0,
      currentInvestments: 0,
      targetPatrimony: 0,
      investPercentage: 0,
      currentAge: 0,
      retirementAge: 0,
      annualReturn: 0,
      monthlySpendingRetirement: 0,
    });
    setResults(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-brand-600 pb-24 pt-8 shadow-lg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">iJota</h1>
            </div>
            <nav className="hidden md:block">
               <span className="text-brand-100 text-sm font-medium">Simulador de Aposentadoria</span>
            </nav>
          </div>
          <div className="mt-8">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Calculadora de Aposentadoria</h2>
            <p className="mt-3 max-w-2xl text-lg text-brand-100">
              Planeje sua independência financeira. Descubra quanto investir e qual será seu patrimônio futuro.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        
        {/* Main Content Vertical Stack */}
        <div className="space-y-8">
          
          {/* Inputs Section */}
          <div className="w-full space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center">
                  <CalculatorIcon className="w-4 h-4 mr-2 text-brand-600" />
                  Preencha os dados
                </h3>
              </div>
              
              <div className="p-6 space-y-5">
                <InputField
                  label="Quanto você ganha por mês?"
                  value={formData.monthlyIncome === 0 ? '' : formatNumberInput(formData.monthlyIncome)}
                  onChange={(v) => handleMoneyChange('monthlyIncome', v)}
                  type="text"
                  prefix="R$"
                  placeholder="0,00"
                />
                <InputField
                  label="Quanto você já tem investido?"
                  value={formData.currentInvestments === 0 ? '' : formatNumberInput(formData.currentInvestments)}
                  onChange={(v) => handleMoneyChange('currentInvestments', v)}
                  type="text"
                  prefix="R$"
                  placeholder="0,00"
                />
                <InputField
                  label="Com quanto de patrimônio você quer se aposentar?"
                  value={formData.targetPatrimony === 0 ? '' : formatNumberInput(formData.targetPatrimony)}
                  onChange={(v) => handleMoneyChange('targetPatrimony', v)}
                  type="text"
                  prefix="R$"
                  placeholder="0,00"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Quantos % da renda você investe?"
                    value={formData.investPercentage === 0 ? '' : formData.investPercentage}
                    onChange={(v) => handleInputChange('investPercentage', v)}
                    suffix="%"
                  />
                  <div className="pt-2 sm:pt-7 text-xs font-medium text-brand-600 flex items-center">
                    ~ {formatCurrency(formData.monthlyIncome * (formData.investPercentage / 100))}/mês
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField
                    label="Qual sua idade atual?"
                    value={formData.currentAge === 0 ? '' : formData.currentAge}
                    onChange={(v) => handleInputChange('currentAge', v)}
                    suffix="anos"
                  />
                  <InputField
                    label="Com quantos anos deseja se aposentar?"
                    value={formData.retirementAge === 0 ? '' : formData.retirementAge}
                    onChange={(v) => handleInputChange('retirementAge', v)}
                    suffix="anos"
                  />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <InputField
                    label="Rentabilidade anual projetada?"
                    value={formData.annualReturn === 0 ? '' : formData.annualReturn}
                    onChange={(v) => handleInputChange('annualReturn', v)}
                    suffix="%"
                    step="0.1"
                  />
                   <InputField
                    label="Gasto mensal aposentado?"
                    value={formData.monthlySpendingRetirement === 0 ? '' : formatNumberInput(formData.monthlySpendingRetirement)}
                    onChange={(v) => handleMoneyChange('monthlySpendingRetirement', v)}
                    type="text"
                    prefix="R$"
                    placeholder="0,00"
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={handleCalculate}
                    className="flex-[2] bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition-all duration-200 transform active:scale-95 flex justify-center items-center text-lg"
                  >
                    Calcular
                  </button>
                  <button
                    onClick={handleClear}
                    className="flex-1 bg-white border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300 font-bold py-3.5 px-4 rounded-lg shadow-sm transition-all duration-200 transform active:scale-95 flex justify-center items-center text-lg"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Limpar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full" id="results-section">
            
            {results && (
              <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                
                {/* Result Box Container */}
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 md:p-8">
                  <h3 className="text-2xl font-bold text-brand-800 mb-6 border-b border-slate-100 pb-2">Resultado</h3>
                  
                  {/* Top Status Message */}
                  <div className={`rounded-lg p-5 mb-6 text-center ${results.isGoalMet ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                    <p className="text-lg font-medium">
                      {results.isGoalMet 
                        ? "Parabéns! Você já atingiu sua meta de aposentadoria com os investimentos atuais."
                        : `Atenção: Você ainda precisa ajustar seus aportes para atingir a meta de ${formatCurrency(formData.targetPatrimony)}.`}
                    </p>
                  </div>

                  {/* Summary Sentence Box */}
                  <div className="bg-slate-50 rounded-lg p-6 mb-8 text-center border border-slate-100">
                    <p className="text-slate-600 mb-2">Você conseguirá deixar uma herança para seus filhos.</p>
                    <p className="text-lg md:text-xl text-slate-700">
                      Você poderá gastar até <span className="font-bold text-emerald-600">{formatCurrency(results.sustainableMonthlySpending)}</span> por mês e ainda deixará uma herança de <span className="font-bold text-emerald-600">{formatCurrency(results.heritage)}</span>.
                    </p>
                  </div>

                  {/* 4 Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    
                    {/* Card 1 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Você se aposentará com</h4>
                      <div className="text-lg font-bold text-slate-800 mb-2 break-words w-full tracking-tight">{formatCurrency(results.totalAccumulated)}</div>
                      <p className="text-xs text-slate-500 leading-tight">
                        Aportando {formatCurrency(results.monthlyContribution)} por {Math.floor(results.monthsToRetirement / 12)} anos.
                      </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Deixará de herança</h4>
                      <div className="text-lg font-bold text-red-600 mb-2 break-words w-full tracking-tight">{formatCurrency(results.heritage)}</div>
                      <p className="text-xs text-slate-500 leading-tight">
                        Baseado numa expectativa média de 72 anos.
                      </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">Poderá gastar por mês</h4>
                      <div className="text-lg font-bold text-slate-800 mb-2 break-words w-full tracking-tight">{formatCurrency(results.sustainableMonthlySpending)}</div>
                      <p className="text-xs text-slate-500 leading-tight">
                        Para seu dinheiro nunca acabar.
                      </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-white border border-slate-200 rounded-lg p-4 text-center shadow-sm flex flex-col items-center justify-center min-h-[140px]">
                      <h4 className="font-bold text-slate-900 text-sm mb-2">
                        {results.isGoalMet ? 'Você passou da sua meta' : 'Faltam para sua meta'}
                      </h4>
                      <div className={`text-lg font-bold mb-2 break-words w-full tracking-tight ${results.isGoalMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {formatCurrency(Math.abs(results.surplus))}
                      </div>
                      <p className={`text-xs font-medium ${results.isGoalMet ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {results.isGoalMet ? 'Parabéns!' : 'Continue investindo!'}
                      </p>
                    </div>

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Info / Education Section */}
        <InfoSection />

      </main>
    </div>
  );
};

export default App;