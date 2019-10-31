import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Box } from '../../components/common';
import { getEnrolledSubjects } from '../../actions/AccountActions';

const SelectSubject = (props) => {

    useEffect(() => {
        props.getEnrolledSubjects(props.access_token);
    }, [])

    const SubjectList = () => {
        if (props.enrolled_subjects) {
         
            const subject_list = props.enrolled_subjects.map((subject) => (
                <li key={subject.subject_pk}>{subject.subject_name}</li>
            ))
            return <ul>{subject_list}</ul>
        }
        return <div />;
    }

    return (
        <Box>
            <TopbarLogin />
            <SubjectList />
        </Box>
    )
} 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { loading, feide_user, api_user, enrolled_subjects } = state.account;

    return { access_token, loading, feide_user, api_user, enrolled_subjects };
}

export default connect(mapStateToProps, { getEnrolledSubjects })(SelectSubject)