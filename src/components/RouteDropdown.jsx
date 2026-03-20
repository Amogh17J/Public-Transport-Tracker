import { useState } from 'react';

function RouteDropdown({ routes, selectedId, onSelect }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = routes.filter(route => 
    route.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.routeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filter-section">
      <input 
        type="text" 
        placeholder="Search bus number or route..." 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      
      <select onChange={(e) => onSelect(e.target.value)} value={selectedId}>
        <option value="">-- {filteredRoutes.length} Results Found --</option>
        {filteredRoutes.map(route => (
          <option key={route.id} value={route.id}>
            {route.busNumber} - {route.routeName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RouteDropdown;