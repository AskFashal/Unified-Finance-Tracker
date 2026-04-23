'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Settings, CheckCircle2, Activity, TrendingUp } from 'lucide-react';

interface HabitTrackerState {
  habitCount: number;
  grid: Record<string, boolean>;
  habitNames: Record<number, string>;
}

export default function AskFashalMasterTracker() {
  const [habitCount, setHabitCount] = useState(10);
  const [grid, setGrid] = useState<Record<string, boolean>>({});
  const [habitNames, setHabitNames] = useState<Record<number, string>>({});
  const [isLoaded, setIsLoaded] = useState(false);
  const daysInMonth = 31;

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('fashal-master-tracker');
    if (saved) {
      try {
        const data: HabitTrackerState = JSON.parse(saved);
        setHabitCount(data.habitCount);
        setGrid(data.grid);
        setHabitNames(data.habitNames);
      } catch (e) {
        console.error('[v0] Error loading master tracker:', e);
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
      };
      localStorage.setItem('fashal-master-tracker', JSON.stringify(dataToSave));
    }
  }, [habitCount, grid, habitNames, isLoaded]);

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

  // Get today's date
  const today = new Date();
  const monthName = today.toLocaleString('en-IN', { month: 'long' });
  const currentYear = today.getFullYear();

  return (
    <div className="mt-8 space-y-6">
      {/* Header with Toggle Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-slate-900/80 border border-emerald-500/30 rounded-[2.5rem] backdrop-blur-md shadow-2xl">
        <div>
          <h3 className="text-white text-xl font-bold flex items-center gap-2 mb-2">
            <Activity className="text-emerald-500" size={20} />
            Master Habit Tracker
          </h3>
          <p className="text-slate-500 text-xs">"Success is the product of daily habits" — James Clear</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          {/* Monthly Completion Badge */}
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl text-emerald-400 font-mono text-sm">
            {monthName} {currentYear} • {monthlyCompletion}% Complete
          </div>

          {/* Focus Level Toggle */}
          <div className="flex items-center gap-2 bg-black/40 p-1 rounded-2xl border border-white/5">
            <Settings size={14} className="text-slate-500 ml-2" />
            {[3, 5, 7, 10].map((num) => (
              <button
                key={num}
                onClick={() => setHabitCount(num)}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  habitCount === num
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                    : 'text-slate-500 hover:bg-white/5'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Dynamic Habit Grid */}
      <div className="bg-slate-900 border border-emerald-500/20 rounded-[2.5rem] p-6 overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
                <th className="p-2 text-left min-w-[150px]">Daily Protocols</th>
                {[...Array(31)].map((_, i) => (
                  <th key={i} className="p-1 text-center w-8 border-l border-white/5">
                    {i + 1}
                  </th>
                ))}
                <th className="p-2 text-center min-w-[60px] border-l border-white/5">Total</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(habitCount)].map((_, hIdx) => {
                const completion = getHabitCompletion(hIdx);
                return (
                  <tr key={hIdx} className="border-t border-white/5 group hover:bg-white/5 transition-colors">
                    <td className="p-2">
                      <input
                        type="text"
                        value={habitNames[hIdx] || ''}
                        onChange={(e) => updateHabitName(hIdx, e.target.value)}
                        placeholder={`Focus #${hIdx + 1}...`}
                        className="bg-transparent text-slate-300 text-xs w-full focus:outline-none focus:text-emerald-400 placeholder:text-slate-700"
                      />
                    </td>
                    {[...Array(31)].map((_, dIdx) => {
                      const day = dIdx + 1;
                      const isChecked = grid[`${hIdx}-${day}`];
                      return (
                        <td
                          key={day}
                          onClick={() => toggleCheck(hIdx, day)}
                          className={`p-1 border-l border-white/5 cursor-pointer transition-all ${
                            isChecked ? 'bg-emerald-500/20' : 'hover:bg-emerald-500/5'
                          }`}
                        >
                          <div
                            className={`flex items-center justify-center transition-transform ${
                              isChecked ? 'scale-110 text-emerald-500' : 'text-transparent'
                            }`}
                          >
                            <CheckCircle2 size={14} />
                          </div>
                        </td>
                      );
                    })}
                    <td className="p-2 text-center text-xs font-bold text-emerald-400 border-l border-white/5">
                      {completion}/31
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Graph */}
      <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem]">
        <div className="flex items-center gap-2 mb-4 text-emerald-500 font-bold text-sm tracking-widest">
          <TrendingUp size={16} /> DAILY COMPLETION % GRAPH
        </div>
        <svg viewBox="0 0 930 100" className="w-full h-24 overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <line
              key={`grid-${pct}`}
              x1="0"
              y1={100 - pct}
              x2="930"
              y2={100 - pct}
              stroke="#334155"
              strokeWidth="0.5"
              opacity="0.5"
            />
          ))}

          {/* Performance line */}
          <polyline
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={chartData.map((pct, i) => `${i * 30 + 10},${100 - pct}`).join(' ')}
            className="drop-shadow-[0_0_10px_rgba(16,185,129,0.6)] transition-all duration-700"
          />

          {/* Data points */}
          {chartData.map((pct, i) => (
            <circle
              key={`dot-${i}`}
              cx={i * 30 + 10}
              cy={100 - pct}
              r="2"
              fill="#10B981"
              opacity="0.8"
            />
          ))}
        </svg>

        {/* Y-axis labels */}
        <div className="text-[10px] text-slate-600 mt-2 flex justify-between">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-right text-[10px] text-slate-600 font-medium px-4">
        CREATED BY - @ASKFASHAL • DATA PERSISTS AUTOMATICALLY
      </div>
    </div>
  );
}
