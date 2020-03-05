import React from 'react';
import './common.css';

const Button = (props) => {

    let button_class = 'primaryButton';
    if (props.secondary) {
        button_class = 'secondaryButton';
    }
    let buttonStyle = {
        ...props.style,
    }
    if (props.warning) {

        buttonStyle = {
            ...props.style,
            backgroundColor: '#ff8d8d'
        }
    }
    const renderImage = () => {
        if (props.image) {
            return (
                <img alt={''} className='buttonImage' src={props.image}/>
            );
        }
    }

    return (
        <button onClick={props.onClick} className={button_class} style={buttonStyle}>
            {renderImage()}
            {props.children}
        </button>
    );
}

export { Button };