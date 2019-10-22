import React from 'react';

const Box = (props) => {
    return (
        <div className='boxContainer'>
            {props.children}
        </div>
    )
}

export { Box };