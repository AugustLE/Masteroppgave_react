import React from 'react';
import Modal from 'react-modal';
import Loader from 'react-loader';
import { VerticalContainer, Text, Button, Line, Row } from '../common';

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
      boxShadow: '1px 1px 2px 2px #d5d5d5',
      maxWidth: '500px'

    }
  };


  export const BasicModal = (props) => {

    return (
        <Modal 
            isOpen={props.modalOpen}
            style={modalStyles}
            ariaHideApp={false}>
                
            {props.loading ? (
                <Loader />
            ): (
                <VerticalContainer>
                    <Text bold size='20px' style={{ width: '90%' }}>{props.title}</Text>
                    <VerticalContainer style={{ alignItems: 'flex-start', width: '90%' }}>
                        <Text style={{ marginTop: '10px', marginBottom: '5px' }} bold size='16px'>
                            {props.text}
                        </Text>

                    </VerticalContainer>
                    <Line style={{ width: '90%', marginTop: '10px' }} />
                </VerticalContainer>
            )}
            
            
            <Row style={{ justifyContent: 'flex-start', marginLeft: '25px' }}>
                <Button style={{ marginTop: '25px' }} secondary onClick={() => props.setModalOpen(false)}>
                    Close
                </Button>

                {(props.warning && !props.loading) ? (
                     <Button 
                        warning 
                        style={{ marginTop: '25px', marginLeft: '10px' }} 
                        onClick={props.onActionClick}
                        >
                        {props.buttonText}
                    </Button>
                ): !props.loading ? (
                    <Button style={{ marginTop: '25px', marginLeft: '10px' }} onClick={props.onActionClick}>
                        {props.buttonText}
                    </Button>
                ): (
                    <div />
                )}
            </Row>
            
        </Modal>
    );
  } 