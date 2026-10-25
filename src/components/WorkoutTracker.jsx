import React, { useState } from 'react';

const WORKOUTS = [
  { name: "Walking (moderate pace)", met: 3.5 },
  { name: "Running (6 mph)", met: 9.8 },
  { name: "Cycling (moderate)", met: 7.5 },
  { name: "Swimming", met: 6.0 },
  { name: "Weight training", met: 5.0 },
  { name: "Yoga", met: 3.0 },
  { name: "Jump rope", met: 12.3 },
  { name: "HIIT circuit", met: 8.0 },
];

export default function WorkoutTracker({ weightKg = 70, onUpdateBurned }) {
  const [selectedMet, setSelectedMet] = useState(WORKOUTS[0].met);
  const [selectedName, setSelectedName] = useState(WORKOUTS[0].name);
  const [duration, setDuration] = useState(30);
  const [workoutsLog, setWorkoutsLog] = useState([]);

  const handleWorkoutSubmit = (e) => {
    e.preventDefault();
    const durNum = Number(duration);
    if (!durNum || durNum <= 0) return alert("Enter a valid duration");

    // Calorie formula: MET * weight in kg * (duration in hours)
    const calsBurned = Math.round(selectedMet * weightKg * (durNum / 60));
    
    const newEntry = {
      name: selectedName,
      duration: durNum,
      calories: calsBurned
    };

    const updatedLog = [...workoutsLog, newEntry];
    setWorkoutsLog(updatedLog);

    // Send total burned cals up to Dashboard via Props
    const totalBurned = updatedLog.reduce((sum, item) => sum + item.calories, 0);
    onUpdateBurned(totalBurned);
  };

  return (
    <article className="panel">
      <h2>Workout log</h2>
      <form onSubmit={handleWorkoutSubmit} className="inline-form-stacked" style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.3rem", color: "var(--ink-soft)" }}>Workout</label>
          <select 
            value={selectedMet} 
            onChange={(e) => {
              const opt = e.target.selectedOptions[0];
              setSelectedMet(Number(e.target.value));
              setSelectedName(opt.text);
            }}
            style={{ width: "100%", padding: "0.6em 0.8em", background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: "8px", color: "var(--ink)" }}
          >
            {WORKOUTS.map((w, idx) => (
              <option key={idx} value={w.met}>{w.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={{ fontSize: "0.85rem", fontWeight: "600", display: "block", marginBottom: "0.3rem", color: "var(--ink-soft)" }}>Duration (minutes)</label>
          <input 
            type="number" 
            min="1" 
            value={duration} 
            onChange={(e) => setDuration(e.target.value)}
            style={{ width: "100%", padding: "0.6em 0.8em", background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: "8px", color: "var(--ink)" }}
          />
        </div>
        <button type="submit" className="btn btn-primary">Add workout</button>
      </form>

      <h3>Today</h3>
      <ul className="ledger-list">
        {workoutsLog.length === 0 ? (
          <li className="empty-state" style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>No workouts logged yet today.</li>
        ) : (
          workoutsLog.map((entry, idx) => (
            <li key={idx} className="ledger-row">
              <div>
                <p className="ledger-title">{entry.name}</p>
                <p className="ledger-sub" style={{ fontSize: "0.8rem", color: "var(--ink-soft)" }}>{entry.duration} min</p>
              </div>
              <div className="ledger-value withdrawal">-{entry.calories} kcal</div>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}