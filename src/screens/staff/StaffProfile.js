import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { Line } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { ProfileSectionBottom, ProfileSectionTop } from '../../components/ProfileSection';
import { getApiUser } from '../../actions/AccountActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getAccessToken } from '../../GlobalMethods';

 
const StaffProfile = (props) => {

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
            }
        });

        if (props.active_tab !== 3) {
            props.setActiveTab(3);
        }
    }, []);

    const logOut = () => {
        props.logout();
        props.history.push('/');
    }

    const Profile = () => {
        if (props.account_loading) {
            return <Loader />;
        }
        if (props.api_user && props.subject) {
            return (
                <div>
                    <ProfileSectionTop 
                    api_user={props.api_user} 
                    logOut={() => logOut()}
                    instructor
                    />
                    <Line style={{ marginTop: '10px', marginBottom: '10px' }}/>
                    <ProfileSectionBottom 
                        subject={props.subject}  
                        onChangeSubject={() => console.log('PRint subj')} 
                    />
                </div>
            );
        }
        return <div />
    }


    if (props.api_user && props.subject) {
        return (
            <div>
                <NavBar />
                <Profile />
                <TabBarStaff history={props.history}/>
            </div>
        );
    }
    return <div />
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject } = state.account;
    return { access_token, active_tab, api_user, account_loading, subject };
}

export default connect(mapStateToProps, { getApiUser, setActiveTab, setAccessToken, logout })(StaffProfile);

/*
const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject } = state.account;
    
    return { access_token, active_tab, api_user, account_loading, team, subject, loading_fetch };
}
*/

/*
useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
            }
        });

        if (props.active_tab !== 2) {
            props.setActiveTab(2);
        }
    }, []);

    const logOut = () => {
        props.logout();
        props.history.push('/');
    }

    return (
        <div>
            <NavBar />
            {(!props.account_loading && props.api_user) ? (
                <ProfileSectionTop api_user={props.api_user} logOut={() => logOut()}/>
            ): (
                <Loader />
            )}
            <Line style={{ marginTop: '10px', marginBottom: '10px' }}/>
            {(!props.loading_fetch && props.team && props.subject) ? (
                <ProfileSectionBottom 
                    subject={props.subject} 
                    team={props.team} 
                    student 
                    onChangeSubject={() => console.log('PRint subj')} 
                />
            ): (
                <Loader />
            )}
            <TabBarStudent history={props.history} />
        </div>
    );

*/