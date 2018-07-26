import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardActions } from './../../redux/reducer';
import NavBar from './NavBar/NavBar';
import axios from 'axios';
import './Dashboard.css';
import ChartContainer from '../ChartContainer/ChartContainer';

class Dashboard extends Component{
    constructor(props){
        super (props)

        this.state = {
            showNavBar: false,
            chartRenderCount: 0
        }
        this.navCounter = 0
    }

    submitNewScanHandler = (puppeteerOnly = false) => {
        this.props.clearScraperData()
        let { newScanUrl, newScanDepth } = this.props
        this.props.socket.emit('cancel scan')
        this.props.socket.emit('new scan', {
            newScanUrl,
            newScanDepth,
            puppeteerOnly
        })
        const payload = {
            newScanUrl,
            newScanDepth
        }
        axios.post('/api/post/domain', payload)
        this.OpenNavMenuHandler()
    }
    
    submitScanFromDisplayHandler = (url, depth = 2) => {
        this.props.clearScraperData();
        this.props.socket.emit('get scan data', {
            url,
            depth
        })
    }

    getUserDomains = async () => {
        if(this.navCounter && this.props.isUserLoggedIn) {
            const response = await axios.get('/api/get/domains')
            this.props.updateUserDomains(response.data)
        }
    }

    getPopularPagesHandler = async () => {
        if(this.navCounter) {
            const response = await axios.get('/api/get/pages')
            this.props.updatePopularPages(response.data)
        }
    }

    componentDidMount = async () => {
        this.props.isUserLoggedInHandler()
        let response = await axios.get('/api/username')
        this.props.editUserName(response.data)
    }

    OpenNavMenuHandler = () => {
        this.navCounter++
        if(this.navCounter > 1) this.navCounter = 0
        this.getUserDomains()
        this.getPopularPagesHandler()
        this.setState({showNavBar: !this.state.showNavBar})
    }

    incrementChartRenderCount = () => {
        this.setState({chartRenderCount: this.state.chartRenderCount + 1})
    }


    render() {
        if(this.state.showNavBar) {
            this.getPopularPagesHandler()
        }
        return(
            <div className="dashboard-container">
                <div 
                    onClick={this.OpenNavMenuHandler}
                    className={`toggle-menu hamburger hamburger--slider${this.state.showNavBar ? ' is-active' : ''}`}>
                    <div class="hamburger-box">
                        <div class="hamburger-inner">
                        </div>
                    </div>
                </div>
                <div onClick={this.OpenNavMenuHandler} className={`dashboard-overlay${this.state.showNavBar ? ' show-overlay' : ''}`}></div>
                <div className={`sidenav${this.state.showNavBar ? ' showsidenav' : ''}`}>
            
                { this.state.showNavBar ? (
                    <NavBar
                        isUserLoggedIn={this.props.isUserLoggedIn}
                        submitScanFromDisplayHandler={this.submitScanFromDisplayHandler}
                        getPopularPagesHandler={ this.getPopularPagesHandler }
                        submitNewScanHandler={this.submitNewScanHandler} >
                        <div onClick={this.OpenNavMenuHandler}>OpenNavMenu</div>
                    </NavBar>
                ) : (
                    null
                )}
                </div>
                    <ChartContainer
                        socket={this.props.socket}
                        incrementRenderCount={this.incrementChartRenderCount}
                        renderCount={this.state.renderCount} />
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