import React, { Component } from 'react';
import { connect } from 'react-redux';
import { dashboardActions } from './../../redux/reducer';
import NavBar from './NavBar/NavBar';
import axios from 'axios';
import Sunburst from '../ChartContainer/Sunburst';
import data from '../ChartContainer/data';
import './Dashboard.css';

class Dashboard extends Component{
    constructor(props){
        super (props)

        this.state = {
            showNavBar: false,
            getPopularPages: true
        }
    
    }


    submitNewScanHandler = () => {
        let { newScanUrl, newScanDepth } = this.props
        console.log(newScanDepth)
        this.props.socket.emit('new scan', {
            newScanUrl,
            newScanDepth
        })
        //this.props.resetSubmitNewScanHandler()
    
    }

    getPopularPagesHandler = async () => {
      //  app.get('/api/get/pages/:domainId', dbController.getPages) if no id return 10 most popular pages
        const response = await axios.get('/api/get/pages')
        this.props.getPopularPages(response.data)
        this.setState({getPopularPages: false})
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

    OpenNavMenuHandler = () => {
        if(this.state.getPopularPages) {
            this.getPopularPagesHandler()
        }
        this.setState({showNavBar: !this.state.showNavBar})
        console.log(1111111111)

    }

    render() {


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
            {/* <div  className="open-nav-menu">OpenNavMenu</div> */}
                <div onClick={this.OpenNavMenuHandler} className={`dashboard-overlay${this.state.showNavBar ? ' show-overlay' : ''}`}></div>
                <div className={`sidenav${this.state.showNavBar ? ' showsidenav' : ''}`}>
            
                { this.state.showNavBar ? (
                    <NavBar
                        getPopularPagesHandler={ this.getPopularPagesHandler }
                        submitNewScanHandler={this.submitNewScanHandler} >
                        <div onClick={this.OpenNavMenuHandler}>OpenNavMenu</div>
                    </NavBar>
                ) : (
                    null
                )}
            </div>
                <Sunburst 
                    data={data}
                    height={window.innerHeight-5}
                    width={window.innerWidth-5}
                    scale="exponential"
                />


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