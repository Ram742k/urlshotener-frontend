// src/pages/CreateShortUrl.js
import React, { useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { createShortUrl } from '../services/userServices';

const CreateShortUrl = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [urlCode, setUrlCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await createShortUrl(longUrl);
      console.log(response.shortUrl);
      setShortUrl(response.shortUrl);
        setUrlCode(response.urlCode);
    } catch (error) {
      console.error(error);
      
      setError('Failed to create short URL. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
        <div className='row justify-content-center align-items-center vh-80'>
             <div className='col-md-8 card'>
                <div className='card-body'>
                     <h3 className='card-title text-center'>Create Short URL</h3>
                     <form onSubmit={onSubmit}>
                            <div className='form-group'>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter long URL"
                                  value={longUrl}
                                  onChange={(e) => setLongUrl(e.target.value
                                  )}
                                  />
                            </div>
                             <button type="submit" className="btn btn-primary mt-3">Create Short URL</button>
                    </form>
                     {loading ? (
                        <ThreeDots type="ThreeDots" color="#00BFFF" height={80} width={80} />
                    ) : (
                    shortUrl && (
                        <div className='mt-5'>
                            Short URL:{' '}
                                   <b> <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                                        {urlCode}
                                    </a></b>
                        </div>
                    )
                        )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
                </div>
             </div>
        </div>
    </div>
  );
};

export default CreateShortUrl;
