import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { VerticalContainer, Box, Text, Row, Button } from '../../components/common';
import { getOverviewStatistics } from '../../actions/StaffActions';
import TabBarStaff from '../../components/TabBarStaff/TabBarStaff';
import { NavBar } from '../../components/NavBar/NavBar';
import { getAccessToken } from '../../GlobalMethods';
import { setAccessToken, setActiveTab } from '../../actions/MainActions';
import { ProgressBar } from '../../components/ProgressBar/ProgressBar';
 
const OverView = (props) => {

    useEffect(() => {
        ////
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.setAccessToken(token);
                props.getOverviewStatistics(token);
            }
        });
        if (props.active_tab !== 0) {
            props.setActiveTab(0);
        }
    }, [])

    const TeamList = () => {
        const team_list = props.responsible_teams.map((team) => (
            <Text key={team.pk}>{team.name}, </Text>  
        ));
        return (
            <Row>{team_list}</Row>
        );
    }
    
    const OverviewSection = () => {
        if (props.loading_fetch) {
            return <Loader />;
        }
        if (props.total_average && props.subject) {
            return (
                <VerticalContainer style={{ width: '95%' }}>
                    <Text bold size='22px' style={{ margin: '20px' }}>{props.subject.code} - Overview</Text>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Overall score of all teams</Text>
                        <ProgressBar big score={props.total_average} />
                        <Row style={{ marginTop: '15px', alignItems: 'flex-end' }}>
                            <Text bold size='20px'>{props.total_average}</Text>
                            <Text bold size='13px' style={{ marginBottom: '3px', marginLeft: '5px' }}>out of 5</Text>
                        </Row>
                    </Box>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Total number of teams</Text>
                        <Text bold size='20px'>{props.number_of_teams}</Text>
                    </Box>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Number of teams below score 2.5</Text>
                        <Text bold size='20px'>{props.number_teams_below}</Text>
                    </Box>
                    <Box shadow style={{ padding: '10px', paddingBottom: '15px', width: '92%', marginTop: '10px' }}>
                        <Text size='16px' bold style={{ marginBottom: '15px' }}>Teams you are responsible for</Text>
                        <TeamList />
                    </Box>
                </VerticalContainer>
            );
        }
        return <div />;
    }

    return (
        <VerticalContainer>
            <NavBar />
            <OverviewSection />
            <Button 
                style={{ 'marginTop': '30px' }}
                onClick={() => props.history.push('/admin/uploader')}>
                Manage course
            </Button>
            <TabBarStaff history={props.history}/>
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { 
        total_average, 
        number_teams_below, 
        responsible_teams, 
        loading_fetch, subject, 
        number_of_teams 
    } = state.staff;
    return { access_token, total_average, number_teams_below, responsible_teams, subject, loading_fetch, number_of_teams };
}

export default connect(mapStateToProps, { getOverviewStatistics, setAccessToken, setActiveTab })(OverView);