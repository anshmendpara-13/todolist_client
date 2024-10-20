import React, { useState } from 'react';
import styles from './Login.module.css';
import login from '../../assets/login.png';
import { Button, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import AuthServices from '../../services/authServices';
import { getErrorMessage } from '../../util/GetError';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async () => {
    if (!username || !password) {
      message.warning("Please enter both username and password.");
      return;
    }

    setLoading(true);
    try {
      const data = { username, password };
      const response = await AuthServices.loginUser(data);
      localStorage.setItem('toDoAppUser', JSON.stringify(response.data));
      message.success("Logged in successfully!");
      navigate('/to-do-list');
    } catch (err) {
      message.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.login__card}>
      <img src={login} alt="Login" />
      <h2>Login</h2>
      <div className={styles.input__wrapper}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
      </div>
      <div className={styles.input__wrapper}>
        <Input.Password
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
      </div>
      <div className={styles.input__info}>
        New User? <Link to="/register">Register</Link>
      </div>
      <Button
        loading={loading}
        type="primary"
        size="large"
        disabled={!username || !password}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
