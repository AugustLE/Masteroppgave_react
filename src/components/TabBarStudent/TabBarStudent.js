import React from 'react';
import { connect } from 'react-redux';
import { setActiveTab } from '../../actions/MainActions';
import { TabButton } from './TabButton';
import './tabbar.css';

const TabBarStudent = (props) => {

    const tabClick = (tab_number, path) => {
        props.setActiveTab(tab_number);
        props.history.push(path);
    }

    const checkActive = (tab_number) => {
        return props.active_tab === tab_number;
    }

    return (
        <div className='tabBarContainer'>
            <TabButton isActive={checkActive(0)} icon={require('./icons/status-bar.png')} onClick={() => tabClick(0, '/student/status')}> 
                Group status
            </TabButton>
            <TabButton isActive={checkActive(1)} icon={require('./icons/mail.png')} onClick={() => tabClick(1, '/student/messages')}>
                Messages
            </TabButton>
            <TabButton isActive={checkActive(2)} icon={require('./icons/avatar.png')} onClick={() => tabClick(2, '/student/profile')}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TabBarStudent);