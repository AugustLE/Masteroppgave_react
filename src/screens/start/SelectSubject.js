import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import { Box, VerticalContainer } from '../../components/common';
import { getEnrolledSubjects, selectSubject, getApiUser } from '../../actions/AccountActions';
import { getUserFeide } from '../../actions/AuthActions';
import { fetchTeamList, selectTeam } from '../../actions/StudentActions';
import { setAccessToken } from '../../actions/MainActions';
import Loader from 'react-loader';
import { getAccessToken } from '../../GlobalMethods';
import { clientJSO } from '../../GlobalVars';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';
import { setAccessTokenPersistent } from '../../GlobalMethods';
import './start.css';


const SelectSubject = (props) => {

    useEffect(() => {

        clientJSO.getToken();
       
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/');
            } else { 
                
                props.getUserFeide(token);
                props.getApiUser(token, true);
                props.setAccessToken(token);
                
            }
        });
    }, [])
    const SubjectList = () => {
        if (props.api_user.role === 'SD' && props.enrolled_subjects) {
         
            const subject_list = props.enrolled_subjects.map((subject) => (
                <div 
                    onClick={() => props.selectSubject(props.access_token, subject.subject_pk)} 
                    className='subjectListElement' 
                    key={subject.subject_pk}>
                    {subject.subject_code} - {subject.subject_name}
                </div>
            ));
            return (
                <div className='subjectList'>{subject_list}</div>
            );
        }
        else if (props.staff_subjects && (props.api_user.role === 'IN' || props.api_user.role === 'TA')) {

            const subject_list = props.staff_subjects.map((subject) => (
                <div 
                    onClick={() => props.selectSubject(props.access_token, subject.pk)} 
                    className='subjectListElement' 
                    key={subject.pk}>
                    {subject.code} - {subject.name}
                </div>
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

        if (props.api_user && props.api_user.role ==='SD' && props.api_user.selected_subject_id) {
            return (<Redirect to='/student/status/'/>);
        }
        if (props.api_user && props.api_user.role ==='IN' && props.api_user.selected_subject_id) {
            return (<Redirect to='/staff/overview/'/>);
        }

        if (props.api_user) {
            /*if (!props.api_user.selected_subject_id) {
                return (
                    <VerticalContainer style={{ width: '100%' }}>
                        <h2>Select subject</h2>
                        <SubjectList />
                    </VerticalContainer>
                );
            }*/

            /*return (
                <VerticalContainer style={{ width: '100%' }}>
                    <h2>Select team</h2>
                    <TeamList />
                </VerticalContainer>
            );*/

            return (
                <VerticalContainer style={{ width: '100%' }}>
                    <h2>Select subject</h2>
                    <SubjectList />
                </VerticalContainer>
            );

        }
        return <div />
    }
    return (
        <Box>
            <TopbarLogin />
            <BottomSection />
            {props.feide_user && (
                <PrivacyModal feide_user={props.feide_user}/>
            )}
                
        </Box>
    )
} 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { feide_user, api_user, enrolled_subjects, account_loading } = state.account;
    const { team_list, loading_fetch, team, error_message, loading_action } = state.student;
    const { staff_subjects } = state.staff;

    const return_state = {
        access_token,  
        feide_user, 
        api_user, 
        enrolled_subjects, 
        account_loading, 
        team_list, 
        loading_fetch,
        team,
        error_message,
        loading_action,
        staff_subjects
    }

    return return_state;
}

export default connect(mapStateToProps, { 
    getEnrolledSubjects, 
    selectSubject, 
    fetchTeamList,
    selectTeam,
    setAccessToken,
    getApiUser,
    getUserFeide
})(SelectSubject)



/*const redirect = () => {
        if (props.api_user && props.api_user.has_selected_subject) {
            if (props.api_user.role === 'SD') {
                return (<Redirect to='/student/status/'/>);
            }
            return (<Redirect to='/staff/status/'/>);
        }
    }*/


// Team Modal:

/* 

<Modal 
    isOpen={modalOpen}
    style={modalStyles}>
    
    <h3>{teamName} password:</h3>
    {props.loading_action ? (
        <Loader />
    ): (
        <form onSubmit={onSubmitSelectTeam}>
            <label>
                Password:
                
                <input placeholder=' password...' type='text' value={teamPassword} onChange={(e) => setTeamPassword(e.target.value)} />
            </label>
            <p>{props.error_message}</p>
            <br />
            <input type='submit' value='Register' />

        </form>
    )}

    <button onClick={() => setModalOpen(false)}>Close</button>
    
</Modal>

*/ 


/*const TeamList = () => {
    if (props.team_list) {
        const team_list = props.team_list.map((team) => (
            <div 
                onClick={() => openTeamModal(team.pk, team.name)} 
                className='subjectListElement' 
                key={team.pk}>
                {team.name}
            </div>
        ))
        return (
            <div className='subjectList'>{team_list}</div>
        );
    }
    return <div />;
}*/

/*const openTeamModal = (team_id, team_name) => {
    setModalOpen(true);
    setSelectedTeamId(team_id);
    setSelectedTeamName(team_name);
}*/

/*const onSubmitSelectTeam = (event) => {
    event.preventDefault();
    props.selectTeam(props.access_token, teamId, teamPassword);
}*/

/*const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
*/