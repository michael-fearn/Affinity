import React from 'react';

function LoginFrame () {
    function login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let redirectUri = encodeURIComponent(`http://localhost:4000/auth/callback`);
        window.location = 'http://localhost:3000/#/dashboard'
        // window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
      }

    return (
        <div className="login-container">
            <div className="login-light-border"></div>
            <div className="login-background-light light-1"></div>
            <div className="login-background-light light-2"></div>
            <div className="login-background-light light-3"></div>
            <div className="login-background-light light-4"></div>
            <div className="login-background-light light-5"></div>
            <div className="login-background-light light-5"></div>
            <div className="login-background"></div>
 
            <h1 className="login-title">Affinity</h1>
            <div onClick={login} className="login-button">Login</div>
        </div>
    );
}

export default LoginFrame;
