import React from 'react';
import { connect } from 'react-redux';
import { setActiveTab } from '../../actions/MainActions';
import { TabButton } from '../TabBar/TabButton';
import '../TabBar/tabbar.css';

const TabBarStaff = (props) => {

    const tabClick = (tab_number, path) => {
        props.setActiveTab(tab_number);
        props.history.push(path);
    }

    const checkActive = (tab_number) => {
        return props.active_tab === tab_number;
    }

    return (
        <div className='tabBarContainer'>
            <TabButton isActive={checkActive(0)} icon={require('./icons/pie-chart.png')} onClick={() => tabClick(0, '/staff/overview')}> 
                Overview
            </TabButton>
            <TabButton isActive={checkActive(1)} icon={require('./icons/list.png')} onClick={() => tabClick(1, '/staff/teams')}>
                Teams
            </TabButton>
            <TabButton isActive={checkActive(2)} icon={require('./icons/email.png')} onClick={() => tabClick(2, '/staff/messages')}>
                Messages
            </TabButton>
            <TabButton isActive={checkActive(3)} icon={require('./icons/avatar.png')} onClick={() => tabClick(3, '/staff/profile')}>
                Profile
            </TabButton>
        </div>
    );  
};

const mapStateToProps = (state) => {
    const { active_tab } = state.main;
    return { active_tab };
}

const mapDispatchToProps = {
    setActiveTab
}

export default connect(mapStateToProps, mapDispatchToProps)(TabBarStaff);