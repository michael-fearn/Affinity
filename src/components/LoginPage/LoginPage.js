import React, { Component } from 'react';
import LoginFrame from './LoginFrame/LoginFrame';
import ChartContainer from '../ChartContainer/ChartContainer';
import axios from 'axios';
// import './LoginPage.css';

export default class LoginPage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            showLoginFrame: true
        }
    }
    componentDidMount = () => {
        this.props.socket.emit('landing page')
        axios.get('/api/get/landingpagedata/')
            .then( response => {
                console.log(response)
            })
            .catch(err => console.log(err))
    }
    render() {

        return (
            <div >
                <div 
                    className="hide-button" 
                    onClick={() => this.setState({showLoginFrame: !this.state.showLoginFrame})}>
                        {this.state.showLoginFrame ? 'Hide Login' : 'Show Login'}
                      
                </div>

                <div className="login-page-container">
                
                { this.state.showLoginFrame ? (
                    <LoginFrame className="login-page-frame" />  
                ) : (
                    null
                )}
                    <div className="login-page-graph">
                        <ChartContainer
                            parent="login" />

                    </div>
                    
                </div>
            </div>
        )
    }
}
