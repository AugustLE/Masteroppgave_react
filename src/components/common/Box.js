import React from 'react';
import { Image } from '../common';
import './common.css';

const Box = (props) => {
    let className = 'boxContainer';
    if (props.shadow) {
        className = 'boxContainerShadow';
    }
    return (
        <div className={className} style={props.style} onClick={props.onClick}>
            {props.children}
            {props.clickable && (
                <Image 
                    style={{ width: '15px', position: 'absolute', right: 10, top: 10, opacity: 0.5 }} 
                    src={require('../../images/arrow_down.png')} />
            )}
        </div>
    )
}

export { Box };