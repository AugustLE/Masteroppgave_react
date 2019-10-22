import React from 'react';
import { connect } from 'react-redux';
import TabBar from '../../components/TabBar/TabBar';
import { NavBar } from '../../components/NavBar/NavBar';
import { Box } from '../../components/common';

const Messages = (props) => {

    return (
        <div>
            <NavBar />
            <Box>
                <h2>Messages</h2>
            </Box>
            <TabBar history={props.history}/>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { access_token, active_tab } = state.main;
    return { access_token, active_tab };
}

export default connect(mapStateToProps, { })(Messages);
