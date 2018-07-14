import React, { Component } from 'react';
import './App.css';
import socketIOClient from 'socket.io-client';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage'

class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: "http://localhost:4000"
    }
    this.socket = socketIOClient(this.state.endpoint)
  }

  render() {
      

    return (
      <div>

            <Switch>
              <Route exact path='/' render={ () => {
                return <LoginPage socket={this.socket} />
              }} />

              <Route path='/dashboard' render={ () => {
                return <Dashboard socket={this.socket} />
              }} />
            </Switch>
      </div>
    );
  }
}

export default App;

