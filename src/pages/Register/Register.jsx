import React, { useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegis = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://api.egasaputra.cloud/api/auth/register', {
                email,
                password,
            });

            const { token } = response.data;
            // console.log(token)

            Cookies.set('access_token', token);

            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid email or password');
        }
    };

    return (
        <div className="login-container">
            <h2>Register</h2>
            <form onSubmit={handleRegis}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Register</button>
                <div className="question">
                    <p>Already have an account? </p> <Link to='/login'> Login</Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
