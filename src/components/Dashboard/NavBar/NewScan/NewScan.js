import React from 'react';
import { connect } from 'react-redux';
import { newScanActions } from './../../../../redux/reducer';

function NewScan (props) {

    return (
        <div>
            <h3>NewScan</h3>

            <input 
                placeholder="Url"
                value={props.url}
                onChange={(event) => props.newScanUrlHandler(event.target.value, "url")}
                type="text"/>
            <br/>
            <input 
                placeholder="Depth"
                value={props.depth}
                onChange={(event) => props.newScanDepthHandler(event.target.value, "number")}
                type="number"/>
            <br/>
            <button onClick={ () => props.submitNewScanHandler()} >Scan</button>
        </div>
    );

}
function mapStateToProps (state) {
    return {
        url: state.newScanUrl,
        depth: state.newScanDepth
    }
}
export default connect( mapStateToProps, newScanActions )(NewScan);
