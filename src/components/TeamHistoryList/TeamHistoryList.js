import React, { useState } from 'react';
import { TeamHistoryRow } from './TeamHistoryRow';
import { VerticalContainer, Text } from '../../components/common';
import './teamhistorylist.css';


export const TeamHistoryList = (props) => {

    const [selectedObj, setSelectedObj] = useState(null);

    const onClickRow = (val, obj) => {
        if (val) {
            setSelectedObj(obj);
        } else {
            setSelectedObj(null);
        }
    }

    const List = () => {

        return props.team_history.map(history_obj => (
            <TeamHistoryRow 
                key={history_obj.week} 
                onClickRow={(val, obj) => onClickRow(val, obj)} 
                history_obj={history_obj} 
            />
        ));
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <Text bold size='16px' style={{ width: '100%', marginBottom: '8px' }}>History</Text>
            <div className='teamHistoryListHeader'>
                <Text bold style={{ paddingLeft: '8px', width: '90px' }}>Week nr</Text>
                <Text bold style={{ paddingLeft: '3px', width: '90px' }}>Week date</Text>
                <Text bold style={{ marginLeft: '50px' }}>Average score</Text>
            </div>
            {selectedObj ? (
                <TeamHistoryRow 
                    isOpen={true}
                    key={selectedObj.week} 
                    onClickRow={(val, obj) => onClickRow(val, obj)} 
                    history_obj={selectedObj} 
                />
            ): (
                <List />
            )}
        </VerticalContainer>
    )
}