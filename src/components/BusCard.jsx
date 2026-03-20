function BusCard({ route }) {
  if (!route) return <p className="empty-msg">Select a route to begin tracking</p>;

  return (
    <div className="route-detail active">
      <h2>Next Arrival: {route.busNumber}</h2>
      <p>Destination: {route.routeName}</p>
      <div className="time">{route.arrivalTime} mins away</div>
      <span className={`status ${route.status.toLowerCase().replace(' ', '-')}`}>
        {route.status}
      </span>
    </div>
  );
}

export default BusCard;