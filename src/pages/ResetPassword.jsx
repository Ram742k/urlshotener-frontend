import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { resetPassword } from '../services/userServices'

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { token } = useParams(); // Get the token from the URL params

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
        await resetPassword (token, password);
        setMessage('Password reset successfully. Please log in.');

        // Clear the form fields
         setPassword('');
            setConfirmPassword('');
            
        // Redirect to the login page after successful password reset
        window.location.href = '/';
        
        
    } catch (error) {
          setError('Failed to reset password. Please try again.');
    }
  };

  return (
    <div className='container'>
        <div className='row d-flex justify-content-center align-items-center vh-100'>
            <div className='col-md-6'>
                <div className='card'>
                    <div className='card-header'>
                        <h3 className='text-center'>Reset Password</h3>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={handleSubmit}>
                            <div className='form-group row mt-3'>
                                <label htmlFor='password' className='col-4' >New Password</label>
                                <div className='col-8'>
                                    <input type='password' className='form-control' id='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>
                            </div>
                            
                            <div className='form-group row mt-3'>
                                <label htmlFor='confirmPassword' className='col-4' >Confirm Password</label>
                                <div className='col-8'>
                                    <input type='password' className='form-control' id='confirmPassword' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                                </div>
                            </div>
                            
                            <button type='submit' className='btn btn-primary btn-block mt-3'>Reset Password</button>
                            <p className='text-danger text-center mt-3'>{message}</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ResetPassword;
