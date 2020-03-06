import React, { useEffect } from 'react';

export const PermissionCheck = (props) => {

    useEffect(() => {
        if (props.api_user.role === null) {
            props.history.push('/selectsubject');
        }
        if (props.student && props.api_user && props.api_user.role === 'SD') {
            props.history.push('/');
        }
        if (props.data_check && props.api_user.selected_subject_id === null) {
            props.history.push('/selectsubject');
        }
        if (props.admin && props.api_user.role !== 'IN') {
            props.history.push('/staff/overview/')
        }
    }, [])

    return <div />;
}