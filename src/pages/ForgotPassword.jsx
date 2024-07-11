import React, { useState } from 'react';
import { forgotPassword } from '../services/userServices';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      setMessage('If the email address exists, a password reset link will be sent.');
      setError('');
    } catch (error) {
      setError('Failed to send the reset password email.');
      setMessage('');
    }
  };

  return (
    <div className='container'>
      <div className='row justify-content-center align-items-center min-vh-100'>
        <div className='col-md-5'>
            <div className='card'>
                <div className='card-header'>
                    <h3>Forgot Password</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email</label>
                            <input    
                                type='email'
                                className='form-control'
                                id='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />  
                        </div>
                        
                        <button type="submit" className='btn btn-primary mt-2'>Send Reset Link</button>
                    </form>
                    <p className='mt-3'>Don't have an account? <a href='/register'>Register</a></p>
                    <p className='mt-1'>Already have an account? <a href='/'>Login</a></p>
                </div>
                {message && <div style={{ color: 'green' }}>{message}</div>}
                {error && <div style={{ color: 'red' }}>{error}</div>}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
