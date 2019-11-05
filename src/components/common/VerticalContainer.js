import React from 'react';
import './common.css';

export const VerticalContainer = (props) => {
    return (
        <div style={props.style} className="verticalContainer">
            {props.children}
        </div>
    )
}
