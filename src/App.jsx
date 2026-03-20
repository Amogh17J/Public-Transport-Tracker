import { useState, useEffect, useCallback } from 'react';
import BusCard from './components/BusCard';
import RefreshToggle from './components/RefreshToggle';
import RouteDropdown from './components/RouteDropdown';
import './App.css';

function App() {
  const [routes, setRoutes] = useState([]);
  const [selectedRouteId, setSelectedRouteId] = useState('');
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);

// this is the Worker -> this is where the work starts

  const fetchTransportData = useCallback(async () => { // so useCallback is necessary to freeze the function everytime the it re-renders other wise it will be stuck in an infinite loop
    setLoading(true);
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=67'); // API limiting the number of bus routes to sixx sevenn
      const data = await response.json();
      
      
      const transportData = data.map(item => ({ // this 'fakes' the ToDo ID into a BusID
        id: item.id,
        routeName: item.title.split(' ')[0].toUpperCase(),
        busNumber: `B-${item.id + 100}`,
        arrivalTime: Math.floor(Math.random() * 7) + 1,
        status: item.completed ? 'On Time' : 'Delayed'
      }));

      setRoutes(transportData);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (error) {
      console.error("Critical Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Timer logic for the 30s auto-refresh.
  useEffect(() => {
    fetchTransportData();

    let interval;
    if (isAutoRefresh) {
      interval = setInterval(fetchTransportData, 30000);// every 30000 ms, it automatically pulls the "Worker"(fetch) to get fresh data.
    }

    return () => clearInterval(interval); // this is written so that the web-app does not keep running in the background is closed.
  }, [fetchTransportData, isAutoRefresh]);


  const selectedRoute = routes.find(r => r.id === parseInt(selectedRouteId)); // called the derived state

  return (
    <div className="container">
      <h1>Public Transport Tracker ⏳</h1>
      
      <RefreshToggle                      // 1. Toggle & Manual Refresh Component
        onRefresh={fetchTransportData} 
        isAuto={isAutoRefresh} 
        onToggle={setIsAutoRefresh} 
        loading={loading} 
      />

      <p className="timestamp">Last Updated: {lastUpdated}</p>

      {/* 2. Selection Dropdown Component */}
      <RouteDropdown 
        routes={routes} 
        selectedId={selectedRouteId} 
        onSelect={setSelectedRouteId} 
      />

      {/* 3. Conditional Rendering: Loading vs Result Card */}
      {loading ? (
        <div className="loader">Updating live schedule...</div>
      ) : (
        <BusCard route={selectedRoute} />
      )}
    </div>
  );
  
}

export default App;