import React from 'react';

const ImageButton = (props) => {

    let flex_direction = 'column';
    let image_margin_right = '0px';
    let margin_top_text = '4px';
    if (props.horizontal) {
        flex_direction = 'row';
        image_margin_right = '5px';
        margin_top_text = '0px';
    }

    return (
        <button onClick={props.onClick} className='imageButton' style={{ flexDirection: flex_direction }}>
            <img style={{ marginRight: image_margin_right, width: '15px', height: '15px' }} className='imageButtonImage' src={props.image} />
            <p style={{ marginTop: margin_top_text }} className='imageButtonText'>{props.children}</p>
        </button>
    )
}

export { ImageButton };