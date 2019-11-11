import React from 'react';
import { connect } from 'react-redux';
import { VerticalContainer } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
 
const Groups = (props) => {

    return (
        <VerticalContainer>
            <NavBar />
            <h2>Groups</h2>
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    return { access_token };
}

export default connect(mapStateToProps, {})(Groups);