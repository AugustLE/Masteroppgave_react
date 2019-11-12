import React from 'react';
import './common.css';

const Button = (props) => {

    let button_class = 'primaryButton';
    if (props.secondary) {
        button_class = 'secondaryButton';
    }
    const renderImage = () => {
        if (props.image) {
            return (
                <img alt={''} className='buttonImage' src={props.image}/>
            );
        }
    }

    return (
        <button onClick={props.onClick} className={button_class} style={props.style}>
            {renderImage()}
            {props.children}
        </button>
    );
}

export { Button };