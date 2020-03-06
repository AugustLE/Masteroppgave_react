import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab, setAccessToken } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getApiUser, deleteApiUser, unselectSubject } from '../../actions/AccountActions';
import { unregisterFromTeam } from '../../actions/StudentActions';
import { getAccessToken } from '../../GlobalMethods';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Line, Button, VerticalContainer } from '../../components/common';
import { ProfileSectionTop, ProfileSectionBottom } from '../../components/ProfileSection';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';
import { AppInfo } from '../../components/AppInfo/AppInfo';
import { PermissionCheck } from '../../components/PermissionCheck/PermissionCheck';


const Profile = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [changeCourseModal, setChangeCourseModal] = useState(false);

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
        props.logout(props.access_token);
        props.history.push('/');
    }

    const unregisterFromTeam = () => {
        props.unregisterFromTeam(props.access_token);
        setModalOpen(false);
        props.history.push('/selectteam/');
    }
    
    if (props.api_user && props.api_user.selected_subject_id === null) {
        props.history.push('/selectsubject/');
    }

    return (
        <VerticalContainer style={{ alignItems: 'center', marginBottom: '100px' }}>
            {props.api_user && (
                <PermissionCheck data_check api_user={props.api_user} history={props.history}/>
            )}
            <VerticalContainer style={{ maxWidth: '500px', width: '100%' }}>
                {(props.api_user && (props.api_user.role === 'TA' || props.api_user.role === 'IN')) && (
                    <Redirect to='/staff/profile/'/>
                )}
                {(props.api_user && props.team === null) && (
                    <Redirect to={'/selectteam/'}/>
                )}
                <NavBar />
                {(!props.account_loading && props.api_user) ? (
                    <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                        <ProfileSectionTop api_user={props.api_user} logOut={() => logOut()}/>
                    </VerticalContainer>
                ): (
                    <Loader />
                )}
                <Line style={{ marginTop: '10px', marginBottom: '10px' }}/>
                {(!props.loading_fetch && props.team && props.subject) ? (
                    <ProfileSectionBottom 
                        subject={props.subject} 
                        team={props.team} 
                        student 
                        onChangeSubject={() => setChangeCourseModal(true)} 
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
                        <AppInfo />
                        
                    </VerticalContainer>
                )}
                <BasicModal
                    modalOpen={deleteModal} 
                    setModalOpen={() => setDeleteModal(!deleteModal)} 
                    buttonText={'Delete user'}
                    title={'Delete user'}
                    text={'Do you want to delete your user? (This is irreversible)'}
                    onActionClick={() => {
                        props.deleteApiUser(props.access_token);
                        props.logout();
                        props.history.push('/logout');
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
                <BasicModal
                    modalOpen={changeCourseModal}
                    setModalOpen={() => setChangeCourseModal(!changeCourseModal)}
                    buttonText='Change course'
                    title={'Change course'}
                    text={'Sure you want to change to another course?'}
                    onActionClick={(() => {
                        props.unselectSubject(props.access_token);
                    })} 
                    loading={props.account_loading}
                />
                <TabBarStudent history={props.history} />
                {props.user_deleted && (
                    <Redirect to="/"></Redirect>
                )}
            </VerticalContainer>
        </VerticalContainer>
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
    deleteApiUser,
    unselectSubject 
})(Profile);
