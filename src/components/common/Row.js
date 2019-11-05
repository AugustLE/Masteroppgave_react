import React from 'react';
import './common.css';

const Row = (props) => {
    return (
        <div style={props.style} className='rowContainer'>
            {props.children}
        </div>
    );
}

export { Row };