import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const { setUsername: setContextUsername } = useContext(UserContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    // Make a POST request to the login API endpoint
    const response = await fetch('http://localhost:8080/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if(response.ok) {
      setContextUsername(username)
      history.push("/new-operation")
    }

    // Reset the form after submission
    setUsername('');
    setPassword('');
  };

  const handleCancel = () => {
    // Reset the form when the cancel button is clicked
    setUsername('');
    setPassword('');
  };

  return (
     <div className="container">
      <h2>Login Page</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button type="button" className="btn btn-primary" onClick={handleCancel}>
          Clear
        </button>
      </form>
    </div>
  );
};

export default Login;