import React from 'react';
import { Text, Row } from '../common';
import './teamlist.css';


export const ListHeader = (props) => {

 return ( 
        <div className='listRowHeader'>
            
            <Row>
                {(props.nameSortVal === null) && (
                    <Text onClick={props.onClickName} bold style={{ width: '80px', cursor: 'pointer' }}>Team</Text>
                )}
                {(props.nameSortVal === 1) && (
                    <Row style={{ marginRight: '20px', cursor: 'pointer' }} onClick={props.onClickName}>
                        <Text bold style={{ marginRight: '10px' }}>Team</Text>
                        <img className="arrow_down" src={require('../../assets/arrow_down.png')} alt="descrtpt" />
                    </Row>
                )}
                {(props.nameSortVal === 2) && (
                    <Row onClick={props.onClickName} style={{ marginRight: '20px', cursor: 'pointer'  }}> 
                        <Text bold style={{ marginRight: '10px' }}>Team</Text>
                        <img className="arrow_down" src={require('../../assets/arrow_up.png')} alt="descrtpt" />
                    </Row>
                )}
            </Row>
            
            <Row 
                onClick={props.onClickStatus} 
                style={{ width: '100px', height: '30px', justifyContent: 'flex-start', cursor: 'pointer' }}>

                <Text bold style={{ marginRight: '10px' }}>Score</Text>
                {(props.statusSortVal === 1) && (
                    <img className="arrow_down" src={require('../../assets/arrow_down.png')} alt="description" />
                )}
                {(props.statusSortVal === 2) && (
                    <img className="arrow_down" src={require('../../assets/arrow_up.png')} alt="description" />
                )}
            </Row>
            <Row onClick={props.onClickResp} style={{ cursor: 'pointer' }}>
                <Text bold style={{ marginLeft: '35px', marginRight: '10px' }}>Responsible</Text>
                {(props.respSortVal === 1) && (
                    <img className="arrow_down" src={require('../../assets/arrow_down.png')} alt="descrtpt" />
                )}
                {(props.respSortVal === 2) && (
                    <img className="arrow_down" src={require('../../assets/arrow_up.png')} alt="description1" />
                )}
            </Row>
        </div>
    );
}