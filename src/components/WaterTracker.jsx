import React, { useState } from 'react';

const QUICK_AMOUNTS = [250, 500, 750];

export default function WaterTracker() {
  const [waterTotal, setWaterTotal] = useState(0);
  const [customMl, setCustomMl] = useState("");
  const [waterLog, setWaterLog] = useState([]);
  const goalMl = 2000;

  const addWater = (ml) => {
    const amount = Number(ml);
    if (!amount || amount <= 0) return;

    const newTotal = waterTotal + amount;
    setWaterTotal(newTotal);
    setWaterLog([...waterLog, { ml: amount }]);
    setCustomMl("");
  };

  const percent = Math.min(100, Math.round((waterTotal / goalMl) * 100));

  return (
    <article className="panel">
      <h2>Hydration</h2>
      <div className="progress-track" style={{ height: "10px", background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: "999px", overflow: "hidden", marginBottom: "0.4rem" }}>
        <div className="progress-fill water-fill" style={{ width: `${percent}%`, height: "100%", background: "linear-gradient(90deg, #2e7fd9, var(--water))", transition: "width 0.25s ease" }}></div>
      </div>
      <p className="progress-label" style={{ fontFamily: "var(--font-mono)", fontSize: "0.85rem", color: "var(--ink-soft)", margin: "0 0 1rem" }}>
        <span>{waterTotal}</span> / <span>{goalMl}</span> ml
      </p>

      <div className="quick-buttons" style={{ display: "flex", gap: "0.5rem", marginBottom: "0.9rem", flexWrap: "wrap" }}>
        {QUICK_AMOUNTS.map((ml) => (
          <button key={ml} type="button" onClick={() => addWater(ml)} className="btn btn-small btn-ghost">
            +{ml} ml
          </button>
        ))}
      </div>

      <form onSubmit={(e) => { e.preventDefault(); addWater(customMl); }} className="inline-form" style={{ display: "flex", gap: "0.6rem", marginBottom: "0.5rem" }}>
        <input 
          type="number" 
          min="1" 
          value={customMl} 
          onChange={(e) => setCustomMl(e.target.value)}
          placeholder="Custom amount (ml)" 
          style={{ flex: 1, padding: "0.6em 0.8em", background: "var(--surface-raised)", border: "1px solid var(--line)", borderRadius: "8px", color: "var(--ink)" }}
        />
        <button type="submit" className="btn btn-primary">Add</button>
      </form>

      <h3>Today</h3>
      <ul className="ledger-list">
        {waterLog.length === 0 ? (
          <li className="empty-state" style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>No water logged yet today.</li>
        ) : (
          waterLog.map((entry, idx) => (
            <li key={idx} className="ledger-row">
              <div>
                <p className="ledger-title">Water</p>
              </div>
              <div className="ledger-value" style={{ color: "var(--water)" }}>{entry.ml} ml</div>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}