import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getApiUser } from '../../actions/AccountActions';
import { getAccessToken } from '../../GlobalMethods';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Line } from '../../components/common';
import { ProfileSectionTop, ProfileSectionBottom } from '../../components/ProfileSection';

const Profile = (props) => {

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
            }
        });

        if (props.active_tab !== 2) {
            props.setActiveTab(2);
        }
    }, []);

    const logOut = () => {
        props.logout();
        props.history.push('/');
    }

    return (
        <div>
            <NavBar />
            {(!props.account_loading && props.api_user) ? (
                <ProfileSectionTop api_user={props.api_user} logOut={() => logOut()}/>
            ): (
                <Loader />
            )}
            <Line style={{ marginTop: '10px', marginBottom: '10px' }}/>
            {(!props.loading_fetch && props.team && props.subject) ? (
                <ProfileSectionBottom 
                    subject={props.subject} 
                    team={props.team} 
                    student 
                    onChangeSubject={() => console.log('PRint subj')} 
                />
            ): (
                <Loader />
            )}
            <TabBarStudent history={props.history} />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject } = state.account;
    const { team, loading_fetch } = state.student;
    return { access_token, active_tab, api_user, account_loading, team, subject, loading_fetch };
}

export default connect(mapStateToProps, { setActiveTab, logout, getApiUser })(Profile);
