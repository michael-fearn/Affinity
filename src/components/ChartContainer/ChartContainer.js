import React, { Component } from 'react';
import { connect } from 'react-redux';
import SunburstContainer from './SunburstContainer';
import { chartContainerActions } from './../../redux/reducer';

class ChartContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            dataTree: [],
            updateAvailable: ''
        }
        this.renderCount = 0
        this.dataTree = []
        this.Sunburst = React.createRef()
    }

    componentDidMount () {
        this.props.socket.on('end of db search', () => {
            if(this.Sunburst.current) {
                this.updateChild()
            }
        })
        if(this.props.parent === "login") {
            this.props.socket.on('end of search', () => {
                if(this.Sunburst.current) {
                    this.updateChild()
                }
            })
        }
    }
    componentWillReceiveProps(newProps) {
        this.dataTree = this.transformToTree(newProps.scraperData)

        if(!this.props.scraperData[0]) {
            this.renderCount = 0
            this.setState({
                updateAvailable: ''
            })
        }
        this.renderCount++
        if(this.renderCount > 10) {
            this.showUpdateAvailable()
        }
    }

    showUpdateAvailable = () => {
        this.setState({
            updateAvailable: "Update available"
        })
    }

    updateChild() {
        this.Sunburst.current.forceUpdate()
        this.setState({
            updateAvailable: ''
        })
    }

    transformToTree = (arr) => {
        if(!arr[0]) {
            return []
        }
        let mappedArr = {}
        let mappedElem = {}
        let arrElem = {}
        let tree = []
        
        for(let i = 0; i < arr.length; i++) {
            arrElem = arr[i]
            mappedArr[arrElem.name] = arrElem
            mappedArr[arrElem.name]['children'] = []
        }
        for (let name in mappedArr) {
            if (mappedArr.hasOwnProperty(name)) {
                mappedElem = mappedArr[name]
                if (mappedElem.parent) {
                    if(mappedArr[mappedElem['parent']]) {
                        mappedArr[mappedElem['parent']]['children'].push(mappedElem)
                    }
                }
                else {
                    tree.push(mappedElem)
                }
            }
        }
        return tree
    }

    render() {
        return (
            <div>
            <div className={`rerender-button${this.props.parent === 'login' ? ' hidden': ''}`} onClick={() => this.updateChild()}>re-render</div>
            <h4 className={`update-status${this.props.parent === 'login' ? ' hidden': ''}`}>{this.state.updateAvailable}</h4>
                <SunburstContainer
                    newScanUrlHandler={this.props.newScanUrlHandler}
                    searchComplete={this.searchComplete}
                    parent={this.props.parent}
                    showUpdateAvailable={this.showUpdateAvailable}
                    renderCount={this.renderCount}
                    ref={this.Sunburst}
                    dataTree={this.dataTree[0]}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        scraperData: state.scraperData,
        renderCount: state.renderCount
    }
}
export default connect(mapStateToProps, chartContainerActions)(ChartContainer);
