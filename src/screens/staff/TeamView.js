import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import Modal from 'react-modal';
import { VerticalContainer, Text, Row, Box, Button, Line, Input } from '../../components/common';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getTeamList, getTeamInfo } from '../../actions/StaffActions';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { getAccessToken } from '../../GlobalMethods';
import { TeamList } from '../../components/TeamList/TeamList';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';

const modalStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      width: '80%',
      border: 'none',
      boxShadow: '1px 1px 2px 2px #d5d5d5'

    }
  };
 
const TeamView = (props) => {

    const [modalOpen, setModalOpen] = useState(false);
    const [teamId, setSelectedTeamId] = useState(null);
    const [searchValue, setSearchValue] = useState('');
 

    useEffect(() => {

        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getTeamList(token);
            }
            
        });
        if (props.active_tab !== 1) {
            props.setActiveTab(1);
        }
    }, [])

    const onTeamClick = (team_id) => {
        setSelectedTeamId(team_id);
        setModalOpen(true);
        props.getTeamInfo(props.access_token, team_id);
    }

    const searchList = () => {
        if (props.staff_team_list && searchValue !== '') {
            let team_list = [].concat(props.staff_team_list);
            const searched_list = team_list.filter(
                team => team.name.toLowerCase().includes(searchValue.toLowerCase())
                || team.responsible.toLowerCase().includes(searchValue.toLowerCase())
            );
            return searched_list;
        }
        return props.staff_team_list;
    }

    const TeamMemberList = () => {
        const list = props.modal_team_members.map((member) => (
            <Row style={{ width: '100%', marginTop: '5px' }} key={member.name}>
                <Text style={{ flex: 3 }}>{member.name}</Text>
                {member.average_score ? (
                    <Row style={{ flex: 1 }}>
                        <Text bold style={{ flex: 1 }}>{member.average_score}</Text>
                        <Box style={{ flex: 1, marginLeft: '5px' }}>
                            <ProgressBar score={member.average_score} />
                        </Box>
                    </Row>
                ): (
                    <Text size='12px' bold style={{ flex: 1 }}>No scores</Text>
                )}
                
            </Row>
        ));

        return (
            <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                <Text style={{ marginTop: '10px' }} size='16px' bold>Team members</Text>
                {list}
                <Line style={{ width: '100%', marginTop: '10px' }} />
                <Text style={{ marginTop: '10px', marginBottom: '5px' }} size='16px' bold>Responsible for this team</Text>
                <Text>{props.modal_responsible}</Text>
            </VerticalContainer>
        );
    }
    return (
        <VerticalContainer>
            <NavBar />
            {props.subject && (
                <Text bold size='22px' style={{ margin: '15px' }}>{props.subject.code} - Overview</Text>
            )}
             
            {(!props.loading_fetch && props.staff_team_list) ?  (
                <Box style={{ width: '100%', alignItems: 'flex-start' }}>
                    <Input 
                        placeholder="Search" 
                        onChangeValue={e => setSearchValue(e.target.value)} 
                        value={searchValue}
                        style={{ width: '90%', marginLeft: '10px' }}
                    />
                    <TeamList 
                        onClick={(team_id) => onTeamClick(team_id)} 
                        teams={searchList()} 
                    />
                </Box>
            ): (
                <Loader />
            )}
            <Modal 
                isOpen={modalOpen}
                style={modalStyles}
                ariaHideApp={false}
                >
                {(!props.modal_loading && props.modal_team) ? (
                    <VerticalContainer>
                        <Text bold size='20px'>{props.modal_team.name}</Text>
                        <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                            <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>Average score</Text>
                            <Row style={{ jusifyContent: 'flex-start' }}>
                                <Text style={{ marginRight: '5px' }} bold>{props.modal_team.last_average_score}</Text>
                                <ProgressBar score={props.modal_team.last_average_score} />
                            </Row>
                        </VerticalContainer>
                        <Line style={{ width: '90%', marginTop: '10px' }} />
                        <TeamMemberList />
                    </VerticalContainer>
                ): (
                    <Loader />
                )}
                <VerticalContainer>
                    <Button style={{ marginTop: '25px' }} secondary onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                </VerticalContainer>
                
            </Modal>
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { 
        staff_team_list, 
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members,
        modal_team,
        modal_loading
    } = state.staff;

    return { 
        access_token, 
        staff_team_list, 
        loading_fetch, 
        subject, 
        modal_responsible, 
        modal_team_members, 
        modal_team,
        modal_loading
    };
}

const mapDispatchToProps = {
    getTeamList,
    setAccessToken,
    setActiveTab,
    getTeamInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(TeamView);