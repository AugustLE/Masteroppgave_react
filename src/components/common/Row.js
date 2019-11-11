import React from 'react';
import './common.css';

const Row = (props) => {
    return (
        <div className='rowContainer' style={props.style}>
            {props.children}
        </div>
    );
}

export { Row };