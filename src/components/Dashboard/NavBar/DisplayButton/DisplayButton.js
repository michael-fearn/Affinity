import React, { Component } from 'react';

class DisplayButton extends Component{
    constructor(props){
        super(props)

        this.state = {
            showList: false,
            list: ['a','b','c']
        }
    }

    listBuilder() {

    }

    render() {    
        return (
            <div
                className={`display-button-container${this.state.showList ? ' show-list' : '' }`}>
                <div 
                    onClick={() => this.setState({showList: !this.state.showList})}
                    className={`display-button${this.state.showList ? ' shrink-button' : '' }`}>
                    {this.props.buttonTitle}
                    </div>
                <div>{this.state.list}</div>
            </div>
        )
    }
}
export default DisplayButton;
//some sort of trigger that fires when
// the data is recieved from the server, so the drop down doesnt fire until the information is there
//click fires to redux, endpoint