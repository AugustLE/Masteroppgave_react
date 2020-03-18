import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';
import { setAccessToken } from '../../actions/MainActions';
import { setRedirectError } from '../../actions/AccountActions';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Box, Image, Text } from '../../components/common';
import { setAccessTokenPersistent } from '../../GlobalMethods';
import './start.css';

const Login = (props) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        props.setRedirectError(false);
        try {
            clientJSO.callback().then(response => {
                props.setAccessToken(response.access_token);
                setAccessTokenPersistent(response.access_token);
                setRedirect(true);
            })
        } catch { }
        // clientJSO.wipeTokens();
    }, [])
    
    const feideLogin = () => {
        props.setRedirectError(false);
        clientJSO.getToken().then((response) => { 
            if (response.access_token) {
                props.setAccessToken(response.access_token);
                setAccessTokenPersistent(response.access_token);
                setRedirect(true);
            }
        });
        
    }

    if (redirect) {
        return (<Redirect to='/selectsubject'/>)
    }

    return (
        <Box>
            <TopbarLogin />
            <Text style={{ marginTop: '25px' }} bold size='20px'>Login with: </Text>
            <button className='loginButton' onClick={feideLogin}>
                <Image 
                    src={require('../../images/feide_logo.jpg')} 
                    style={{ width: '200px' }}
                />
            </button>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
};

export default connect(mapStateToProps, { setAccessToken, setRedirectError })(Login);