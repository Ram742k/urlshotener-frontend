import React, { useEffect, useState } from 'react';
import { getUrls } from '../services/userServices';
import { ThreeDots } from 'react-loader-spinner';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
// Register the components with Chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
  const [urlStats, setUrlStats] = useState([]);
  console.log(urlStats);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUrlStats = async () => {
      try {
        const response = await getUrls();
        setUrlStats(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch URL statistics.');
        setLoading(false);
      }
    };

    fetchUrlStats();
  }, []);

 
  if (loading) {
    return (
      <div className=' d-flex justify-content-center align-items-center vh-80'>
        <ThreeDots 
          className="loader"
          height="80" 
          width="80" 
          color="#000" 
          ariaLabel="three-dots-loading" 
        />
        
      </div>
    );
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }
  const data = {
    labels: urlStats.map(url => url.shortUrl),
    datasets: [{
        label: 'Click Count',
        data: urlStats.map(url => url.clicks),
        backgroundColor: 'rgba(75,192,192,0.6)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
    }]
};
  return (
    <div className='container'>
        <div className='row'>
        {urlStats.length > 0 ? (
                <Bar data={data} style={{
                    width: '80%',
                    height: '80%',
                    marginTop: '10%',
                    position: 'relative',
                    backgroundColor: 'white',
                }} />
            ) : (
                <p>No data available</p>
            )}
        </div>
   
    </div>
  );
};

export default Dashboard;
