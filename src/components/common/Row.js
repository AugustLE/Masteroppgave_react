import React from 'react';
import './common.css';

const Row = (props) => {
    return (
        <div onClick={props.onClick} className='rowContainer' style={props.style}>
            {props.children}
        </div>
    );
}

export { Row };