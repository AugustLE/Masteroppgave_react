import React, { useState } from 'react';
import { VerticalContainer } from '../common';
import { ListRow } from './ListRow';
import { ListHeader } from './ListHeader';
import { baseSort } from '../../GlobalMethods';
import './teamlist.css';


export const TeamList = (props) => {

    const [statusSortVal, setStatusSort] = useState(null);
    const [nameSortVal, setNameSort] = useState(null);
    const [respSortVal, setRespSort] = useState(null);


    function scoreSort(a, b) {
        return baseSort(a.last_average_score, b.last_average_score);
    }
    function scoreSortReverse(a, b) {
        return baseSort(b.last_average_score, a.last_average_score);
    }
    function nameSort(a, b) {
        return baseSort(b.team_number, a.team_number);
    }
    function nameSortReverse(a, b) {
        return baseSort(a.team_number, b.team_number);
    }
    function respSort(a, b) {
        return baseSort(b.responsible, a.responsible);
    }
    function respSortReverse(a, b) {
        return baseSort(a.responsible, b.responsible);
    }

    const onClickStatus = () => {
        setNameSort(null);
        setRespSort(null);
        if (statusSortVal >= 2) {
            setStatusSort(null);
        } else {
            setStatusSort(statusSortVal + 1);
        }
    }
    const onClickName = (b) => {
        setStatusSort(null);
        setRespSort(null);
        if (nameSortVal >= 2) {
            setNameSort(null);
        } else {
            setNameSort(nameSortVal + 1);
        }
    }

    const onClickResp = (b) => {
        setStatusSort(null);
        setNameSort(null);
        if (respSortVal >= 2) {
            setRespSort(null);
        } else {
            setRespSort(respSortVal + 1);
        }
    }

    const getSortedList = (sortVal, sortFunction, sortFunctionRev) => {
        let teams = [].concat(props.teams);
        if (sortVal === 1) {
            teams = teams.sort(sortFunction);
        } if (sortVal === 2) {
            teams = teams.sort(sortFunctionRev);
        }
        return teams;
    }

    const List = () => {
        let teams = [].concat(props.teams);
        if (statusSortVal > 0) 
            teams = getSortedList(statusSortVal, scoreSort, scoreSortReverse);
        if (nameSortVal > 0)
            teams = getSortedList(nameSortVal, nameSort, nameSortReverse);
        if (respSortVal > 0)
            teams = getSortedList(respSortVal, respSort, respSortReverse);
        const team_list = teams.map((team) => (
            <ListRow onClick={() => props.onClick(team.pk)} key={team.pk} team={team} />
        ));
        return (
            <div className='listContainer'>
                <ListHeader 
                    statusSortVal={statusSortVal}
                    respSortVal={respSortVal}
                    nameSortVal={nameSortVal} 
                    onClickStatus={() => onClickStatus(statusSortVal)}
                    onClickName={() => onClickName(nameSortVal)}
                    onClickResp={() => onClickResp(respSortVal)}
                />
                {team_list}
            </div>
        );
    }

    return (
        <VerticalContainer style={{ width: '100%' }}>
            <List />
        </VerticalContainer>
    );
}