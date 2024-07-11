import React, { useEffect, useState } from 'react';
import { getUrls } from '../services/userServices';
import { ThreeDots } from 'react-loader-spinner';

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
          color="#00BFFF" 
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
      
      <div className='row d-flex justify-content-center align-items-center vh-80'>
        <div className='card'>
            <div className='table-responsive'>
            <h2>URL List</h2>
      <table className='table table-striped table-bordered'>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Created At</th>
            <th>Click Count</th>
          </tr>
        </thead>
        <tbody>
          {urlStats.map((url) => (
            <tr key={url._id}>
              <td><a href={`https://incandescent-otter-95ca8c.netlify.app/api/url/${url.urlCode}`} target="_blank" rel="noopener noreferrer">{url.urlCode}</a></td>
              <td>{url.longUrl}</td>
              <td>{new Date(url.date).toLocaleDateString()}</td>
              <td>{url.clicks}</td>
            </tr>
          ))}
        </tbody>
      </table>  
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
