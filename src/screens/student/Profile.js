import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setActiveTab } from '../../actions/MainActions';
import TabBarStudent from '../../components/TabBarStudent/TabBarStudent';
import { NavBar } from '../../components/NavBar/NavBar';
import { Box } from '../../components/common';

const Profile = (props) => {

    useEffect(() => {
        if (props.active_tab !== 2) {
            props.setActiveTab(2);
        }
    });

    return (
        <div>
            <NavBar />
            <Box>
                <h2>Profile</h2>
            </Box>
            <TabBarStudent history={props.history} />
        </div>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    return { access_token, active_tab };
}

export default connect(mapStateToProps, { setActiveTab })(Profile);
