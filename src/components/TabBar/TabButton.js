import React from 'react';
import './tabbar.css';

export const TabButton = (props) => {
    const activeStyle = () => {
        return props.isActive ? 'tabButtonActive': 'tabButton';
    }
    return (
        <button onClick={props.onClick} className={activeStyle()}>
            <img className='tabIcon' src={props.icon} alt="description_tb" />
            <p className='tabText'>{props.children}</p>
        </button>
    );
}