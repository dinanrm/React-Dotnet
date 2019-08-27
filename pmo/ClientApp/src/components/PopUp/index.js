import React from 'react'
import {Modal, ModalBody,ModalHeader,ModalFooter, Button} from 'reactstrap'

const PopUp = (props) => {

    return (
        <Modal isOpen={props.show} toggle={e => props.setShow(false)} className={``}>
            <ModalHeader toggle={e => props.setShow(false)}>{props.title}</ModalHeader>
            <ModalBody>
                {props.children}
            </ModalBody>
            <ModalFooter>
                <Button color="primary" disabled={props.isLoading} onClick={props.eventAccept}>{props.accept || "Yes"}</Button>
                <Button color="secondary" onClick={e => props.setShow(false)}>No</Button>
            </ModalFooter>
        </Modal>
    )
}

export default PopUp
