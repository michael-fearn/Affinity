import React, { Component } from 'react';
import Sunburst from './Sunburst';
import { connect } from 'react-redux';
import _ from 'lodash'

class ChartContainer extends Component {
    constructor(props){
        super()

        this.state = {
            dataTree: {}
        }
    }
    componentWillReceiveProps() {
        this.setState({
            dataTree: this.transformToTree(this.props.chartData, this.props.baseUrl)
         })
    }


    transformToTree = (arr, baseUrl) => {
       
       let mappedArr = {[this.props.baseUrl]: { name: this.props.baseUrl, parent: null, children: []}},
        mappedElem,
        arrElem
        
    // First map the nodes of the array to an object -> create a hash table.
    for(let i = 0, len = arr.length; i < len; i++) {
      arrElem = arr[i];
      mappedArr[arrElem.name] = arrElem;
      mappedArr[arrElem.name]['children'] = [];
    }
  
  
    for (let name in mappedArr) {
      if (mappedArr.hasOwnProperty(name)) {
        mappedElem = mappedArr[name];
        // If the element is not at the root level, add it to its parent array of children.
        if (mappedElem.parent) {
          mappedArr[mappedElem['parent']]['children'].push(mappedElem);
        }
        
      }
    }
    return mappedArr[baseUrl];  
      }

    render() {

        console.log(this.props.chartData)
        return (
            <div>
                <Sunburst 
                    data={this.state.dataTree}
                    // onSelect={this.onSelect}
                    height={window.innerHeight-5}
                    width={window.innerWidth-5}
                    scale="linear"
                    tooltipContent={<div class="sunburstTooltip" style="max-height: 750px;position:absolute; color:'black'; z-index:10; background: #e2e2e2; padding: 5px; text-align: center;" />}
                    tooltip={true}
                    keyId="anagraph"
                    tooltipPosition="left"
                />
            </div>
        );
    }
}
function mapStateToProps(state){
    return {
        chartData: state.scraperData,
        baseUrl: state.baseUrl
    }
}
export default connect(mapStateToProps)(ChartContainer);
