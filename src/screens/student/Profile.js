import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab, setAccessToken } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getApiUser } from '../../actions/AccountActions';
import { unregisterFromTeam } from '../../actions/StudentActions';
import { getAccessToken } from '../../GlobalMethods';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Line } from '../../components/common';
import { ProfileSectionTop, ProfileSectionBottom } from '../../components/ProfileSection';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';

const Profile = (props) => {

    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
                props.setAccessToken(token);
                
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

    const unregisterFromTeam = () => {
        props.unregisterFromTeam(props.access_token);
        setModalOpen(false);
        props.history.push('/selectteam/');
    }
    

    return (
        <div>
            {(props.api_user && props.team === null) && (
                <Redirect to={'/selectteam/'}/>
            )}
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
                    onChangeTeam={() => setModalOpen(true)}
                />
            ): (
                <Loader />
            )}
             <BasicModal 
                modalOpen={modalOpen} 
                setModalOpen={() => setModalOpen(!modalOpen)} 
                buttonText={'Unregister'}
                text={'Do you want to un-register from this team?'}
                onActionClick={() => unregisterFromTeam()}
                team={props.team}
            />
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

export default connect(mapStateToProps, { 
    setActiveTab, 
    logout, 
    getApiUser, 
    unregisterFromTeam,
    setAccessToken 
})(Profile);
