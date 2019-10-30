import React from 'react';
import './topbar.css';

export const TopbarLogin = () => {
    return (
        <div className="topContainer">
            <img src={require('./teamwork_256.png')} className="topBarImage"></img>
            <p className="logoText">TeamAccelerator</p>
        </div>
    );
}
