import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OutfitHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5002/api/outfitHistory', {
        headers: {
          'x-auth-token': token
        }
      });
      setHistory(res.data);
    };

    fetchHistory();
  }, []);

  return (
    <div className="history-container">
      <h2>Outfit History</h2>
      <ul>
        {history.map((item) => (
          <li key={item._id}>
            <p>Date: {new Date(item.date).toLocaleDateString()}</p>
            <p>Weather: {item.weather}</p>
            <p>Temperature: {item.temperature}°C</p>
            <p>Recommendation: {item.recommendation}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OutfitHistory;
