import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Line, Button, Text, Row, VerticalContainer } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileSectionBottom, ProfileSectionTop } from '../../components/ProfileSection';
import { getApiUser, deleteApiUser } from '../../actions/AccountActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getAccessToken } from '../../GlobalMethods';
import { clientJSO } from '../../GlobalVars';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { Redirect } from 'react-router';
import { AppInfo } from '../../components/AppInfo/AppInfo';
 
const StaffProfile = (props) => {

    const [deleteModal, setDeleteModal] = useState(false);
 
    useEffect(() => {
        clientJSO.getToken();
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
            }
        });

        if (props.active_tab !== 3) {
            props.setActiveTab(3);
        }
    }, []);

    const logOut = () => {
        props.logout();
        props.history.push('/');
    }

    const Profile = () => {
        if (props.account_loading) {
            return <Loader />;
        }
        if (props.api_user && props.subject) {
            return (
                <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                    <ProfileSectionTop 
                    api_user={props.api_user} 
                    logOut={() => logOut()}
                    instructor
                    />
                    <Line style={{ marginTop: '10px', marginBottom: '10px', width: '100%' }}/>
                    <ProfileSectionBottom 
                        subject={props.subject}  
                        onChangeSubject={() => console.log('PRint subj')} 
                    />
                </VerticalContainer>
            );
        }
        return <div />
    }


    if (props.api_user && props.subject) {
        return (
            <VerticalContainer>
                <NavBar />
                <VerticalContainer style={{ maxWidth: '500px' }}>
                    {(props.api_user && (props.api_user.role !== 'TA' && props.api_user.role !== 'IN')) && (
                        <Redirect to='/student/profile/'/>
                    )}
                    
                    <Profile />
                
                    <VerticalContainer style={{ width: '100%', alignItems: 'flex-start' }}>
                        <Button 
                            style={{ margin: '15px' }} 
                            warning
                            onClick={() => setDeleteModal(true)}>
                                Delete user
                        </Button>
                        <Line style={{ width: '100%', marginBottom: '10px' }} />
                        <AppInfo />
                    </VerticalContainer>
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
                    <TabBarStaff history={props.history}/>
                </VerticalContainer>
            </VerticalContainer>
        );
    }
    return <div />
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject } = state.account;
    return { access_token, active_tab, api_user, account_loading, subject };
}

export default connect(mapStateToProps, { 
    getApiUser, 
    setActiveTab, 
    setAccessToken, 
    logout,
    deleteApiUser 
})(StaffProfile);
