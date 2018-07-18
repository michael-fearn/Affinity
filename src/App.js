import React, { Component } from 'react';

import socketIOClient from 'socket.io-client';
import { Switch, Route, withRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import LoginPage from './components/LoginPage/LoginPage'
import { connect } from 'react-redux';
import { dashboardActions } from './redux/reducer';


class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: "http://localhost:4000"
    }
    this.socket = socketIOClient(this.state.endpoint)
  }
  
  componentDidMount () {
    
    
    this.socket.emit('loading page')
    //this.props.resetSubmitNewScanHandler()


    this.socket.on( 'node zero', (baseUrl) => {
        console.log("scraper has fired and client knows about it")

        this.props.setBaseUrl(baseUrl)
    })

    this.socket.on('scrape data', (scraperData) => {
        this.props.updateScraperData(scraperData)
    })
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

export default withRouter(connect(null, dashboardActions)(App));

