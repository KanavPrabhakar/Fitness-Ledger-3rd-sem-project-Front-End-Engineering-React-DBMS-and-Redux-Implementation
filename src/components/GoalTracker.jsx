import React, { useState } from 'react';

export default function GoalTracker({ netBalance }) {
  const [target, setTarget] = useState(2000);
  const [isEditing, setIsEditing] = useState(false);
  const [tempTarget, setTempTarget] = useState(2000);

  const handleSave = (e) => {
    e.preventDefault();
    setTarget(Number(tempTarget));
    setIsEditing(false);
  };

  return (
    <article className="panel">
      <h2>Calorie Goal</h2>
      <p className="panel-subtitle">Manage your daily net target.</p>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--surface-raised)", padding: "1rem", borderRadius: "8px", border: "1px solid var(--line)" }}>
        <div>
          <p className="stat-label" style={{ margin: 0 }}>Target Limit</p>
          <p className="stat-value" style={{ fontSize: "1.5rem", margin: "0.2rem 0", color: "var(--water)" }}>{target} kcal</p>
        </div>
        {!isEditing ? (
          <button type="button" onClick={() => setIsEditing(true)} className="btn btn-ghost btn-small">Change Goal</button>
        ) : (
          <form onSubmit={handleSave} style={{ display: "flex", gap: "0.4rem" }}>
            <input 
              type="number" 
              value={tempTarget} 
              onChange={(e) => setTempTarget(e.target.value)} 
              style={{ width: "5rem", padding: "0.3em", background: "var(--bg)", border: "1px solid var(--line)", borderRadius: "6px", color: "var(--ink)" }}
            />
            <button type="submit" className="btn btn-small btn-primary">Save</button>
          </form>
        )}
      </div>
      
      <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "var(--ink-soft)" }}>
        {netBalance <= target ? "✅ You are within your daily target limit." : "⚠️ You have exceeded your target balance today."}
      </p>
    </article>
  );
}