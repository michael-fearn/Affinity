import React from 'react';

import './Login.css';
function Login() {
    function login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let redirectUri = encodeURIComponent(`http://localhost:3005/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
      }

    return (
        <div className="login-container">
            <div className="login-background"></div>
            <h1 className="login-title">Affinity</h1>
            <div onClick={login} className="login-button">Login</div>
        </div>
    );
}

export default Login;
