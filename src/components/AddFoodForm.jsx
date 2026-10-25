import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFood } from '../redux/fitnessSlice';
import { saveDailyLog } from '../services/api';

export default function AddFoodForm() {
  const [name, setName] = useState('');
  const [calories, setCalories] = useState('');
  const dispatch = useDispatch();
  const { user, currentDate, foodLog, workoutLog, waterLog } = useSelector((state) => state.fitness);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents page reload (Core form handling concept)
    if (!name || !calories) return;

    const newItem = {
      id: Date.now().toString(),
      name,
      calories: Number(calories),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update Redux Global State
    dispatch(addFood(newItem));

    // Sync with MongoDB DBMS Backend
    if (user) {
      saveDailyLog({
        username: user.username,
        date: currentDate,
        food: [...foodLog, newItem],
        workouts: workoutLog,
        water: waterLog
      });
    }

    // Reset Form Fields
    setName('');
    setCalories('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4 shadow-xl">
      <h3 className="text-white font-bold text-lg flex items-center gap-2">
        <span>📝</span> Custom Food Form
      </h3>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Food Item Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="e.g., Dal Paratha & Dahi"
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Calories (kcal)</label>
        <input 
          type="number" 
          value={calories} 
          onChange={(e) => setCalories(e.target.value)} 
          placeholder="e.g., 400"
          className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
          required
        />
      </div>
      <button 
        type="submit" 
        className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-bold py-3 rounded-2xl transition-all shadow-lg shadow-emerald-950 text-sm"
      >
        Submit & Sync to DBMS
      </button>
    </form>
  );
}