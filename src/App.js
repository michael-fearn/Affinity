import React, { Component } from 'react';
import routes from './routes';
import './App.css';
import socketIOClient from 'socket.io-client';

import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {
  constructor() {
    super()

    this.state = {
      endpoint: "http://localhost:4000",
      data: [],
      input: ''
    }
    this.socket = socketIOClient(this.state.endpoint)
  }

  send = () => {  
    this.socket.emit('send data', this.state.input)
  }
  
  componentDidMount () {
    this.socket.on('send data', data => {
      console.log(data)
      this.setState({ data: [...this.state.data, ...data]})
    })
  }
  
  render() {
    
    

    return (
    <div className="app">
      {/* //    { routes }
      //  </div> */}
      <input 
        onChange={(event) => this.setState({input: event.target.value})}
        value={this.state.input}
        type="text"/>
    <button onClick={ () => this.send() }>send</button>
        {this.state.data}
      </div>
    );
  }
}

export default App;

