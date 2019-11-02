import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Redirect } from 'react-router-dom';
import { Box, VerticalContainer } from '../../components/common';
import { getEnrolledSubjects, selectSubject } from '../../actions/AccountActions';
import { fetchTeamList } from '../../actions/StudentActions';
import Loader from 'react-loader';
import './start.css';

const SelectSubject = (props) => {


    useEffect(() => {
        props.getEnrolledSubjects(props.access_token);
        if (props.api_user.selected_subject_id) {
            props.fetchTeamList(props.access_token, props.api_user.selected_subject_id);
        }
        
    }, [])

    const SubjectList = () => {
        if (props.enrolled_subjects) {
         
            const subject_list = props.enrolled_subjects.map((subject) => (
                <div 
                    onClick={() => props.selectSubject(props.access_token, subject.subject_pk)} 
                    className='subjectListElement' 
                    key={subject.subject_pk}>
                    {subject.subject_code} - {subject.subject_name}
                </div>
            ))
            return (
                <div className='subjectList'>{subject_list}</div>
            );
        }
        return <div />;
    }

    const TeamList = () => {
        if (props.team_list) {
            const team_list = props.team_list.map((team) => (
                <div 
                    onClick={() => console.log('select_team')} 
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
    }
    

    const BottomSection = () => {
        // render list of subjects or list of teams if subject is selected

        if (props.account_loading || props.loading_fetch) {
            return <Loader />;
        }

        if (props.api_user) {
            if (!props.api_user.selected_subject_id) {
                return (
                    <VerticalContainer>
                        <h2>Select subject</h2>
                        <SubjectList />
                    </VerticalContainer>
                );
            }
            
            return (
                <VerticalContainer>
                    <h2>Select team</h2>
                    <TeamList />
                </VerticalContainer>
            );

        }
        return <div />
    }
    return (
        <Box>
            <TopbarLogin />
            <BottomSection />
            
        </Box>
    )
} 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { loading, feide_user, api_user, enrolled_subjects, account_loading } = state.account;
    const { team_list, loading_fetch } = state.student;

    return { access_token, loading, feide_user, api_user, enrolled_subjects, account_loading, team_list, loading_fetch };
}

export default connect(mapStateToProps, { getEnrolledSubjects, selectSubject, fetchTeamList })(SelectSubject)



/*const redirect = () => {
        if (props.api_user && props.api_user.has_selected_subject) {
            if (props.api_user.role === 'SD') {
                return (<Redirect to='/student/status/'/>);
            }
            return (<Redirect to='/staff/status/'/>);
        }
    }*/