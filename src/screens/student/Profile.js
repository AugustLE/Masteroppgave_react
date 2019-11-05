import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab } from '../../actions/MainActions';
import { logout } from '../../actions/AuthActions';
import { getApiUser } from '../../actions/AccountActions';
import { getAccessToken } from '../../GlobalMethods';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Row, Button, VerticalContainer, Line, ImageButton } from '../../components/common';
import './profile.css';

const Profile = (props) => {

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
        props.logOut();
        props.history.push('/');
    }

    const TopSection = () => {
        if (props.account_loading) {
            return <Loader />;
        }

        if (props.api_user) {
            return (
                <Row>
                    <VerticalContainer style={{ flex: 4 }}>
                        <img className='studentImage' src={require('../../images/student/mortarboard.png')} />
                    </VerticalContainer>
                    <VerticalContainer style={{ flex: 7, alignItems: 'flex-start' }}>
                        <p className='nameText'>{props.api_user.name}</p>
                        <Button image={require('../../images/logout_white.png')} onClick={() => logOut()}>Log out</Button>
                    </VerticalContainer>
                </Row>
            );
        }
        return <div />;
    }

    const BottomSection = () => {
        if (props.loading_fetch) {
            return <Loader />
        }
        if (props.team && props.subject) {
            return (
              
                <VerticalContainer style={{ alignItems: 'flex-start' }}>
                    <Row style={{ marginLeft: '30px' }}>
                        <p className='profileInfoLabel'>Current subject: </p>
                        <p className='profileInfoText'>{props.subject.code} - {props.subject.name}</p>
                    </Row>
                    <Row style={{ marginLeft: '30px' }}>
                        <p className='profileInfoLabel'>Your team: </p>
                        <p className='profileInfoText'>{props.team.name}</p>
                    </Row>

                    <ImageButton 
                        onClick={() => console.log('onClick')} 
                        image={require('../../images/book.png')}
                        styles={{ marginLeft: '30px', marginTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}
                    >
                        Change subject
                    </ImageButton>

                    <Line style={{ width: '100%', marginTop: '20px' }} />
                    
                </VerticalContainer>
                    
            );
        }
        return <div />;
    }



    return (
        <div>
            <NavBar />
            <TopSection />
            <TabBarStudent history={props.history} />
            <Line style={{ marginTop: '10px', marginBottom: '10px' }}/>
            <BottomSection />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { api_user, account_loading, subject } = state.account;
    const { team, loading_fetch } = state.student;
    return { access_token, active_tab, api_user, account_loading, team, subject, loading_fetch };
}

export default connect(mapStateToProps, { setActiveTab, logout, getApiUser })(Profile);
