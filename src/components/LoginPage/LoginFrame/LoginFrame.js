import React from 'react';
import { connect } from 'react-redux';

function LoginFrame (props) {
    function login() {
        let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
        let redirectUri = encodeURIComponent(`http://localhost:4000/auth/callback`);
        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }

    function dashboard() {
        window.location = '#/dashboard'
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
            <div className="login-button-container">
                <div onClick={login} className="login-button">Login</div>
                <div onClick={dashboard} className="login-button">Continue</div>
            </div>
        </div>
    );
}
function mapStateToProps(state) {
    return {
        scraperData: state.scraperData
    }
}

export default connect(mapStateToProps)(LoginFrame);
