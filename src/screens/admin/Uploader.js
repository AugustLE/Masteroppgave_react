import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';
import { getAccessToken } from '../../GlobalMethods';
import { setAccessToken } from '../../actions/MainActions';
import { VerticalContainer, Text, Button } from '../../components/common';
import { NavBar } from '../../components/NavBar/NavBar';
import { getApiUser } from '../../actions/AccountActions';

const Uploader = (props) => {

    const [textResult, setTextResult] = useState(null);

    useEffect(() => {
        getAccessToken().then(token => {
            if (!token) {
                props.history.push('/')
            } else {
                props.getApiUser(token, true);
                props.setAccessToken(token);
            }
        });
    }, []);

    const showFile = () => {
        console.log('Action');
        if(window.File && window.FileReader && window.FileList && window.Blob) {
            ///var preview = document.getElementById('show-text');
            var file = document.querySelector('input[type=file]').files[0];
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
                        one_team.shift();
                        const teamName = element.trim().split('\n')[0];
                        const team_list = [];
                        one_team.forEach(member => {
                            team_list.push(member);
                            
                        });
                        const team_object = {
                            name: teamName,
                            members: team_list
                        }
                        json_teams.push(team_object);
                    }) 
                    console.log(json_teams);
                    setTextResult(event.target.result);
                }
            } else {
                //preview.innerHTML = "<span class='error'>The file is not a txt file</span>";
            }
            reader.readAsText(file);
        }
    }

    return (
        <VerticalContainer>
            <NavBar />
            <Text bold size='24px' style={{ marginTop: '20px' }}>Register teams</Text>
            <Text bold size='18px' style={{ margin: '5px', marginBottom: '20px' }}>Select subject</Text>
            <input type="file" onChange={showFile} value="" />
            {textResult && (
                <Text>{textResult}</Text>
            )}
            
        </VerticalContainer>
    );
}

const mapStateToProps = (state) => {
    const { access_token } = state.main;
    const { enrolled_subjects } = state.account;

    return { access_token, enrolled_subjects };
}

export default connect(mapStateToProps, { setAccessToken, getApiUser })(Uploader);