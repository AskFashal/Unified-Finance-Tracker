import React, { useState, useEffect } from 'react';
import { CheckCircle2, Award, Calendar } from 'lucide-react';

export default function HabitTrackerSection() {
  const [habits, setHabits] = useState(Array(10).fill(''));
  const [grid, setGrid] = useState<Record<string, boolean>>({});
  const [isLoaded, setIsLoaded] = useState(false);

  // Auto-Sync Month/Year for India Standard Time
  const today = new Date();
  const monthName = today.toLocaleString('en-IN', { month: 'long' });
  const currentYear = today.getFullYear();

  // Load from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('fashal-habits-names');
    const savedGrid = localStorage.getItem('fashal-habits-grid');
    
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (e) {
        console.error('[v0] Error loading habits:', e);
      }
    }
    
    if (savedGrid) {
      try {
        setGrid(JSON.parse(savedGrid));
      } catch (e) {
        console.error('[v0] Error loading grid:', e);
      }
    }
    
    setIsLoaded(true);
  }, []);

  // Save habits to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fashal-habits-names', JSON.stringify(habits));
    }
  }, [habits, isLoaded]);

  // Save grid to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('fashal-habits-grid', JSON.stringify(grid));
    }
  }, [grid, isLoaded]);

  const toggleCheck = (hIdx: number, day: number) => {
    const id = `${hIdx}-${day}`;
    setGrid(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateHabit = (hIdx: number, value: string) => {
    const newHabits = [...habits];
    newHabits[hIdx] = value;
    setHabits(newHabits);
  };

  const getHabitCompletion = (hIdx: number) => {
    let count = 0;
    for (let day = 1; day <= 31; day++) {
      if (grid[`${hIdx}-${day}`]) count++;
    }
    return count;
  };

  return (
    <div className="mt-6 bg-slate-900/80 border border-emerald-500/30 rounded-[2.5rem] p-6 backdrop-blur-md shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h3 className="text-white text-xl font-bold flex items-center gap-2">
            <Award className="text-emerald-500" size={20} /> 
            Monthly Habit Tracker
          </h3>
          <p className="text-slate-500 text-xs">"Success is the product of daily habits" — James Clear</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-2xl text-emerald-400 font-mono text-sm">
          {monthName} {currentYear}
        </div>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full border-collapse">
          <thead>
            <tr className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">
              <th className="p-2 text-left min-w-[150px]">Habits / Protocols</th>
              {[...Array(31)].map((_, i) => (
                <th key={i} className="p-1 text-center w-8 border-l border-white/5">{i + 1}</th>
              ))}
              <th className="p-2 text-center min-w-[60px] border-l border-white/5">Total</th>
            </tr>
          </thead>
          <tbody>
            {habits.map((habit, hIdx) => {
              const completion = getHabitCompletion(hIdx);
              return (
                <tr key={hIdx} className="border-t border-white/5 group hover:bg-white/5 transition-colors">
                  <td className="p-2">
                    <input 
                      type="text" 
                      value={habit}
                      onChange={(e) => updateHabit(hIdx, e.target.value)}
                      placeholder={`Habit ${hIdx + 1}...`}
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
                        className={`p-1 border-l border-white/5 cursor-pointer transition-all
                          ${isChecked ? 'bg-emerald-500/20' : 'hover:bg-emerald-500/10'}`}
                      >
                        <div className={`flex items-center justify-center transition-transform ${isChecked ? 'scale-110 text-emerald-500' : 'text-transparent'}`}>
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
      
      <div className="mt-4 text-right text-[10px] text-slate-600 font-medium">
        CREATED BY - @ASKFASHAL
      </div>
    </div>
  );
}
