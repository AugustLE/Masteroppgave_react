import React from 'react';
import './common.css';

const Text = (props) => {
    let extraStyles = {};
    if (props.bold) {
        extraStyles = { fontWeight: '600' };
    }
    if (props.size) {
        extraStyles = { ...extraStyles, fontSize: props.size};
    }
    if (props.center){
        extraStyles = { ...extraStyles, textAlign: 'center' };
    }
    if (props.error) {
        extraStyles = { ...extraStyles, color: 'red', fontSize: '16px' };
    }
    extraStyles = { ...extraStyles, ...props.style };
    return ( 
        <p onClick={props.onClick} className='basicText' style={extraStyles}>{props.children}</p>
    )
}

export { Text };