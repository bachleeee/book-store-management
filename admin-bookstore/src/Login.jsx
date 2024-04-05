import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './store/actions/authActions';
import userService from './service/user.service';

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const dataLogin = {
      email,
      password
    }
    dispatch(login(dataLogin));
  };


  return (
    <div>
      <div className="container">
        <div className="login-page">
          <div className="login-container py-5">
            <h2>Đăng nhập</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleLogin}>
              <div>
                <label>Tên đăng nhập:</label>
                <input type="text" value={email} onChange={handleUsernameChange} />
              </div>
              <div>
                <label>Mật khẩu:</label>
                <input type="password" value={password} onChange={handlePasswordChange} />
              </div>
              <button type="submit">Đăng nhập</button>
            </form>
          </div>
        </div>
      </div>



    </div>
  );
};

export default Login;
