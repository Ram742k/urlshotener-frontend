import React, { useState } from 'react';
import { login } from '../services/userServices';
import { useNavigate, Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await login(formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/dashboard');
      setError('');
    } catch (error) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center vh-80'>
        <div className='card col-12 col-md-6 col-lg-4'>
          <div>
            <h2 className='mb-5'>Login</h2>
            <form onSubmit={handleSubmit}>
              <div className='row form-group mt-4'>
                <label className='col-4' htmlFor='email'>Username</label>
                <div className='col-8'>
                  <input
                    type="email"
                    value={formData.email}
                    name="email"
                    className='form-control'
                    onChange={handleChange}
                    placeholder="Email"
                    required
                  />
                </div>
              </div>
              <div className='row form-group mt-4'>
                <label className='col-4' htmlFor='password'>Password</label>
                <div className='col-8'>
                  <input
                    type="password"
                    name="password"
                    className='form-control'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required
                  />
                </div>
              </div>
              
              <button type="submit" className='btn btn-primary mt-5 w-100' disabled={loading}>
                {loading ? (
                  <ThreeDots 
                    type="ThreeDots" 
                    color="#00BFFF" 
                    height={20} 
                    width={20} 
                  />
                ) : 'Login'}
              </button>
            </form>

            <p className='mt-5'>Don't have an account? <Link to="/register">Register</Link></p>
            <p className='mt-3'>Forgot your password? <Link to="/forgot-password">Reset Password</Link></p>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>  
        </div>
      </div>
    </div>
  );
};

export default Login;
