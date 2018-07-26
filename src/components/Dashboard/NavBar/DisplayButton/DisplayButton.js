import React, { Component } from 'react';

class DisplayButton extends Component{
    constructor(props){
        super(props)

        this.state = {
            showList: false,
            list: ['a','b','c']
        }
    }

    render() { 
        
        const list = this.props.listArray.map( element => {
            if(element.domain) {
                
                return (
                    <div className="drop-down-item flex" key={element.domain}>
                        <div onClick={ () => this.props.submitScanFromDisplayHandler(element.domain)}>{element.domain.substring(0, 30) + '...'}</div>
                    </div>
                )

            }
            else {
                return (
                    <div className="drop-down-item flex" key={element.name+element.parent}>
                        <div onClick={() => this.props.submitScanFromDisplayHandler(element.name)}>{element.name.substring(0, 30) + '...'}</div>
                    </div>
                )
            }
        })

        return (
            <div onClick={() => this.setState({showList: !this.state.showList})} className={`display-button${this.state.showList ? ' show-list' : '' }`}>
                { this.props.buttonTitle }
                <div className="display-button-container">
                    {list}
                </div>
            </div>
            // <div
            //     className={`display-button-container${this.state.showList ? ' show-list' : '' }`}>
            //     <div 
            //         onClick={() => this.setState({showList: !this.state.showList})}
            //         className={`display-button${this.state.showList ? ' shrink-button' : '' }`}>
            //         {this.props.buttonTitle}
            //         </div>
            //     <div>{this.state.list}</div>
            // </div>
        )
    }
}
export default DisplayButton;
//some sort of trigger that fires when
// the data is recieved from the server, so the drop down doesnt fire until the information is there
//click fires to redux, endpoint