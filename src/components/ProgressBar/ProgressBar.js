import React from 'react';
import './progressbar.css';

export const ProgressBar = (props) => {

    const bar_width = (props.score*20)/2.5

    return (
        <div className='progressBarContainer'>
            <div className='progressBar' style={{ width: bar_width }}>

            </div>
        </div>
    );
}