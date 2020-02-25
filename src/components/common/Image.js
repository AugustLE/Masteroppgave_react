import React from 'react';

const Image = (props) => {

    return (
        <img src={props.src} alt='' style={props.style}/>
    );
}

export { Image };