import React, { useState } from 'react';
import FoodTracker from './FoodTracker';
import WorkoutTracker from './WorkoutTracker';
import WaterTracker from './WaterTracker';
import Footer from './Footer';

export default function Dashboard({ username, onLogout }) {
  const [consumed, setConsumed] = useState(0);
  const [burned, setBurned] = useState(0);

  const netBalance = consumed - burned;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
      <header className="topbar">
        <p className="brand">Fitness Ledger</p>
        <div className="topbar-user">
          <span>Welcome, {username}</span>
          <button onClick={onLogout} className="btn btn-ghost">Log out</button>
        </div>
      </header>

      <main className="dashboard" style={{ flex: 1 }}>
        <section className="ledger-summary">
          <div className="stat">
            <p className="stat-label">Consumed</p>
            <p className="stat-value deposit">{consumed}</p>
            <p className="stat-unit">kcal</p>
          </div>
          <div className="stat stat-balance">
            <p className="stat-label">Net balance</p>
            <p className={`stat-value ${netBalance >= 0 ? 'deposit' : 'withdrawal'}`}>
              {netBalance > 0 ? `+${netBalance}` : netBalance}
            </p>
            <p className="stat-unit">kcal</p>
          </div>
          <div className="stat">
            <p className="stat-label">Burned</p>
            <p className="stat-value withdrawal">{burned}</p>
            <p className="stat-unit">kcal</p>
          </div>
        </section>

        <section className="panel-grid">
          <FoodTracker onUpdateCals={setConsumed} />
          <WorkoutTracker weightKg={70} onUpdateBurned={setBurned} />
          <WaterTracker />
        </section>
      </main>
      <Footer />
    </div>
  );
}