import React, { Component } from 'react';
import { connect } from 'react-redux';
import SunburstContainer from './SunburstContainer';
import { chartContainerActions } from '../../redux/reducer';

class ChartContainer extends Component {
    constructor(props){
        super(props)

        this.state = {
            dataTree: [],
            updateAvailable: ''
        }
        this.renderCount = 0
        this.dataTree = []
    }
    getDerivedStateFromProps() {

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
            this.showUpdateAvailable();
        }
    }

    showUpdateAvailable = () => {
        this.setState({
            updateAvailable: "Update available"
        })
    }

    updateChild() {
        this.Sunburst.forceUpdate();
        this.setState({
            updateAvailable: ''
        })
    }

    transformToTree = (arr) => {
       if(!arr[0]) {
           return []
       }
        //let mappedArr = {[this.props.baseUrl]: { name: this.props.baseUrl, parent: null, children: []}}
        let mappedArr = {}
        let mappedElem = {}
        let arrElem = {}
        let tree = []
        
        // First map the nodes of the array to an object -> create a hash table.
        for(let i = 0, len = arr.length; i < len; i++) {
            arrElem = arr[i];
            mappedArr[arrElem.name] = arrElem;
            mappedArr[arrElem.name]['children'] = [];
        }
        for (let name in mappedArr) {
            if (mappedArr.hasOwnProperty(name)) {
                mappedElem = mappedArr[name];
                if (mappedElem.parent) {
                    mappedArr[mappedElem['parent']]['children'].push(mappedElem);
                }
                else {
                    tree.push(mappedElem);
                }
            }
        }
        console.log(1111,tree)
        return tree;  
    }

    render() {
      //  console.log(this.state.dataTree)
        return (
            <div>
            <div className={`rerender-button${this.props.parent === 'login' ? ' hidden': ''}`} onClick={() => this.updateChild()}>re-render</div>
            <h4 className={`update-status${this.props.parent === 'login' ? ' hidden': ''}`}>{this.state.updateAvailable}</h4>
                <SunburstContainer
                    parent={this.props.parent}
                    showUpdateAvailable={this.showUpdateAvailable}
                    renderCount={this.renderCount}
                    ref={instance => { this.Sunburst = instance;}}
                    dataTree={this.dataTree[0]}/>
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        scraperData: state.scraperData,
        baseUrl: state.baseUrl,
        renderCount: state.renderCount

    }
}
export default connect(mapStateToProps)(ChartContainer);
