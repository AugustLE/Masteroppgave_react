import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { setActiveTab, setAccessToken } from '../../actions/MainActions';
import { getContactInfo } from '../../actions/StudentActions';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Text, VerticalContainer, Row, Line, Button } from '../../components/common';
import { clientJSO } from '../../GlobalVars';
import { getAccessToken } from '../../GlobalMethods';


const Messages = (props) => {

    useEffect(() => {
        clientJSO.getToken();
        if (props.active_tab !== 1) {
            props.setActiveTab(1);
        }
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getContactInfo(token);
            }
        });
    }, []);
    
    if (props.loading_fetch) {
        return <Loader />;
    }
    return (
        <VerticalContainer style={{ alignItems: 'center' }}>
            <VerticalContainer style={{ 
                maxWidth: '500px', 
                width: '100%', 
            }}>
                <NavBar />
                <VerticalContainer style={{ alignItems: 'flex-start', width: '90%', paddingLeft: '15px' }}>
                    <Text bold size='22px' style={{ marginTop: '15px', marginBottom: '15px' }}>Your team responsible</Text>
                    <Line style={{ width: '90%', marginBottom: '10px' }} />
                    {props.contact_info_responsible && (
                        <VerticalContainer style={{ alignItems: 'flex-start', width: '100%' }}>
                            <Row>
                                <Text size='16px' bold>Email: </Text>
                                <Text size='16px'>{props.contact_info_responsible.email}</Text>
                            </Row>
                            <Row>
                                <Text size='16px' bold>Name: </Text>
                                <Text size='16px'>{props.contact_info_responsible.name}</Text>
                            </Row>
                            <Line style={{ width: '90%', marginTop: '10px' }} />
                            
                            <Button style={{ marginTop: '15px' }}>
                                <a 
                                href={"mailto:" + props.contact_info_responsible.email}
                                style={{ color: 'white', textDecoration: 'none' }}>
                                    Send Email
                                </a>
                            </Button>
                        </VerticalContainer>
                    )}
                </VerticalContainer>
                <TabBarStudent history={props.history} />
            </VerticalContainer>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    const { contact_info_responsible, loading_fetch } = state.student;
    return { access_token, active_tab, contact_info_responsible, loading_fetch };
}

export default connect(mapStateToProps, { setActiveTab, getContactInfo, setAccessToken })(Messages);
