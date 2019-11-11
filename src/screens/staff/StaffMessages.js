import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { VerticalContainer } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getAccessToken } from '../../GlobalMethods';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
 
const StaffMessages = (props) => {

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
            }
        });

        if (props.active_tab !== 2) {
            props.setActiveTab(2);
        }
    }, []);

    return (
        <VerticalContainer>
            <NavBar />
            <h2>Messages</h2>
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
}

export default connect(mapStateToProps, { setActiveTab, setAccessToken })(StaffMessages);