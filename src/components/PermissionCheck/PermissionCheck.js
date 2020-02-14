import React, { useEffect } from 'react';

export const PermissionCheck = (props) => {

    useEffect(() => {
        if (props.api_user && props.api_user.role === 'SD') {
            props.history.push('/');
        }
    }, [])

    return <div />;
}