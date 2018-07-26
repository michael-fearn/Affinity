import React, { Component } from 'react';
import Sunburst from './Sunburst';
class SunburstContainer extends Component {
    shouldComponentUpdate = () => {
        if(this.props.renderCount > 10 && this.props.parent !== "login" ) {
            return false
        }
        else {
            if(this.props.parent === "login") {
                return false
            }
            else {
                return true
            }
        } 
    }
    render() {
        return (
            <div>
                <Sunburst
                    data={this.props.dataTree}
                    onSelect={(d) => this.props.newScanUrlHandler(d.data.name)}
                    height={window.innerHeight-5}
                    width={window.innerWidth-5}
                    scale="linear"
                    tooltipContent={<div class="sunburstTooltip" style="max-height: 750px;position:absolute; color:'black'; z-index:1; background: #e2e2e2; padding: 5px; text-align: center;" />}
                    tooltip={true}
                    keyId="anagraph"
                    tooltipPosition="left"
                />
            </div>
        );
    }
}

export default SunburstContainer;
