import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader';
import { connect } from 'react-redux';
import { setAccessToken } from '../../actions/MainActions';
import { getPrivacyConsent, acceptPrivacyConsent } from '../../actions/AuthActions';
import { Text, Button, Row, Line } from '../common';


const modalStyles = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.2,
        elevation: 2,
    }
  };

const privacy_text = 'The application will collect Feide username, email and full name of students at NTNU that opt in to participate in the study. In addition to this information, the application will store the feedback  given by the students related to their group work experience. The feedback will be available to the relevant course staff (e.g. researchers, teaching, assistants, lecturers and professors) This information will be used to understand if such an approach can be used to diagnose and solve group work issues. The data collection within the project will only last and be active throughout this spring semester.';

const PrivacyModal = (props) => {

    const [accepted, setAccepted] = useState(false);

    useEffect(() => {
        const username = props.feide_user.userid_sec[0].split(':')[1].split('@')[0];
        props.getPrivacyConsent(username);
    }, [])

    const onSubmitPrivacyConsent = (event) => {
        event.preventDefault();
        props.acceptPrivacyConsent(props.feide_user, props.access_token);
    }
    
    if (props.privacy_consent) {
    
        return (
            <Modal 
                isOpen={!props.privacy_consent.has_accepted}
                style={modalStyles}
                ariaHideApp={false}
                >
                
                <Text bold size='18px' centered>Privacy policy</Text>
                <Text style={{ marginTop: '10px', marginBottom: '10px' }} size='16px'>{privacy_text}</Text>
                {props.loading_action ? (
                    <Loader />
                ): (
                    <form onSubmit={onSubmitPrivacyConsent}>
                        <Line style={{ width: '100%' }} />
                        <Row style={{ marginTop: '15px', marginBottom: '15px', width: '100%', justifyContent: 'flex-start' }}>
                            <input onChange={() => setAccepted(!accepted)} checked={accepted} value={accepted} type='checkbox' />
                            <Text size='15px' bold>I accept and would like to create a profile</Text>
                        </Row>
                        {accepted && (
                            <Button >Create profile</Button>
                        )}

                    </form>
                )}
            
            
            </Modal>
            );
    }
    return <div />
}

const mapStateToProps = (state) => {

    const { access_token } = state.main;
    const { privacy_consent } = state.account;
    return { access_token, privacy_consent };
};

export default connect(mapStateToProps, { setAccessToken, getPrivacyConsent, acceptPrivacyConsent })(PrivacyModal)