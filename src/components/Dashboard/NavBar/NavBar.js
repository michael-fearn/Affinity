import React, { Component } from 'react';
import NewScan from './NewScan/NewScan';
import axios from 'axios';
import DisplayButton from './DisplayButton/DisplayButton'
import { navBarActions } from './../../../redux/reducer'
import { connect } from 'react-redux';

class NavBar extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editUserName: false,
        }
    }
    editUserNameHandler = () => {
        const payload = { user_name: this.props.username };
        axios.put('/api/username', payload)
        this.setState({editUserName: false})
    }
    render() {
        return (
        <div className="nav-container">
            { this.state.editUserName ? (
                <div>
                    <input
                        value={this.props.username}
                        onChange={event => this.props.editUserName(event.target.value)}
                        type="text"
                        />
                    <button onClick={this.editUserNameHandler}>
                        Save</button>
                </div>
            ) : (
                <div onClick={() => this.setState({editUserName: true})}>
                {`Welcome ${this.props.username}`}</div>
            )}
            <DisplayButton
                buttonTitle="Your Domains" />
            <DisplayButton
                buttonTitle="Popular Pages" />
            <NewScan
                submitNewScanHandler={this.props.submitNewScanHandler} />
        </div>
        );
    }
}
function mapStateToProps(state){
    return {
        username: state.username
        // userDomains:
        // popularPages:

    }
}

export default connect(mapStateToProps, navBarActions)(NavBar);
