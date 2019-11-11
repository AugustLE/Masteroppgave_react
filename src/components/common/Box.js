import React from 'react';
import './common.css';

const Box = (props) => {
    let className = 'boxContainer';
    if (props.shadow) {
        className = 'boxContainerShadow';
    }
    return (
        <div className={className} style={props.style}>
            {props.children}
        </div>
    )
}

export { Box };