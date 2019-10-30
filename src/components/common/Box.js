import React from 'react';
import './common.css';

export const Box = (props) => {
    return (
        <div className="boxContainer">
            {props.children}
        </div>
    )
}
