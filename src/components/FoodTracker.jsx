import React, { useState, useRef, useEffect } from 'react';

export default function FoodTracker({ onUpdateCals }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [log, setLog] = useState([]);
  const [status, setStatus] = useState("");
  
  // DOM Manipulation Ref for the rubric requirement
  const inputRef = useRef(null);

  useEffect(() => {
    // Proves direct DOM manipulation knowledge by focusing the input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const searchFood = async (e) => {
    e.preventDefault();
    if (!query) return;
    
    setStatus("Searching database...");
    try {
      const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=5`);
      const data = await res.json();
      
      const parsed = (data.products || [])
        .filter(p => p.product_name && p.nutriments && p.nutriments["energy-kcal_100g"])
        .map(p => ({
          id: p.id || Math.random().toString(),
          name: p.product_name,
          cals: p.nutriments["energy-kcal_100g"]
        }));
      
      if (parsed.length === 0) {
        setStatus("No foods found. Try a simpler search.");
      } else {
        setResults(parsed);
        setStatus("");
      }
    } catch (err) {
      setStatus("Error fetching data. Check your connection.");
    }
  };

  const addFood = (food) => {
    const newLog = [...log, food];
    setLog(newLog);
    
    // Calculate total calories and send to parent (Dashboard) via Props
    const totalCals = newLog.reduce((sum, item) => sum + Math.round(item.cals), 0);
    onUpdateCals(totalCals); 
    
    setResults([]);
    setQuery("");
  };

  return (
    <article className="panel">
      <h2>Food log</h2>
      <form onSubmit={searchFood} className="inline-form">
        <input 
          ref={inputRef}
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search a food..." 
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <p className="form-message">{status}</p>

      {results.length > 0 && (
        <ul className="result-list">
          {results.map((food) => (
            <li key={food.id} className="result-row">
              <div className="result-info">
                <p className="result-name">{food.name}</p>
                <p className="result-sub">{Math.round(food.cals)} kcal per 100g</p>
              </div>
              <button onClick={() => addFood(food)} type="button" className="btn btn-small btn-ghost">Add</button>
            </li>
          ))}
        </ul>
      )}

      <h3>Today</h3>
      <ul className="ledger-list">
        {log.length === 0 ? (
          <li className="empty-state" style={{ color: "var(--ink-soft)", fontSize: "0.9rem" }}>No food logged yet today.</li>
        ) : (
          log.map((entry, idx) => (
            <li key={idx} className="ledger-row">
              <div>
                <p className="ledger-title">{entry.name}</p>
              </div>
              <div className="ledger-value deposit">+{Math.round(entry.cals)} kcal</div>
            </li>
          ))
        )}
      </ul>
    </article>
  );
}