import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:4000')

class Dashboard extends Component{
    constructor(props){
        super (props)

        this.state = {
            data: null
        }
    }

    subscribeToData = () => {
        socket.on('data', data => {
            console.log("connected")
        })
        socket.emit('myotherevent', { my: 'data' })
    }
    componentDidMount () {
        this.subscribeToData
    }

    render() {
        return(
            <div>Dashboard
            {this.state.data}
            
            </div>
        )
    }
}

export default connect(null)(Dashboard)