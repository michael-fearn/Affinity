import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardActions } from './../../redux/reducer';
import NavBar from './NavBar/NavBar';
import D3Container from './../D3Container/D3Container'

class Dashboard extends Component{
    constructor(props){
        super (props)

        this.state = {
            data: null
        }
    
    }


    submitNewScanHandler = () => {
        let { newScanUrl, newScanDepth } = this.props
        console.log(newScanDepth)
        this.props.socket.emit('new scan', {
            newScanUrl,
            newScanDepth
        })
        this.props.resetSubmitNewScanHandler()
    
    }
    componentDidMount () {
        this.props.socket.on( 'node zero', (baseUrl) => {
            console.log("scraper has fired and client knows about it")
            this.props.resetSubmitNewScanHandler()
            this.props.setBaseUrl(baseUrl)
        })
        this.props.socket.on('scrape data', (scraperData) => {
            this.props.updateScraperData(scraperData)
        })
    }  

    render() {
        return(
            <div>
            <h3>Dashboard</h3>
            <NavBar
                submitNewScanHandler={this.submitNewScanHandler} />
            <D3Container />

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        newScanUrl: state.newScanUrl,
        newScanDepth: state.newScanDepth
    }
}
export default connect(mapStateToProps, dashboardActions)(Dashboard)