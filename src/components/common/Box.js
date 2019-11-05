import React from 'react';
import './common.css';

const Box = (props) => {
    return (
        <div className="boxContainer">
            {props.children}
        </div>
    )
}

export { Box };