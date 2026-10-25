import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';

export default function App() {
  const [user, setUser] = useState(null);
  const [isLoginTab, setIsLoginTab] = useState(true);


  useEffect(() => {
    const sessionUser = sessionStorage.getItem('ft_session');
    if (sessionUser) setUser(sessionUser);
  }, []);

  const handleAuth = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    sessionStorage.setItem('ft_session', username);
    setUser(username);
  };

  if (user) {
    return <Dashboard username={user} onLogout={() => {
      sessionStorage.removeItem('ft_session');
      setUser(null);
    }} />;
  }

  return (
    <div className="auth-page">
      <main className="auth-shell">
        <section className="auth-brand">
          <p className="eyebrow">Fitness Ledger</p>
          <h1>Fuel in. Energy out.<br />One daily balance.</h1>
          <p className="auth-brand-copy">Log what you eat and what you train, and watch today's balance settle.</p>
        </section>

        <section className="auth-card">
          <div className="tabs">
            <button type="button" className={`tab-btn ${isLoginTab ? 'active' : ''}`} onClick={() => setIsLoginTab(true)}>Log in</button>
            <button type="button" className={`tab-btn ${!isLoginTab ? 'active' : ''}`} onClick={() => setIsLoginTab(false)}>Sign up</button>
          </div>

          <form className="auth-form" onSubmit={handleAuth}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" type="text" required />
            
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required />
            
            {!isLoginTab && (
              <>
                <label htmlFor="weight">Body weight (kg)</label>
                <input id="weight" name="weight" type="number" min="1" required />
              </>
            )}
            
            <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>
              {isLoginTab ? 'Log in' : 'Create account'}
            </button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}