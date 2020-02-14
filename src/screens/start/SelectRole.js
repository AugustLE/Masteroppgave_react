import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';
import { getUserFeide, getPrivacyConsent } from '../../actions/AuthActions';
import { changeRole, getApiUser } from '../../actions/AccountActions';
import { setAccessToken } from '../../actions/MainActions';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Box, Row, Text } from '../../components/common';
import { RoleButton } from '../../components/RoleButton/RoleButton';
import { getAccessToken } from '../../GlobalMethods';
import Loader from 'react-loader';
import PrivacyModal from '../../components/PrivacyModal/PrivacyModal';


const SelectRole = (props) => {

    useEffect(() => {

        clientJSO.getToken().then((response) => { 
            if (response.access_token) {
                console.log('ALREADY logged in');
            } else {
                console.log('not logged in');
            }
        });
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else { 
                props.setAccessToken(token);
                props.getUserFeide(token);
                props.getApiUser(token, true);
            }

        })
    }, [])

    const feideUsername = () => {
        if (props.feide_user) {
            return props.feide_user.userid_sec[0].split(':')[1].split('@')[0];
        }
        return null;
    }
    console.log(props.feide_user);
    // console.log(props.api_user)
    return (
        <Box>
            <TopbarLogin />
            {(props.feide_user) && (
                <Box>
                    <h3>{props.feide_user.name}</h3>
                </Box>
            )}
            
            <PrivacyModal />
            
            {(props.feide_user && props.api_user && !props.api_user.role) && (
                <Box>
                    <h4>Select your role:</h4>
                    {props.account_loading ? (
                        <Loader />
                    ): (
                        <Row> 
                            <RoleButton role='student' text='Student' onClick={() => props.changeRole(props.access_token, 'SD')} />
                            <RoleButton role='instructor' text='Instructor' onClick={() => props.changeRole(props.access_token, 'IN')} />
                        </Row>
                    )}
                    {props.role_error && (
                        <Text error>{props.role_error}</Text>
                    )}
                </Box>
            )}
            

            {(props.feide_user && props.api_user && props.api_user.role) && (
                <Redirect to='/selectsubject'/>
            )}
            
        </Box>
    );

}
 
const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { feide_user, api_user, account_loading, role_error, privacy_consent } = state.account;
    return { access_token, feide_user, api_user, account_loading, role_error, privacy_consent };
};

export default connect(mapStateToProps, 
    {   getUserFeide, 
        changeRole, 
        setAccessToken,
        getPrivacyConsent, 
        getApiUser
    })(SelectRole);