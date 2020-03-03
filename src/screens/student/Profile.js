import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab, setAccessToken } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getApiUser, deleteApiUser } from '../../actions/AccountActions';
import { unregisterFromTeam } from '../../actions/StudentActions';
import { getAccessToken } from '../../GlobalMethods';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Line, Button, VerticalContainer, Text, Row } from '../../components/common';
import { ProfileSectionTop, ProfileSectionBottom } from '../../components/ProfileSection';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';

const Profile = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

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
            {(props.api_user && (props.api_user.role === 'TA' || props.api_user.role === 'IN')) && (
                <Redirect to='/staff/profile/'/>
            )}
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
            {props.api_user && (
                <VerticalContainer style={{ width: '100%', alignItems: 'flex-start' }}>
                    <Button 
                        style={{ margin: '15px' }} 
                        warning
                        onClick={() => setDeleteModal(true)}
                    >Delete user
                    </Button>
                    <Line style={{ width: '100%', marginBottom: '10px' }} />
                    <Text size='16px' style={{ marginLeft: '15px', marginBottom: '10px' }}>
                        For more information about the application, bugs discovered or GDPR requests, please contact: 
                    </Text>
                    <Row>
                        <Text style={{ marginLeft: '15px' }}>Developer: </Text>
                        <Text bold style={{ marginLeft: '5px' }}>augustle.lund@gmail.com</Text>
                    </Row>
                    <Text bold style={{ marginLeft: '15px' }}>OR: </Text>
                    <Row>
                        <Text style={{ marginLeft: '15px' }}>Project supervisor: </Text>
                        <Text bold style={{ marginLeft: '5px' }}>stoica@ntnu.no</Text>
                    </Row>
                    
                </VerticalContainer>
            )}
            <BasicModal
                modalOpen={deleteModal} 
                setModalOpen={() => setDeleteModal(!deleteModal)} 
                buttonText={'Delete user'}
                text={'Do you want to delete your user? (This is irreversible)'}
                onActionClick={() => {
                    props.deleteApiUser(props.access_token);
                    props.logout();
                }}
                warning 
            />
             <BasicModal 
                modalOpen={modalOpen} 
                setModalOpen={() => setModalOpen(!modalOpen)} 
                buttonText={'Unregister'}
                text={'Do you want to un-register from this team?'}
                onActionClick={() => unregisterFromTeam()}
                team={props.team}
            />
            <TabBarStudent history={props.history} />
            {props.user_deleted && (
                <Redirect to="/"></Redirect>
            )}
        </div>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject, user_deleted } = state.account;
    const { team, loading_fetch } = state.student;
    return { access_token, active_tab, api_user, account_loading, team, subject, loading_fetch, user_deleted };
}

export default connect(mapStateToProps, { 
    setActiveTab, 
    logout, 
    getApiUser, 
    unregisterFromTeam,
    setAccessToken,
    deleteApiUser 
})(Profile);
