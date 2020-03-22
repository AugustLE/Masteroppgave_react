import React from 'react';
import './common.css';

export const VerticalContainer = (props) => {
    return (
        <div aspect={props.aspect} onClick={props.onClick} style={props.style} className="verticalContainer">
            {props.children}
        </div>
    )
}
