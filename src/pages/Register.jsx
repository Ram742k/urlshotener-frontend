import React, { useState } from 'react';
import { registerUser } from '../services/userServices'; // Import the registerUser function
import { ThreeDots } from 'react-loader-spinner'; // Import the ThreeDots loader
import {useNavigate, Link} from 'react-router-dom'; // Import useNavigate from react-router-dom
const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Add react-router-dom for navigation

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true); // Show loading spinner

    // Basic form validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false); // Hide loading spinner
      return;
    }

    try {
      await registerUser(formData);
      setSuccess('Registration successful. Please check your email for activation.');
      setLoading(false); // Hide loading spinner
      setTimeout(() => navigate('/'), 3000); // Redirect to login page after 3 seconds
    } catch (err) {
      setError(err.response?.data?.msg || 'Registration failed');
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <div className='container'>
      <div className='row d-flex justify-content-center align-items-center vh-80'>
        <div className='col-md-5 card'>
        <h1>Register</h1>
      {loading && <ThreeDots color="#000" height={80} width={80} />} {/* Show spinner when loading */}
      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className='form-group row'>
          <label htmlFor="email" className='col-4'>Email:</label>
          <div className='col-8'>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
          </div>
        </div>
        <div className='form-group row mt-2'>
          <label htmlFor="firstName" className='col-4' >First Name:</label>
          <div className='col-8'>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-control"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          </div>
        </div>
        <div className='form-group row mt-2'>
          <label htmlFor="lastName" className='col-4' >Last Name:</label>
          <div className='col-8'>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
                />  
          </div>

        </div>
        <div className='form-group row mt-2'>
            <label htmlFor="password" className='col-4' >Password:</label>
            <div className='col-8'>
               <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                value={formData.password}
                onChange={handleChange}
                required
                />
            </div>
        </div>
        <div className='form-group row mt-2'>
          <label htmlFor="confirmPassword" className='col-4' >Confirm Password:</label>
          <div className='col-8'>
               <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                />
          </div>
        </div>
        
        <button type="submit" className=' btn btn-primary mt-3'>Register</button>

      </form> 
      <p>Already have an account? <Link to="/">Login</Link></p>

        </div>
      </div>
    </div>
  );
};

export default Register;
