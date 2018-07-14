import React, { Component } from 'react';
import { connect } from 'react-redux';

class D3Container extends Component {

    render() {
        console.log(this.props.scraperData)
        let list = this.props.scraperData.map( (linkObj, i) => {
            return (
                <div key={i}>
                    <p>From page:{linkObj.fromPage}</p>
                    <p>To page:{linkObj.toPage}</p>
                    <p>Occurences on page:{linkObj.count}</p>
                    <p>Number of current node: {linkObj.currentNodeIndex}</p>
                    <br/>
                </div>
            )
        })
        return (
            <div>
                {this.props.baseUrl}
                { list }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        scraperData: state.scraperData,
        baseUrl: state.baseUrl
    }
}
export default connect(mapStateToProps)(D3Container);
