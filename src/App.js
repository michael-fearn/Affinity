import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';
import { Switch, Route, withRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage'
import { connect } from 'react-redux';
import { appActions } from './redux/reducer';
import axios from 'axios';


class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: `${window.origin}`,
      loggedIn: false
    }
    this.socket = socketIOClient()
  }

  isUserLoggedInHandler = () => {
    axios.get('/api/verifyuser')
      .then((response) => {
        this.setState({loggedIn: response.data})
      })
  }

  componentDidMount () {
    this.socket.on( 'node zero', (baseUrl) => {
        this.props.resetSubmitNewScanHandler()
        window.addEventListener('onbeforeunload', this.destroySession)
    })

    this.socket.on('scrape data', (scraperData) => {
        this.props.updateScraperData(scraperData)
    })
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.destroySession)
  }
  
  destroySession() {
    axios.delete('/api/destroy')
  }

  render() {
    return (
      <div className="site-wrapper">
        <Switch>
          <Route exact path='/' render={ () => {
            return <LoginPage socket={this.socket} />
          }} />
          <Route path='/dashboard' render={ () => {
            return <Dashboard
              history={this.props.history} 
              isUserLoggedIn={this.state.loggedIn} 
              isUserLoggedInHandler={this.isUserLoggedInHandler} 
              socket={this.socket} />
          }} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null, appActions)(App));

