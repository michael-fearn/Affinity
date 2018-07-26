import React from 'react';
import { connect } from 'react-redux';
import { newScanActions } from './../../../../redux/reducer';

function NewScan (props) {

    return (
        <div className="nav-new-scan-section">
            <h3 className="nav-new-scan">New Scan</h3>
            <div className="new-scan-input-container">
                <div>
                    Url: 
                    <input 
                        className="nav-input"
                        placeholder="Url"
                        value={props.url}
                        onChange={(event) => props.newScanUrlHandler(event.target.value, "url")}
                        type="text"/>
                    <br/>
                </div>
                <div>
                    Depth:
                    <input
                        className="nav-input nav-input-depth"
                        placeholder="Depth"
                        value={props.depth}
                        onChange={(event) => props.newScanDepthHandler(event.target.value, "number")}
                        type="number"/>
                    <br/>
                </div>
            </div>
            <div>
                <button className="new-scan-button" onClick={ () => props.submitNewScanHandler()} >Scan</button>
                {/* <button className="new-scan-button" onClick={ () => props.submitNewScanHandler(true)} >Alt Scan Only</button> */}
            </div>
        </div>
    );

}
function mapStateToProps (state) {
    return {
        url: state.newScanUrl,
        depth: state.newScanDepth
    }
}
export default connect( mapStateToProps, newScanActions )(NewScan)
