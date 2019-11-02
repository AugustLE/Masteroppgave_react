import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getUserFeide, loginAndCreateUserIfNecessary } from '../../actions/AuthActions';
import { changeRole } from '../../actions/AccountActions';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Box, Row } from '../../components/common';
import { RoleButton } from '../../components/RoleButton/RoleButton';
import { clientJSO } from '../../GlobalVars';
import Loader from 'react-loader';


const SelectRole = (props) => {


    useEffect(() => {
        props.getUserFeide(props.access_token);
        // clientJSO.wipeTokens();
    }, [])

    return (
        <Box>
            <TopbarLogin />
            {(props.feide_user && props.api_user && !props.api_user.role) && (
                <Box>
                    <h3>{props.feide_user.name}</h3>
                    <h4>Select your role:</h4>
                    {props.account_loading ? (
                        <Loader />
                    ): (
                        <Row>
                            <RoleButton role='student' text='Student' onClick={() => props.changeRole(props.access_token, 'SD')} />
                            <RoleButton role='instructor' text='Instructor' onClick={() => props.changeRole(props.access_token, 'IN')} />
                        </Row>
                    )}
            
                </Box>
            )}

            {(props.feide_user && props.api_user && props.api_user.role) && (
                <Redirect to='/selectsubject'/>
            )}

            <a href='https://auth.dataporten.no/logout'>Logout</a>
            
        </Box>
    );

}
 

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { loading, feide_user, api_user, account_loading } = state.account;
    return { access_token, loading, feide_user, api_user, account_loading };
};

export default connect(mapStateToProps, { getUserFeide, loginAndCreateUserIfNecessary, changeRole })(SelectRole);