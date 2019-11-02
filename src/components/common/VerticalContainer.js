import React from 'react';
import './common.css';

export const VerticalContainer = (props) => {
    return (
        <div className="verticalContainer">
            {props.children}
        </div>
    )
}
