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
            showDeletePrompt: false,
        }
    }

    deleteUserHandler = () => {
        axios.delete('/api/user')
        this.props.history.push('/')
    }

    editUserNameHandler = () => {
        const payload = { user_name: this.props.username };
        axios.put('/api/username', payload)
        this.setState({editUserName: false})
    }

    render() {
        let loggedInMenuItems = (
                <div>

                    { this.state.editUserName ? (
                        <div className="edit-user">
                            <div>

                                <input
                                    className="username-input"
                                    value={this.props.username}
                                    onChange={event => this.props.editUserName(event.target.value)}
                                    type="text"
                                    />
                                <button 
                                    className="username-button"
                                    onClick={this.editUserNameHandler}>
                                    Save</button>
                            </div>
                            <div>
                                <button 
                                    className="delete-button"
                                    onClick={() => this.setState({showDeletePrompt: !this.state.showDeletePrompt})}>
                                    Delete Account</button>
                            </div>
                        </div>
                    ) : (
                        <div className="user-name" onClick={() => this.setState({editUserName: true})}>
                        {`Welcome ${this.props.username}`}</div>
                    )}              
                </div>
                )
        
        return (
            <div>
                <div className={`delete-prompt${this.state.showDeletePrompt ? ' show-prompt' : ''}`}>
                    <div className={`delete-prompt-window${this.state.showDeletePrompt ? ' show-prompt' : ''}`} >
                        <div>
                            <div onClick={() => this.setState({showDeletePrompt: !this.state.showDeletePrompt})}>Close</div>
                            <div>
                                This Can't be undone, Are you sure?
                            </div>
                            <div>
                                <button>Delete Account</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="nav-container">
                    {this.props.isUserLoggedIn ? loggedInMenuItems : null}
                    {this.props.isUserLoggedIn ? (
                        <DisplayButton
                                submitScanFromDisplayHandler={this.props.submitScanFromDisplayHandler}
                                buttonTitle="Your Domains"
                                listArray={this.props.userDomains}
                                />
                    ) : (
                        null
                    )}
                    <DisplayButton
                        submitScanFromDisplayHandler={this.props.submitScanFromDisplayHandler}
                        buttonTitle="Popular Pages" 
                        listArray={this.props.popularPages}
                        />
                    <NewScan
                        submitNewScanHandler={this.props.submitNewScanHandler} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        username: state.username,
        userDomains:state.userDomains,
        popularPages: state.popularPages
    }
}

export default connect(mapStateToProps, navBarActions)(NavBar);
