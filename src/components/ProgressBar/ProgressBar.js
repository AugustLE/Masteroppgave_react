import React from 'react';
import './progressbar.css';

export const ProgressBar = (props) => {

    let bar_width = (props.score*20)/2.5
    if (props.big) {
        bar_width = (props.score*20)*1.4;
    }
    let classNameContainer = 'progressBarContainer';
    let classNameBar = 'progressBar';

    if (props.big) {
        classNameContainer = 'progressBarContainerBig';
        classNameBar = 'progressBarBig';
    }

    return (
        <div className={classNameContainer} style={props.style}>
            <div className={classNameBar} style={{ width: bar_width }} />
        </div>
    );
}