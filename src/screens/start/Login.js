import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { clientJSO } from '../../GlobalVars';
import { setAccessToken } from '../../actions/MainActions';
import { TopbarLogin } from '../../components/TopbarLogin/TopbarLogin';
import { Box } from '../../components/common';
import './start.css';

const Login = (props) => {

    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        try {
            clientJSO.callback().then(response => {
                props.setAccessToken(response.access_token);
                setRedirect(true);
            })
        } catch { }
        //console.log(props.access_token);
        //clientJSO.wipeTokens();
    }, [])
    
    const feideLogin = () => {

        clientJSO.getToken().then((response) => { 
            if (response.access_token) {
                props.setAccessToken(response.access_token);
                setRedirect(true);
            }
        });
        
    }

    if (redirect) {
        return (<Redirect to='/selectrole'/>)
    }

    return (
        <Box>
            <TopbarLogin />
            <button className='loginButton' onClick={feideLogin}>
                Login with feide
            </button>
        </Box>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
};

export default connect(mapStateToProps, { setAccessToken })(Login);