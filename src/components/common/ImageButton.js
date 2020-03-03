import React from 'react';

const ImageButton = (props) => {

    let flex_direction = 'column';
    let margin_top_text = '4px';
    let extra_styles = {}
    let extra_image_styles = { ...props.imageStyle }
    if (props.horizontal) {
        flex_direction = 'row';
        margin_top_text = '0px';
        extra_image_styles = {
            ...props.imageStyle, 
            width: '15px', 
            height: '15px', 
            marginRight: '5px' 
        };
    }

    extra_styles = { flexDirection: flex_direction };

    if (props.styles) {
        extra_styles = { ...props.styles, flexDirection: flex_direction };
    }

    return (
        <button onClick={props.onClick} className='imageButton' style={extra_styles}>
            <img style={extra_image_styles} className='imageButtonImage' src={props.image} alt=''/>
            <p className='imageButtonText' style={{ marginTop: margin_top_text }}>{props.children}</p>
        </button>
    )
}

export { ImageButton };