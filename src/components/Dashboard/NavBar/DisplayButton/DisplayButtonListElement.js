import React from 'react';
export default function DisplayButtonListElement(props) {
    return (
        <div className="displaybutton-element" key={props.id} >
        {props.url}
        </div>
    )
}