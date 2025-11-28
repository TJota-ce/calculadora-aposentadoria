export interface SimulationData {
  monthlyIncome: number;
  currentInvestments: number;
  targetPatrimony: number;
  investPercentage: number;
  currentAge: number;
  retirementAge: number;
  annualReturn: number;
  monthlySpendingRetirement: number;
}

export interface SimulationResult {
  totalAccumulated: number;
  sustainableMonthlySpending: number;
  heritage: number;
  monthsToRetirement: number;
  monthlyContribution: number;
  isGoalMet: boolean;
  surplus: number;
}
