import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';


const ChangeExample = (props) => {
    const { show, close } = props;

    
    return (
        <>
            <Modal show={show} onHide={close}>
                <Modal.Body>
                    <label htmlFor="">Name</label>
                    <input type="text" />

                </Modal.Body>
            </Modal>
        </>
    );
};

export default ChangeExample;
