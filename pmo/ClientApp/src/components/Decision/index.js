import React ,{useState} from 'react'
import api from '../../utils/api'
import { UploadLayout, BottomLayout, ButtonLayout, Btn, LabelBtn, BtnApproval } from './style'
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { IoIosCheckmark, IoIosClose, IoIosReturnLeft } from "react-icons/io";

const Decision = (props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [popUp, setPopUp] = useState(false)
  const [popUpSubmit, setPopUpSubmit] = useState(false)
  const [status, setStatus] = useState('');
  const [reason, setReason] = useState('')
  const {page,role,isEditable, isSending, validationDraft, validation, projectStatus, errors} = props
  const decideEvent = async(statusCode) => {
    if(!isLoading){
      try{
        setIsLoading(true)
        const response = await api.projects.updateStatus(props.match.params.id,{
          projectId : props.match.params.id,
          userId : props.user.id,
          projectStatus : statusCode,
          comment: reason,
          })
          response.status >= 200 && response.status < 300 && props.history.goBack()
          response.data && setIsLoading(false)
        } catch (err) {
          console.error(err)
        }
      }
    }
    const decide = (status) => {
      setPopUp(true)
      setStatus(status)
    }

    
    const submit = ( status ) => {
      setStatus(status)
      props.setIsSubmit(true)
      let noErrors = Object.keys(errors).length === 0
      !noErrors && props.setErrors(errors) 
      noErrors && setPopUpSubmit(true)
    }
  
  const onProject = (status) => {
    switch (status) {
      case 1:
        return 'initiating'
      case 2:
        return 'planning'
      case 3:
        return 'change request'
      case 4:
        return 'final'
      default:
        break
    }
  }

    return (
      <> 
      <BottomLayout>

      <UploadLayout>
      {props.children}
      </UploadLayout>
      {isEditable &&
        <ButtonLayout>
          {/* <Btn className="btn btn-warning" onClick={e => props.history.goBack()}>CANCEL</Btn> */}
          <Btn className="btn btn-info" disabled={isSending} onClick={e => validationDraft(projectStatus === parseInt(`${page}4`)? `${page}4`:`${page}1`)}>SAVE DRAFT</Btn>
          {role.isManager && <Btn className="btn btn-success" disabled={isSending} onClick={e => page === 4 ? submit(`${page}2`):validation(`${page}2`)}>SUBMIT</Btn>}
        </ButtonLayout>
      }
      {(projectStatus === parseInt(`${page}2`) && role.isOwner) && 
        <ButtonLayout className="justify-content-center">
          { page !== 4 && <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(`5${page}`)}>
            <LabelBtn><IoIosClose className="mb-1" size={40}/>DISSAPROVE</LabelBtn>
          </BtnApproval>}
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(`${page}4`) }>
            <LabelBtn><IoIosReturnLeft className="mb-1 p-2" size={40}/>REQUEST TO REVISE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(`${page}3`) }>
            <LabelBtn><IoIosCheckmark className="mb-1" size={40}/>ACKNOWLEDGE</LabelBtn>
          </BtnApproval>
        </ButtonLayout>
      }
      {(projectStatus === parseInt(`${page}3`) && role.isSponsor) && 
        <ButtonLayout className="justify-content-center">
          { page !== 4 && <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(`5${page}`)}>
            <LabelBtn><IoIosClose className="mb-1" size={40}/>DISSAPROVE</LabelBtn>
          </BtnApproval>}
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(`${page}4`) }>
            <LabelBtn><IoIosReturnLeft className="mb-1 p-2" size={40}/>REQUEST TO REVISE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide(page === 4 ? `${page+1}0` : page === 2 ? `${page+2}1`:`${page+1}1`) }>
            <LabelBtn><IoIosCheckmark className="mb-1" size={40}/>ACKNOWLEDGE</LabelBtn>
          </BtnApproval>
        </ButtonLayout>
      }
      </BottomLayout>

        <Modal isOpen={popUp} toggle={e => setPopUp(false)} className={``}>
        <ModalHeader toggle={e => setPopUp(false)}>Project Planing</ModalHeader>
        <ModalBody>
          <div>Are you sure to {status === `${page}4` ? 'request to revise':status === `5${page}`? 'dissaprove':'acknowledge'} this plan ?</div>
          <div>Reason:</div>
          <Input type="textarea" onChange={e => setReason(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={isLoading} onClick={e => decideEvent(status)}>Yes</Button>
          <Button color="secondary" onClick={e => setPopUp(false)}>No</Button>
        </ModalFooter>
        </Modal>

        <Modal isOpen={popUpSubmit} toggle={e => setPopUpSubmit(false)} className={``}>
        <ModalHeader toggle={e => setPopUpSubmit(false)}>Project </ModalHeader>
        <ModalBody>
          <div>Are you sure to submit project {onProject(page)} report to the project owner and project sponsor ?</div>
          <div>Reason:</div>
          <Input type="textarea" onChange={e => props.setReason(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={isLoading} onClick={e => validation(status)}>Yes</Button>
          <Button color="secondary" onClick={e => setPopUpSubmit(false)}>No</Button>
        </ModalFooter>
        </Modal>
      </>
    )
}

export default Decision
