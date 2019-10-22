import React from 'react';
import './navbar.css';

export const NavBar = (props) => {
    return (
        <div className='navContainer'>
            {props.backButton && (
                <button onClick={props.onClickBack} className='backButton'>{'< Back'}</button>
            )}
        </div>
    )
}