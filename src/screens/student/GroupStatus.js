import React from 'react';
import { connect } from 'react-redux';
import { TabBar } from '../../components/TabBar';

const GroupStatus = (props) => {
    return (
        <div>
            <TabBar />
        </div>
    );
};

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
};

export default connect(mapStateToProps, {})(GroupStatus);