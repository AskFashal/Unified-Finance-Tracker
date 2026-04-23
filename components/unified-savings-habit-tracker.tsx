'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, CheckCircle2, Activity, TrendingUp, Target, Zap, PiggyBank, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getCurrencyByCountry, formatCurrencyByLocale } from '@/lib/currency-map';

interface HabitTrackerState {
  habitCount: number;
  grid: Record<string, boolean>;
  habitNames: Record<number, string>;
  pocketSavings: Record<string, number>;
  specificGoals: Array<{
    id: string;
    name: string;
    targetAmount: number;
    timelineMonths: number;
    currentSavings: number;
  }>;
}

export default function UnifiedSavingsHabitTracker({ 
  selectedCountry = "United States", 
  currencySymbol = '$',
  savingsGoal = 0,
  formatCurrency = (value: number) => `${currencySymbol}${value.toLocaleString()}`
}) {
  // Get currency info from the map
  const currencyInfo = getCurrencyByCountry(selectedCountry);
  
  // Create a robust currency formatter
  const formatCurrencyValue = (value: number) => {
    try {
      return formatCurrencyByLocale(value, selectedCountry);
    } catch (e) {
      return `${currencyInfo.symbol}${value.toLocaleString()}`;
    }
  };
  const [habitCount, setHabitCount] = useState(10);
  const [grid, setGrid] = useState<Record<string, boolean>>({});
  const [habitNames, setHabitNames] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [pocketSavings, setPocketSavings] = useState<Record<string, number>>({});
  const [dailySavingAmount, setDailySavingAmount] = useState(0);
  const [monthlyTarget, setMonthlyTarget] = useState(savingsGoal || 10000);
  const [specificGoals, setSpecificGoals] = useState<HabitTrackerState['specificGoals']>([]);
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalAmount, setNewGoalAmount] = useState('');
  const [newGoalMonths, setNewGoalMonths] = useState('');
  const daysInMonth = 31;
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.toLocaleString('en-US', { month: 'long', year: 'numeric' });

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fashal-unified-tracker');
    if (saved) {
      try {
        const data: HabitTrackerState = JSON.parse(saved);
        setHabitCount(data.habitCount);
        setGrid(data.grid);
        setHabitNames(data.habitNames);
        setPocketSavings(data.pocketSavings || {});
        setSpecificGoals(data.specificGoals || []);
      } catch (e) {
        console.error('[v0] Error loading unified tracker:', e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (isLoaded) {
      const dataToSave: HabitTrackerState = {
        habitCount,
        grid,
        habitNames,
        pocketSavings,
        specificGoals,
      };
      localStorage.setItem('fashal-unified-tracker', JSON.stringify(dataToSave));
    }
  }, [habitCount, grid, habitNames, pocketSavings, specificGoals, isLoaded]);

  // Calculate daily completion percentages for the graph
  const chartData = useMemo(() => {
    return [...Array(daysInMonth)].map((_, dIdx) => {
      const day = dIdx + 1;
      let score = 0;
      for (let hIdx = 0; hIdx < habitCount; hIdx++) {
        if (grid[`${hIdx}-${day}`]) score++;
      }
      return (score / habitCount) * 100;
    });
  }, [grid, habitCount]);

  // Calculate overall monthly completion
  const monthlyCompletion = useMemo(() => {
    const totalPossible = habitCount * daysInMonth;
    const totalCompleted = Object.values(grid).filter(Boolean).length;
    return Math.round((totalCompleted / totalPossible) * 100) || 0;
  }, [grid, habitCount]);

  // Calculate cumulative pocket savings
  const cumulativePocketSavings = useMemo(() => {
    return Object.values(pocketSavings).reduce((sum, amount) => sum + (amount || 0), 0);
  }, [pocketSavings]);

  // Calculate pocket savings battery percentage (using editable target)
  const savingsBatteryPercent = monthlyTarget > 0 ? Math.min((cumulativePocketSavings / monthlyTarget) * 100, 100) : 0;

  // Sync daily savings with habit discipline
  const dailyDisciplineBonus = (monthlyCompletion / 100) * (dailySavingAmount || 100);

  const toggleCheck = (hIdx: number, day: number) => {
    const id = `${hIdx}-${day}`;
    setGrid(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateHabitName = (hIdx: number, name: string) => {
    setHabitNames(prev => ({ ...prev, [hIdx]: name }));
  };

  const getHabitCompletion = (hIdx: number) => {
    let count = 0;
    for (let day = 1; day <= daysInMonth; day++) {
      if (grid[`${hIdx}-${day}`]) count++;
    }
    return count;
  };

  const addPocketSavings = (day: number, amount: number) => {
    if (amount > 0) {
      setPocketSavings(prev => ({ ...prev, [day]: amount }));
    }
  };

  const handleEnterDailyAmount = () => {
    if (dailySavingAmount > 0) {
      addPocketSavings(currentDay, dailySavingAmount);
      setDailySavingAmount(0);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEnterDailyAmount();
    }
  };

  const addSpecificGoal = () => {
    if (newGoalName && newGoalAmount && newGoalMonths) {
      const newGoal = {
        id: Date.now().toString(),
        name: newGoalName,
        targetAmount: parseFloat(newGoalAmount),
        timelineMonths: parseInt(newGoalMonths),
        currentSavings: 0,
      };
      setSpecificGoals(prev => [...prev, newGoal]);
      setNewGoalName('');
      setNewGoalAmount('');
      setNewGoalMonths('');
    }
  };

  const updateGoalSavings = (goalId: string, amount: number) => {
    setSpecificGoals(prev =>
      prev.map(goal =>
        goal.id === goalId
          ? { ...goal, currentSavings: Math.min(goal.currentSavings + amount, goal.targetAmount) }
          : goal
      )
    );
  };

  const deleteGoal = (goalId: string) => {
    setSpecificGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const calculateDailyDiscipline = (goal: HabitTrackerState['specificGoals'][0]) => {
    const remainingAmount = goal.targetAmount - goal.currentSavings;
    const daysRemaining = (goal.timelineMonths * 30) - (today.getDate());
    return daysRemaining > 0 ? Math.ceil(remainingAmount / daysRemaining) : goal.targetAmount;
  };

  if (!isLoaded) return null;

  return (
    <div className="mt-8 space-y-6">
      {/* FOCUS LEVEL TOGGLE */}
      <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-3xl border border-white/5">
        <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase tracking-widest">
          <Settings size={16} className="text-emerald-500" /> Focus Level:
        </div>
        <div className="flex bg-black/40 p-1 rounded-2xl gap-1">
          {[3, 5, 7, 10].map((num) => (
            <button
              key={num}
              onClick={() => setHabitCount(num)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                habitCount === num 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50' 
                  : 'text-slate-500 hover:bg-white/5'
              }`}
            >
              {num} HABITS
            </button>
          ))}
        </div>
      </div>

      {/* TABS FOR HABITS AND SAVINGS */}
      <Tabs defaultValue="habits" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-slate-900/40 border border-white/5">
          <TabsTrigger value="habits" className="text-xs">
            <Activity size={14} className="mr-2" /> HABITS
          </TabsTrigger>
          <TabsTrigger value="pocket" className="text-xs">
            <PiggyBank size={14} className="mr-2" /> POCKET SAVINGS
          </TabsTrigger>
          <TabsTrigger value="goals" className="text-xs">
            <Target size={14} className="mr-2" /> FINANCIAL GOALS
          </TabsTrigger>
        </TabsList>

        {/* HABITS TAB */}
        <TabsContent value="habits">
          <div className="bg-slate-900 border border-emerald-500/20 rounded-[2.5rem] p-6 space-y-4">
            {/* Performance Graph */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
              <div className="flex items-center gap-2 mb-4 text-emerald-500 font-bold text-sm tracking-widest">
                <Activity size={16} /> PERFORMANCE GRAPH ({monthlyCompletion}%)
              </div>
              <svg viewBox="0 0 930 100" className="w-full h-24 overflow-visible">
                <polyline
                  fill="none"
                  stroke="#10B981"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points={chartData.map((pct, i) => `${(i * 30) + 10},${100 - pct}`).join(' ')}
                  className="drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-700"
                />
              </svg>
            </div>

            {/* Habits Grid */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                    <th className="p-2 text-left min-w-[150px]">Daily Protocols</th>
                    {[...Array(31)].map((_, i) => (
                      <th key={i} className="p-1 text-center w-8 border-l border-white/5">{i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[...Array(habitCount)].map((_, hIdx) => (
                    <tr key={hIdx} className="border-t border-white/5 group hover:bg-white/5 transition-colors">
                      <td className="p-2">
                        <input 
                          type="text" 
                          value={habitNames[hIdx] || ''}
                          onChange={(e) => updateHabitName(hIdx, e.target.value)}
                          placeholder={`Focus #${hIdx + 1}...`}
                          className="bg-transparent text-slate-300 text-xs w-full focus:outline-none focus:text-emerald-400 placeholder:text-slate-800"
                        />
                        <span className="text-[8px] text-slate-600 ml-1">{getHabitCompletion(hIdx)}/31</span>
                      </td>
                      {[...Array(31)].map((_, dIdx) => {
                        const day = dIdx + 1;
                        const isChecked = grid[`${hIdx}-${day}`];
                        return (
                          <td 
                            key={day} 
                            onClick={() => toggleCheck(hIdx, day)}
                            className={`p-1 border-l border-white/5 cursor-pointer transition-all ${isChecked ? 'bg-emerald-500/20' : 'hover:bg-emerald-500/5'}`}
                          >
                            <div className={`flex items-center justify-center transition-transform ${isChecked ? 'scale-110 text-emerald-500' : 'text-transparent'}`}>
                              <CheckCircle2 size={14} />
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* POCKET SAVINGS TAB */}
        <TabsContent value="pocket">
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <PiggyBank size={20} /> Pocket Savings Dashboard
              </CardTitle>
              <CardDescription className="text-slate-400">
                Track daily savings accumulation toward your monthly target
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Monthly Target Input */}
              <div className="space-y-2 bg-slate-800/50 p-4 rounded-xl border border-emerald-500/20">
                <Label htmlFor="monthly-target" className="text-slate-300">Monthly Savings Target</Label>
                <div className="flex gap-2">
                  <Input
                    id="monthly-target"
                    type="number"
                    value={monthlyTarget}
                    onChange={(e) => setMonthlyTarget(parseFloat(e.target.value) || 0)}
                    placeholder={`e.g. 1000`}
                    className="bg-slate-900 border-slate-700 text-emerald-400 flex-1"
                  />
                  <span className="text-emerald-400 font-bold text-lg py-2 px-3">{currencyInfo.symbol}</span>
                </div>
              </div>

              {/* Savings Battery Visual */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label className="text-slate-300">Progress</Label>
                  <span className="text-emerald-400 font-bold">{formatCurrencyValue(cumulativePocketSavings)} / {formatCurrencyValue(monthlyTarget)}</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-6 overflow-hidden border border-emerald-500/20">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-500 flex items-center justify-center"
                    style={{ width: `${savingsBatteryPercent}%` }}
                  >
                    {savingsBatteryPercent > 10 && (
                      <span className="text-[10px] font-bold text-white">{Math.round(savingsBatteryPercent)}%</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Daily Savings Input with Enter Button */}
              <div className="space-y-2 bg-slate-800/50 p-4 rounded-xl border border-red-500/20">
                <Label htmlFor="daily-saving" className="text-slate-300">Daily Saving Amount (Today: Day {currentDay})</Label>
                <div className="flex gap-2">
                  <Input
                    id="daily-saving"
                    type="number"
                    value={dailySavingAmount}
                    onChange={(e) => setDailySavingAmount(parseFloat(e.target.value) || 0)}
                    onKeyPress={handleKeyPress}
                    placeholder={`e.g. 100`}
                    className="bg-slate-900 border-slate-700 text-emerald-400 flex-1"
                  />
                  <Button
                    onClick={handleEnterDailyAmount}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6"
                  >
                    Enter
                  </Button>
                </div>
                <p className="text-[11px] text-slate-500">
                  Habit Discipline Bonus: <span className="text-emerald-400 font-bold">{formatCurrencyValue(dailyDisciplineBonus)}</span> (based on {monthlyCompletion}% habit completion)
                </p>
              </div>

              {/* Monthly Breakdown */}
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-slate-300">Daily Log (Click to Edit or Delete)</h4>
                <div className="grid grid-cols-7 gap-2 max-h-64 overflow-y-auto">
                  {[...Array(31)].map((_, dIdx) => {
                    const day = dIdx + 1;
                    const amount = pocketSavings[day] || 0;
                    const isToday = day === currentDay;
                    return (
                      <div key={day} className="space-y-1">
                        <div className={`text-[9px] font-bold text-center ${isToday ? 'text-emerald-400' : 'text-slate-500'}`}>
                          Day {day} {isToday && '(Today)'}
                        </div>
                        <button
                          onClick={() => {
                            if (amount > 0) {
                              setPocketSavings(prev => {
                                const updated = { ...prev };
                                delete updated[day];
                                return updated;
                              });
                            }
                          }}
                          className={`w-full px-2 py-2 rounded text-[9px] font-mono font-bold transition-all ${
                            amount > 0
                              ? 'bg-emerald-500/30 hover:bg-red-500/30 border border-emerald-500/50 text-emerald-300 hover:text-red-400'
                              : `border border-emerald-500/30 text-emerald-400 ${isToday ? 'bg-emerald-500/20' : 'bg-emerald-500/10 hover:bg-emerald-500/20'}`
                          }`}
                          title={amount > 0 ? 'Click to delete' : 'Entry not yet made'}
                        >
                          {amount > 0 ? formatCurrencyValue(amount) : '+'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* FINANCIAL GOALS TAB */}
        <TabsContent value="goals">
          <Card className="bg-slate-900 border-emerald-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-emerald-400">
                <Target size={20} /> Specific Financial Goals
              </CardTitle>
              <CardDescription className="text-slate-400">
                Set and track goals with daily discipline targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add New Goal */}
              <div className="space-y-3 p-4 bg-slate-800/40 rounded-2xl border border-slate-700/40">
                <h4 className="text-sm font-bold text-slate-300">Add New Goal</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input
                    type="text"
                    value={newGoalName}
                    onChange={(e) => setNewGoalName(e.target.value)}
                    placeholder="Goal name (e.g., Laptop)"
                    className="bg-slate-900 border-slate-700 text-slate-200"
                  />
                  <Input
                    type="number"
                    value={newGoalAmount}
                    onChange={(e) => setNewGoalAmount(e.target.value)}
                    placeholder="Target amount"
                    className="bg-slate-900 border-slate-700 text-slate-200"
                  />
                  <Input
                    type="number"
                    value={newGoalMonths}
                    onChange={(e) => setNewGoalMonths(e.target.value)}
                    placeholder="Timeline (months)"
                    className="bg-slate-900 border-slate-700 text-slate-200"
                  />
                </div>
                <Button
                  onClick={addSpecificGoal}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Target size={16} className="mr-2" /> Add Goal
                </Button>
              </div>

              {/* Goals List */}
              <div className="space-y-4">
                {specificGoals.length === 0 ? (
                  <p className="text-slate-500 text-sm text-center py-8">No goals yet. Create your first goal above!</p>
                ) : (
                  specificGoals.map(goal => {
                    const progress = (goal.currentSavings / goal.targetAmount) * 100;
                    const dailyDiscipline = calculateDailyDiscipline(goal);
                    return (
                      <div key={goal.id} className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/40 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <h5 className="font-bold text-slate-200">{goal.name}</h5>
                            <p className="text-[11px] text-slate-500">Timeline: {goal.timelineMonths} months | Daily Discipline: <span className="text-emerald-400 font-bold">{formatCurrency(dailyDiscipline)}</span></p>
                          </div>
                          <Button
                            onClick={() => deleteGoal(goal.id)}
                            variant="ghost"
                            size="sm"
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                          >
                            Delete
                          </Button>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-emerald-400 font-bold">{formatCurrency(goal.currentSavings)} / {formatCurrency(goal.targetAmount)}</span>
                          </div>
                          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-emerald-500/20">
                            <div 
                              className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full transition-all duration-500"
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                          </div>
                          <div className="flex gap-2 mt-2">
                            <Button
                              onClick={() => updateGoalSavings(goal.id, dailyDiscipline)}
                              size="sm"
                              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
                            >
                              <Zap size={12} className="mr-1" /> Save Daily Discipline
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-right text-[10px] text-slate-600 font-medium">
        CREATED BY - @ASKFASHAL | UNIFIED TRACKER v1.0
      </div>
    </div>
  );
}
