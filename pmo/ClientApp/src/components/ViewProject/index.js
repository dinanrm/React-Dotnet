import React, { useState, useEffect } from 'react'
import { ContentLayout, TitleBar, DescTitle, UploadLayout, Label } from './style';
import ProjectOrganization from '../ProjectOrganization';
import InitiativeRegistrationRequest from '../InitiativeRegistrationRequest';
import ProjectCharter from '../ProjectCharter';
import { Alert } from 'reactstrap'  
import api from '../../utils/api';
import { getRole } from '../../utils/role'
import validate, {validateRole} from '../Validator/validator';
import UploadFilesEdit from '../UploadFilesEdit';
import Decision from '../Decision';

const ViewProject = (props) => {
  const [Title1] = useState("PROJECT TEAM SETTING / PROJECT ORGANIZATION"); 
  const [Title2] = useState("Initiative Registration Request ");
  const [Title3] = useState("Project Charter "); 
  const [Desc] = useState("(complete each section as throughly as possible)")
  const form = {
    initiativeTitle: '',
    projectStatus: null,
    date: new Date(),
    project_owner: null,
    project_sponsor: null,
    project_manager: null,
    project_team: [],
    project_officer: [],
    backgroundInformation: '',
    objectiveBenefit: '',
    landCompensation: 0,
    landImprovement: 0,
    building: 0,
    infrastructure: 0,
    plantMachine: 0,
    equipment: 0,
    expenseUnderDevelopment: 0,
    workingCapital: 0,
    contingency: 0,
    total: 0,
    timeline: '',
    requestedBy: null,
    acknowledgedBy: null,
    agreedBy: null,
    executiveSummary: '',
    projectDefinition: '',
    vision: '',
    objective: ''
  }
  const [role,setRole] = useState({
    isOwner: false,
    isSponsor: false,
    isManager: false,
    isTeam: false,
    isOfficer: false
  })

  const [dataForm, setDataForm] = useState(form);
  const [showAlert,setShow] = useState(false)
  const handleChange = (key,value) => {
    setDataForm({
      ...dataForm,
      [key] : value
    });
  }

  const [list, setList] = useState([{
    key: '',
    text: '',
    value: '',
  }]);

  const [loading, setLoading] = useState(false)

  const fetchUsers = async() => {
    setLoading(true);
    const { data } = await api.users.list()
    const responses = data.map(d => ({
      key: d.userId,
      text: d.userName,
      value: d.userId,
    }))
    
    setList(responses);
    setLoading(false);
  }

  const [isFetched,setIsFetched] = useState(false)
  const fetchProjects = async(id) => {
    setIsFetched(true)
    try {
      const { data } = await api.projects.initiating(id)
      const response = data
      Object.keys(response).filter(field => [
        'lessonLearned','projectCreatedDate','projectModifiedDate','preparedDate','assign'
      ].indexOf(field) < 0).map((field) =>
      dataForm[field] = response[field]
      );
      
      const project_team = [];
      const project_officer = [];
      response.assign.map(el => {
        (el.roleId === 1 && Object.assign(dataForm,{'project_owner':el.userId}));
        (el.roleId === 2 && Object.assign(dataForm,{'project_manager':el.userId}));
        (el.roleId === 4 && Object.assign(dataForm,{'project_sponsor':el.userId}));
        if (el.roleId === 3){
          project_officer.push(el.userId);
          Object.assign(dataForm,{'project_officer':project_officer});
        }
        if (el.roleId === 5){
          project_team.push(el.userId);
          Object.assign(dataForm,{'project_team':project_team});
        }
        return el;
      })
      handleChange('date',new Date(response.preparedDate))
      // const user = parseInt(props.user.id)
      setRole(getRole(props.user.id,dataForm))
    
    } catch (error) {
      (!('response' in error) && setDataForm(form))
      console.error(error);
    }
    setIsFetched(false)
  }

  useEffect(() => {
  }, [role])

  useEffect(() => { 
    fetchUsers();
    fetchProjects(props.match.params.id);
  },[])

  const isEditable = (dataForm.projectStatus === 11 || dataForm.projectStatus === 14 ) && (role.isManager || role.isTeam)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
  const [reason,setReason] = useState('')
  const [status, setStatus] = useState('')
  const validation = (state) => {
    setErrors(validate(dataForm));
    setStatus(state);
    setIsSubmit(true)
    setIsDraft(false);
    setIsSubmitting(true);
  }

  const validationDraft = async (state) => {
    setErrors(validateRole(dataForm));
    setStatus(state);
    setIsDraft(true);
    setIsSubmit(false);
    setIsSubmitting(true);
  }
  
  const getFullDate = (date) => {
    let year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    let month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    let day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    return `${year}-${month}-${day}`//date.toLocaleDateString('en-GB')
  }

  useEffect(() => {
    Object.keys(errors).length !== 0 && isSubmit && setErrors(validate(dataForm));
    Object.keys(errors).length !== 0 && isDraft && setErrors(validateRole(dataForm));
    Object.keys(errors).length !== 0 && setIsSubmitting(false)
    Object.keys(errors).length !== 0 && setIsSubmitting(false)
    Object.keys(errors).length === 0 && isSubmitting && submit(status); 

    return (() => setIsSubmitting(false))
  }, [dataForm, isDraft, isSubmit, isSubmitting, status])

  const submit = async(status) => {
    setIsSending(true)
    setIsSubmitting(false);
    setErrors(validateRole(dataForm))
    const postform = {};
    Object.keys(dataForm)
    .filter(field => ["date","project_owner","project_sponsor","project_manager","project_team","project_officer","history"].indexOf(field) < 0 )
    .map((field) => {
      postform[field] = dataForm[field]
      return field;
    })
    postform['projectStatus'] = status;
    postform['reason'] = reason;
    postform['preparedDate'] = getFullDate(dataForm.date);  //dataForm.date;
    postform['users'] = [
      {
        roleId: 1,
        userId: [dataForm.project_owner]
      },{
        roleId: 2,
        userId: [dataForm.project_manager]
      },{
        roleId: 3,
        userId: dataForm.project_officer
      },{
        roleId: 4,
        userId: [dataForm.project_sponsor]
      },{
        roleId: 5,
        userId: dataForm.project_team
      },
    ]
    try{
      const response = await api.projects.update(props.match.params.id,postform)
      response.status === 200 && setShow(true);
      setIsSending(false)
      props.history.goBack()
    } catch (err){
      console.error(err);
    }
  }

  // const [popUp, setPopUp] = useState(false)
  // const [reason, setReason] = useState('')
  // const decideEvent = async(statusCode) => {
  //   if(!isLoading){
  //     try{
  //       setIsLoading(true)
  //       const response = await api.projects.updateStatus(props.match.params.id,{
  //         projectId : props.match.params.id,
  //         userId : props.user.id,
  //         projectStatus : statusCode,
  //         comment: reason,
  //       })
  //       response.status === 201 && setShow(true);
  //       response.status === 200 && props.history.goBack();
  //       response.data && setIsLoading(false)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }
  // }

  // const decide = (status) => {
  //   setPopUp(true)
  //   setStatus(status)
  // }

  return(
    <ContentLayout>
      <Alert color="success" isOpen={showAlert} toggle={(e) => setShow(false)}>
        Data Saved in Database!
      </Alert>
      <TitleBar>{Title1}</TitleBar>
      {!isFetched && <ProjectOrganization list={list}  errors={errors} disable={!isEditable} loading={loading} value={dataForm} set={(key,value) => handleChange(key,value)} {...props}/> }
      <TitleBar>{Title2}<DescTitle>{Desc}</DescTitle></TitleBar>
      {!isFetched && <InitiativeRegistrationRequest  errors={errors} disable={!isEditable} list={list} loading={loading} value={dataForm} set={(key,value) => handleChange(key,value)} {...props}/> }
      <TitleBar>{Title3}<DescTitle>{Desc}</DescTitle></TitleBar>
      {!isFetched && <ProjectCharter  errors={errors} value={dataForm} disable={!isEditable} set={(key,value) => handleChange(key,value)} {...props}/> }
      {/* <BottomLayout> */}
      <Decision
        page={1}
        role={role}
        isEditable={isEditable}
        isSending={isSending}
        errors={validateRole(dataForm)}
        setErrors={setErrors}
        isSubmit={isSending}
        setIsSubmit={setIsSending}
        setReason={e => setReason(e)}
        validation={e => validation(e)}
        validationDraft={e => {validationDraft(e)}}
        projectStatus={dataForm.projectStatus}
        {...props}
      >
        <UploadLayout>
          <Label>Attachment File:</Label>
          <UploadFilesEdit 
            projId={props.match.params.id} 
            isOfficer={role.isOfficer} 
            categoryId={1} maxFiles={5} 
            isEditable={isEditable}/>
        </UploadLayout>
      </Decision>
      {/* {(dataForm.projectStatus === 11 || dataForm.projectStatus === 14 ) && (isManager || isTeam) &&
        <ButtonLayout>
          <Btn className="btn btn-warning" onClick={e => props.history.goBack()}>CANCEL</Btn>
          <Btn className="btn btn-info" disabled={isSending} onClick={e => validationDraft('11')}>SAVE DRAFT</Btn>
          <Btn className="btn btn-success" disabled={isSending} onClick={e => validation('12')}>SUBMIT</Btn>
        </ButtonLayout>
      }
      {(dataForm.projectStatus === 12 && isOwner) && 
        <ButtonLayout className="justify-content-center">
          <BtnDecline className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('14')}>
            <LabelButton><IoIosClose className="mb-1" size={40}/>DISAPPROVE</LabelButton>
          </BtnDecline>
          <BtnApprove className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('13') }>
            <LabelButton><IoIosCheckmark className="mb-1" size={40}/>APPROVE</LabelButton>
          </BtnApprove>
        </ButtonLayout>
      }
      {(dataForm.projectStatus === 13 && isSponsor) && 
        <ButtonLayout className="justify-content-center">
          <BtnDecline className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('14')}>
            <LabelButton><IoIosClose className="mb-1" size={40}/>DISAPPROVE</LabelButton>
          </BtnDecline>
          <BtnApprove className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('21') }>
            <LabelButton><IoIosCheckmark className="mb-1" size={40}/>APPROVE</LabelButton>
          </BtnApprove>
        </ButtonLayout>
      }
      </BottomLayout>
      <Modal isOpen={popUp} toggle={e => setPopUp(false)} className={``}>
        <ModalHeader toggle={e => setPopUp(false)}>Approval</ModalHeader>
        <ModalBody>
          <div>Are you sure to {status === '14' ? 'disapprove':'approve'} this project ?</div>
          <div>Reason:</div>
          <Input type="textarea" onChange={e => setReason(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" disabled={isLoading} onClick={e => decideEvent(status)}>Yes</Button>
          <Button color="secondary" onClick={e => setPopUp(false)}>No</Button>
        </ModalFooter>
      </Modal> */}
    </ContentLayout>
  )
}

export default ViewProject