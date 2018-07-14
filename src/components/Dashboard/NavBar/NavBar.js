import React from 'react';
import NewScan from './NewScan/NewScan';
import DisplayButton from './DisplayButton/DisplayButton'

export default function NavBar (props) {
    return (
        <div>
            <h3>NavBar</h3>
            <DisplayButton />
            <DisplayButton />
            <NewScan
                submitNewScanHandler={props.submitNewScanHandler} />
        </div>
    )
}