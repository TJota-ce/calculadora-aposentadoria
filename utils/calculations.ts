import { SimulationData, SimulationResult } from '../types';

export const calculateRetirement = (data: SimulationData): SimulationResult => {
  const {
    monthlyIncome,
    currentInvestments,
    targetPatrimony,
    investPercentage,
    currentAge,
    retirementAge,
    annualReturn,
    monthlySpendingRetirement,
  } = data;

  const yearsToInvest = Math.max(0, retirementAge - currentAge);
  const monthsToInvest = yearsToInvest * 12;
  
  // Convert annual rate to monthly rate
  // Formula: (1 + annual)^ (1/12) - 1
  const monthlyRate = Math.pow(1 + annualReturn / 100, 1 / 12) - 1;
  
  const monthlyContribution = monthlyIncome * (investPercentage / 100);

  // Future Value of Initial Investment
  // FV = PV * (1 + r)^n
  const fvInitial = currentInvestments * Math.pow(1 + monthlyRate, monthsToInvest);

  // Future Value of Monthly Contributions (Annuity)
  // FV = PMT * ((1 + r)^n - 1) / r
  let fvContributions = 0;
  if (monthlyRate > 0) {
    fvContributions = monthlyContribution * ((Math.pow(1 + monthlyRate, monthsToInvest) - 1) / monthlyRate);
  } else {
    fvContributions = monthlyContribution * monthsToInvest;
  }

  const totalAccumulated = fvInitial + fvContributions;

  // Sustainable spending (Perpetuity assumption: living off the yield)
  // If you only spend the interest, the principal remains untouched.
  const sustainableMonthlySpending = totalAccumulated * monthlyRate;

  // Heritage Calculation
  // The prompt reference specifically mentions "Baseado numa expectativa média de 72 anos".
  const lifeExpectancy = 72; 
  const yearsInRetirement = Math.max(0, lifeExpectancy - retirementAge);
  const monthsInRetirement = yearsInRetirement * 12;

  let balance = totalAccumulated;
  
  // Calculate drawdown
  // If monthlySpendingRetirement is less than interest, balance grows.
  // If more, balance shrinks.
  for (let i = 0; i < monthsInRetirement; i++) {
    const interest = balance * monthlyRate;
    balance = balance + interest - monthlySpendingRetirement;
    if (balance < 0) {
        balance = 0;
        break;
    }
  }
  
  const heritage = balance;

  return {
    totalAccumulated,
    sustainableMonthlySpending,
    heritage,
    monthsToRetirement: monthsToInvest,
    monthlyContribution,
    isGoalMet: totalAccumulated >= targetPatrimony,
    surplus: totalAccumulated - targetPatrimony,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  }).format(value / 100);
};

// Formats a number for input display (e.g. 10000 -> 10.000,00)
// Does not include currency symbol
export const formatNumberInput = (value: number): string => {
  if (isNaN(value)) return '';
  return value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};