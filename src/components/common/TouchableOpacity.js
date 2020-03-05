import React from 'react';
import './common.css';

const TouchableOpacity = (props) => {

    return (
        <button className='touchableOpacity' onClick={props.onClick} style={props.style}>
            {props.children}
        </button>
    )
}

export { TouchableOpacity };