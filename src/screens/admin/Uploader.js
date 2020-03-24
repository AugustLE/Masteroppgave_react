import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { getAccessToken } from '../../GlobalMethods';
import { setAccessToken } from '../../actions/MainActions';
import { VerticalContainer, Text, Button, Line, Box, Form } from '../../components/common';
import { NavBar } from '../../components/NavBar/NavBar';
import { getApiUser } from '../../actions/AccountActions';
import { uploadTeamList, setStaffField } from '../../actions/StaffActions';
import { TeamJsonList } from './TeamJsonList/TeamJsonList';
import { Redirect } from 'react-router';
import { PermissionCheck } from '../../components/PermissionCheck/PermissionCheck';

const USE_UPLOADER_2 = true;

const Uploader = (props) => {

    ///const [textResult, setTextResult] = useState(null);
    const [jsonTeams, setJsonTeams] = useState(null);
    // const [fileName, setFileName] = useState('');

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token);
                props.setAccessToken(token);
            }
        });
    }, []);


    const showFile2 = () => {
        if(window.File && window.FileReader && window.FileList && window.Blob) {
            ///var preview = document.getElementById('show-text');
            var file = document.querySelector('input[type=file]').files[0];
            // setFileName(file.name);
            var reader = new FileReader();

            var textFile = /text.*/;
            const json_teams = [];
            if(file.type.match(textFile)) {
                reader.onload = function (event) {
                    let text_array = event.target.result.split('-');
                    if (text_array[0].trim() === '') {
                        text_array.shift();
                    }
                    text_array.forEach(element => {
                        const one_row = element.trim().split(',');
                        const team_split = one_row[0].split('_gc_');
                        const team_name = team_split[0] + ' ' + team_split[1];
                        const team_number = team_split[1];
                        
                        const team_object = {
                            name: team_name,
                            team_number: team_number,
                            member: one_row[1],
                        }
                        json_teams.push(team_object);
                    }) 
                    // setTextResult(event.target.result);
                    setJsonTeams(json_teams);
                    console.log(json_teams);
                }
            } else {
                //preview.innerHTML = "<span class='error'>The file is not a txt file</span>";
            }
            reader.readAsText(file);
        }
    }

    const showFile = () => {
        if(window.File && window.FileReader && window.FileList && window.Blob) {
            ///var preview = document.getElementById('show-text');
            var file = document.querySelector('input[type=file]').files[0];
            // setFileName(file.name);
            var reader = new FileReader();

            var textFile = /text.*/;
            const json_teams = [];
            if(file.type.match(textFile)) {
                reader.onload = function (event) {
                    let text_array = event.target.result.split('-');
                    if (text_array[0].trim() === '') {
                        text_array.shift();
                    }
                    text_array.forEach(element => {
                        const one_team = element.trim().split('\n');
                        const teamName = one_team[0];
                        let instructor = null;
                        let responsible = null;
                        if (one_team.length > 1 && one_team[1].trim().length > 0) {
                            responsible = one_team[1];
                        }
                        const team_list = [];
                        if (responsible) {
                            if (responsible.split(':')[0] === 'IN') {
                                console.log('INSTRUCT');
                                instructor = responsible.split(':')[1];
                                responsible = null;
                            }
                            one_team.shift();
                            one_team.shift();
                            one_team.forEach(member => {
                                team_list.push(member);
                            });
                        }

                        const team_object = {
                            name: teamName,
                            members: team_list,
                            responsible: responsible,
                            instructor: instructor
                        }
                        json_teams.push(team_object);
                    }) 
                    // setTextResult(event.target.result);
                    setJsonTeams(json_teams);
                    console.log(json_teams);
                }
            } else {
                //preview.innerHTML = "<span class='error'>The file is not a txt file</span>";
            }
            reader.readAsText(file);
        }
    }

  

    if (props.admin_loading) {
        return (
            <Box>
                <Loader />
                <Text bold>Uploading teams...</Text>
            </Box>
        );
    }

    return (
        <VerticalContainer>
            {props.api_user && (
                <PermissionCheck data_check student api_user={props.api_user} history={props.history}/>
            )}
            <NavBar />
            <Text bold size='24px' style={{ marginTop: '20px', marginBottom: '20px' }}>Register teams</Text>
            <Button secondary>
                <input type="file" onChange={showFile2} onClick={e => e.target.value = null} />
            </Button>
            {jsonTeams && !USE_UPLOADER_2 && (
                <TeamJsonList jsonTeams={jsonTeams} />
            )}
            {jsonTeams && (
                <Form onSubmit={() => props.uploadTeamList(props.access_token, jsonTeams)}>
                    <Button style={{ marginTop: '20px' }}>Submit teamlist</Button>
                </Form>
            )}
            {props.team_upload_success && (
                <Text style={{ margin: '10px', color: 'green' }} bold size='16px'>Success! Teams registered</Text>
            )}
            <Line style={{ width: '100%', marginTop: '20px' }} />
            <Button 
                style={{ 'marginTop': '30px' }}
                secondary
                onClick={() => { 
                    props.history.push('/staff/overview');
                    props.setStaffField({ prop: 'team_upload_success', value: false }); 
                }}>
                Back to overview
            </Button>
            {(props.api_user && props.api_user.role !== 'IN') && (
                <Redirect to='/staff/overview/' />
            )}
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { enrolled_subjects, api_user } = state.account;
    const { admin_loading, team_upload_success } = state.staff;

    return { access_token, enrolled_subjects, admin_loading, team_upload_success, api_user };
}

export default connect(mapStateToProps, { 
    setAccessToken, 
    getApiUser, 
    uploadTeamList,
    setStaffField 
})(Uploader);