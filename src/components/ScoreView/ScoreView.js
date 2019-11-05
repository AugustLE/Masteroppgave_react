import React from 'react';
import { VerticalContainer } from '../common/VerticalContainer';
import './scoreview.css';

export const ScoreView = (props) => {

    let images = [
        require('./images/sad.png'),
        require('./images/confused.png'),
        require('./images/smiling.png'),
        require('./images/happy.png'),
        require('./images/in-love.png'),
    ]
    let image = images[props.score];
    let extra_style = {};
    if (props.small) {
        extra_style = {
            width: '90px',
            height: '90px'
        }
    }

    const renderText = () => {
        if (props.text) {
            return (
                <div className='scoreTextContainer'>
                    <p className='scoreTextBig'>{props.score}</p>
                    <p className='scoreTextSmall'> out of 5</p>
                </div>
            );
        }
    }
    
    return (
        <VerticalContainer>
            <img className='scoreImage' style={extra_style} src={image} />
            {renderText()}
        </VerticalContainer>
    )
}