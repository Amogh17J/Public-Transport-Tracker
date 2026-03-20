function RefreshToggle({ onRefresh, isAuto, onToggle, loading }) {
  return (
    <div className="controls">
      <button onClick={onRefresh} disabled={loading} className="refresh-btn">
        {loading ? '⏳ Wait' : '🔄 Refresh Now'} 
      </button>
      
      <label className="toggle-label">
        <input 
          type="checkbox" 
          checked={isAuto} 
          onChange={(e) => onToggle(e.target.checked)} 
        />
        Auto-refresh (30s)
      </label>
    </div>
  );
}

export default RefreshToggle;