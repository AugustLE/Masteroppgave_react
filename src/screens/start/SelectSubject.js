import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import { Box, VerticalContainer, Text, Form, Line, Button } from '../../components/common';
import { selectSubject, getApiUser, deleteApiUser } from '../../actions/AccountActions';
import { updateToken, logout } from '../../actions/AuthActions';
import { fetchTeamList, selectSubjectWithTeams } from '../../actions/StudentActions';
import { setAccessToken } from '../../actions/MainActions';
import Loader from 'react-loader';
import { getAccessToken } from '../../GlobalMethods';
import { clientJSO, LIST_LOGIN } from '../../GlobalVars';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import { setAccessTokenPersistent } from '../../GlobalMethods';
import { ProfileSectionTop } from '../../components/ProfileSection';
import { BasicModal } from '../../components/BasicModal/BasicModal';
import { AppInfo } from '../../components/AppInfo/AppInfo';
import { DropdownMenu } from '../../components/DropdownMenu/DropdownMenu';
import './start.css';


const SelectSubject = (props) => {

    const [deleteModal, setDeleteModal] = useState(false);

    useEffect(() => {

        clientJSO.getToken().then((response) => { 
            if (response.access_token) {
                props.updateToken(response.access_token, true);
                props.setAccessToken(response.access_token);
                setAccessTokenPersistent(response.access_token);
            }
        });
       
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/');
            } else { 
                
                // props.getUserFeide(token, true);
                // props.getApiUser(token, true);
                // props.updateToken()
                props.setAccessToken(token);
            }
        });
    }, [])

    const selectSubject = (access_token, subject_pk) => {
        if (LIST_LOGIN) {
            props.selectSubject(access_token, subject_pk);
        } else {
            props.selectSubjectWithTeams(access_token, subject_pk);
        }
    }

    const SubjectList = () => {
        
        if (props.subject_list) {
            const subject_list = props.subject_list.map((subject) => (
                <Form key={subject.code} onSubmit={() => selectSubject(props.access_token, subject.pk)}>
                    <button
                        type='submit'
                        className='subjectListElement' 
                        key={subject.code}>
                        {subject.code} - {subject.name}
                    </button>
                </Form>
            ));
            return (
                <div className='subjectList'>{subject_list}</div>
            );
        }
        return <div />;
    }
    
    const BottomSection = () => {
        // render list of subjects or list of teams if subject is selected
        if (props.account_loading || props.loading_fetch) {
            return <Loader />;
        }
        
        let redirect_url_staff = '/staff/overview/';
        let redirect_url_stud = '/student/status/';
        
        if (!LIST_LOGIN) {
            redirect_url_staff = '/selectteam';
            redirect_url_stud = '/selectteam';
        }

        if (props.api_user && props.api_user.role ==='SD' && props.api_user.selected_subject_id) {
            return (<Redirect to={redirect_url_stud}/>);
        }
        if (props.api_user && (props.api_user.role ==='IN' || props.api_user.role ==='TA') && props.api_user.selected_subject_id) {
            return (<Redirect to={redirect_url_staff}/>);
        }
        

        if (props.api_user) {
            return (
                <VerticalContainer style={{ width: '100%', maxWidth: '500px' }}>
                    <Text bold size='22px' style={{ marginTop: '15px', marginBottom: '5px' }}>Select subject</Text>
                    <SubjectList />
                </VerticalContainer>
            );

        }
        return <div />
    }
    return (
        <VerticalContainer style={{ alignItems: 'center' }}>
            <VerticalContainer style={{ maxWidth: '500px', width: '100%' }}>
                <TopbarLogin />
                {props.api_user && props.api_user.error && (
                    <Text style={{ marginTop: '20px' }} error>{props.api_user.error}</Text>
                )}
                
                <BottomSection />
                <PrivacyModal />
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
                <Line style={{ width: '100%', marginTop: '15px' }} />
                <DropdownMenu>
                    {props.api_user && (
                        <Box style={{ width: '100%' }}>
                            <Box style={{ width: '100%', alignItems: 'flex-start' }}>
                                <ProfileSectionTop api_user={props.api_user} logOut={props.logout}/>
                            </Box>
                            <Line style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }} />
                            <AppInfo />
                            <Box style={{ width: '100%', alignItems: 'flex-start' }}>
                                <Button 
                                    style={{ marginTop: '20px', marginLeft: '15px' }} 
                                    warning
                                    onClick={() => setDeleteModal(true)}
                                >Delete user
                                </Button>
                            </Box>
                        </Box>
                    )}
                </DropdownMenu>
            </VerticalContainer>
        </VerticalContainer>
    )
} 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { feide_user, api_user, subject_list, account_loading } = state.account;
    const { loading_fetch, team, error_message, loading_action } = state.student;

    const return_state = {
        access_token,  
        feide_user, 
        api_user, 
        subject_list, 
        account_loading,  
        loading_fetch,
        team,
        error_message,
        loading_action,
    }

    return return_state;
}

export default connect(mapStateToProps, {  
    selectSubject, 
    fetchTeamList,
    setAccessToken,
    getApiUser,
    updateToken,
    selectSubjectWithTeams,
    logout,
    deleteApiUser
})(SelectSubject)


/* 
{props.api_user && (
                    <Box style={{ width: '100%', alignItems: 'flex-start' }}>
                        <ProfileSectionTop api_user={props.api_user} logOut={props.logout}/>
                    </Box>
                )}  

*/ 