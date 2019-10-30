import React from 'react';
import './common.css';

export const Row = (props) => {
    return (
        <div className='rowContainer'>
            {props.children}
        </div>
    );
}