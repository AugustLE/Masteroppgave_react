import React from 'react';
import './tabbar.css';

export const TabBar = (props) => {

    return (
        <div className='container'>
            <button className='tabButton'>
                <img className='tabIcon' src={require('./icons/status-bar.png')} />
                <p className='tabText'>Group status</p>
            </button>
            <button className='tabButton'>
                <img className='tabIcon' src={require('./icons/mail.png')} />
                <p className='tabText'>Messages</p>
            </button>
            <button className='tabButton'>
                <img className='tabIcon' src={require('./icons/avatar.png')} />
                <p className='tabText'>Profile</p>
            </button>
        </div>
    );  
};
