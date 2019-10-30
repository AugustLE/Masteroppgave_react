import React from 'react';
import './rolebutton.css';

export const RoleButton = (props) => {
    let image = require('./mortarboard.png');
    let extraStyle = {};
    if(props.role === 'instructor') {
        image = require('./professor.png');
        extraStyle = { width: '42px', height: '42px' };
    }
    return (
        <button onClick={props.onClick} className="roleButton">
            <div className="roleButtonImageContainer">
                <img style={extraStyle} src={image} className="roleButtonImage" />
            </div>
            <div className="roleButtonTextContainer">
                <p className="roleButtonText">{props.text}</p>
            </div>
        </button>
    );
}