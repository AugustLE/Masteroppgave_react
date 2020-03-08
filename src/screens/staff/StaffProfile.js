import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Line, Button, VerticalContainer } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileSectionBottom, ProfileSectionTop } from '../../components/ProfileSection';
import { getApiUser, deleteApiUser, unselectSubject } from '../../actions/AccountActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getAccessToken } from '../../GlobalMethods';
import { clientJSO } from '../../GlobalVars';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { Redirect } from 'react-router';
import { AppInfo } from '../../components/AppInfo/AppInfo';
import { PermissionCheck } from '../../components/PermissionCheck/PermissionCheck';

 
const StaffProfile = (props) => {

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
                        onChangeSubject={() => setChangeCourseModal(true)} 
                    />
                </VerticalContainer>
            );
        }
        return <div />
    }


    if (props.api_user && props.subject) {
        return (
            <VerticalContainer>
                {props.api_user && (
                    <PermissionCheck data_check student api_user={props.api_user} history={props.history}/>
                )}
                <NavBar />
                <VerticalContainer style={{ maxWidth: '500px', marginBottom: '100px' }}>
                    {(props.api_user && (props.api_user.role !== 'TA' && props.api_user.role !== 'IN')) && (
                        <Redirect to='/student/profile/'/>
                    )}
                    
                    <Profile />
                    {(props.api_user && !props.account_loading) &&  (
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
                        loading={props.account_loading}
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

                    <TabBarStaff history={props.history}/>
                </VerticalContainer>
            </VerticalContainer>
        );
    }
    return (
    <div>
        {props.api_user && (
            <PermissionCheck data_check student api_user={props.api_user} history={props.history}/>
        )}
    </div>
    )
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
    deleteApiUser,
    unselectSubject 
})(StaffProfile);
