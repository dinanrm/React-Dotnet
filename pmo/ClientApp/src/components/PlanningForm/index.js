import React, { useState, useEffect } from 'react'
import { ContentLayout, TitleBar, DescTitle, ButtonLayout, Btn, BtnAdd,BtnApproval, Label } from './style';
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import ProjectManagementPlan from '../ProjectManagementPlan'
import api from '../../utils/api';
import { Input, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const PlanningForm = (props) => {
  const [Title1] = useState("Project Management Plan ");
  const [Desc] = useState("(complete each seaction as throughly as possible)")
  const [numbers, setNumbers] = useState([]);
  const [role, setRole] = useState(null);
  const [isHidden, setIsHidden] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [isDisapproved, setIsDisapproved] = useState(false);
  const [statusCode, setStatusCode] = useState('');
  const [approveDisapprove, setApproveDisapprove] = useState(false);
  const [submitManager, setSubmitManager] = useState(true)
  const [status, setStatus] = useState(0)
  const [reason, setReason] = useState('')
  const [popUp, setPopUp] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleOnClick = event => {
    if (role === 2 && isDisapproved) {
      setStatusCode('21')
    } else if (role === 2 && !isDisapproved) {
      setStatusCode('22')
    }
  }

  const fetchProjects = async() => {
    const { data } = await api.documents.byProject(props.match.params.id)
    const response = data.filter((data)=> data.categoryId === 2)
    const projects = await api.projects.lists(props.user.id)
    const project_data = projects.data.data
    const role_data = project_data.filter((data)=> parseInt(data.projectId) === props.match.params.id)
    const role_id = role_data[0].assign[0].roleId
    const status = role_data[0].projectStatus
    setStatus(status)
    setRole(role_id)

    if (response.length === 0) {
      setNumbers([1])
      setSubmitManager(false)
    } else {
      setNumbers(response)
      setSubmitManager(true)
    }

    approve_sponsor(data)
  }

  const approve_sponsor = (data) => {
    data.map((data) => {
    const i = data.docStatus
      
      if (i === 2 || i === 0) {
        setSubmitManager(false)
      }

    return data
    })
    
  }

  const decideEvent = async(statusProject) => {
    if(!isLoading){
      try{
        setIsLoading(true)
        const response = await api.projects.updateStatus(props.match.params.id,{
          projectId : props.match.params.id,
          userId : props.user.id,
          projectStatus : statusProject,
          comment: reason
        })
        if (response.status === 200) {
          props.history.goBack();
        } else {
          return alert('Failed to approve/disapprove project.');
        }
      } catch (err) {
        console.error(err,statusProject)
        return alert('Something went wrong with your connection/server.')
      }
    }
  }

  const hide_overlay = async(index) => {
    const new_numbers = numbers.filter((data)=> data.docId !== index)
    setNumbers(new_numbers)
    window.location.reload()
  }

  const disapprove_file = () => {
    setIsDisapproved(true)
  }

  const list = numbers.map((number, index) =>
       
      <ProjectManagementPlan 
          key={index} 
          index={index} 
          value={number} 
          role={role} 
          projectId={props.match.params.id} 
          hideOverlay={ (i) => hide_overlay(i)}
          disapprove_file={disapprove_file}
          set={setSubmitManager}
          status={status}/>
      
    );

  const onClick = () => {
      setNumbers([...numbers, numbers.length++]);
    }

  useEffect(() => {
    fetchProjects()
    setIsHidden(false)
    setHidden(false)
    setApproveDisapprove(false)
  },[])

  useEffect(() => {
    
  },[numbers])

  useEffect(() => {
    
    switch(role) {
      case 1:
        break
      case 2:
        setHidden(true)
        setIsHidden(true)
        if (status === 22 || status === 31) {
          setHidden(false)
          setIsHidden(false)
        }
        break
      case 3:
        break
      case 4:
        setIsHidden(false)
        setApproveDisapprove(true)
        if (status === 21 || status === 31 || status === 24) {
          setApproveDisapprove(false)
        }
        break
      case 5:
        setHidden(true)
        if (status === 22 || status === 31) {
          setHidden(false)
        }
        break
      default:
        break
    }
  },[role])

  useEffect(()=>{
    if (statusCode !== '' && statusCode !== '31' && statusCode !== '24') {
      decideEvent(statusCode)
    }
  },[statusCode])

  useEffect(()=>{
    if (role === 4 && isDisapproved) {
      handleOnClick()
     }
  }, [isDisapproved])

  const decide = (status) => {
    setPopUp(true)
    setStatusCode(status)
  }

  return(
    <ContentLayout>
      <TitleBar>{Title1}<DescTitle>{Desc}</DescTitle></TitleBar>
      {list}
      <div>
      <BtnAdd className="" hidden={!hidden} onClick={e => {
        onClick()
      }}>ADD NEW FILE</BtnAdd>
      </div>
      <ButtonLayout className="pt-3">
        {/*<Btn className="btn btn-warning" >CANCEL</Btn>
        <Btn className="btn btn-info" >SAVE DRAFT</Btn>*/}
        <Btn hidden={!isHidden} disabled={!submitManager} className="btn btn-success" onClick={handleOnClick}>SUBMIT</Btn>
        <BtnApproval hidden={!approveDisapprove} className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('24')}>
          <Label><IoIosClose className="mb-1" size={15}/>DISAPPROVE</Label>
        </BtnApproval>
        <BtnApproval hidden={!approveDisapprove} className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('31')}>
          <Label><IoIosCheckmark className="mb-1" size={15}/>APPROVE</Label>
        </BtnApproval>
      </ButtonLayout>
      <Modal isOpen={popUp} toggle={e => setPopUp(false)} className={``}>
        <ModalHeader toggle={e => setPopUp(false)}>Approval</ModalHeader>
        <ModalBody>
          <div>Are you sure to {status === '14' ? 'disapprove':'approve'} this project ?</div>
          <div>Reason:</div>
          <Input type="textarea" onChange={e => setReason(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={isLoading} onClick={e => decideEvent(statusCode)}>Yes</Button>
          <Button color="secondary" onClick={e => setPopUp(false)}>No</Button>
        </ModalFooter>
      </Modal>
    </ContentLayout>
  )

}

export default PlanningForm