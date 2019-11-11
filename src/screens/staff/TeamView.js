import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { VerticalContainer, Text } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getTeamList } from '../../actions/StaffActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { getAccessToken } from '../../GlobalMethods';
import { TeamList } from '../../components/TeamList/TeamList';

 
const TeamView = (props) => {

    useEffect(() => {

        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getTeamList(token);
            }
        });
        if (props.active_tab !== 1) {
            props.setActiveTab(1);
        }
    }, [])


    return (
        <VerticalContainer>
            <NavBar />
            {props.subject && (
                <Text bold size='22px' style={{ margin: '15px' }}>{props.subject.code} - Overview</Text>
            )}
            {(!props.loading_fetch && props.staff_team_list) ?  (
                <TeamList teams={props.staff_team_list} />
            ): (
                <Loader />
            )}
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { staff_team_list, loading_fetch, subject } = state.staff;
    return { access_token, staff_team_list, loading_fetch, subject };
}

export default connect(mapStateToProps, { getTeamList, setAccessToken, setActiveTab })(TeamView);