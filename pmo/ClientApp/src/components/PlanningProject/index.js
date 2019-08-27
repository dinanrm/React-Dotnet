import React, {Fragment,useState, useEffect} from 'react'
import { ContentLayout, TitleBar, Label, UploadLayout, MilestoneLayout, HistoryLayout, Error } from './style'
import { staticContent } from './option'
import UploadFilesEdit from '../UploadFilesEdit';
import Milestone from '../Milestones';
import History from '../History'
import TextEditor from '../TextEditor'
import Information from '../Tooltip'
import Decision from '../Decision'
import api from '../../utils/api';
import { getRole } from '../../utils/role'
import {validateRole, validatePlanning} from '../Validator/validator'

const PlanningProject = (props) => {
    const form = {
      projectManagementPlan : '',
      executiveSummaryOfProjectInitiative : '',
      assumption : '',
      changeControlManagement : '',
      scheduleAndTimeDescription : '',
      project_owner: null,
      project_sponsor: null,
      project_manager: null,
      project_team: [],
      project_officer: [],
      projectStatus: 21,
    }
    const [milestone,setMilestone] = useState([])
    const [historyOwner, setHistoryOwner] = useState([])
    const [historySponsor, setHistorySponsor] = useState([])
    const [dataForm,setDataForm] = useState(form)
    const [errors,setErrors] = useState({})
    const [reason,setReason] = useState('')
    const [role,setRole] = useState({
      isOwner: false,
      isSponsor: false,
      isManager: false,
      isTeam: false,
      isOfficer: false
    })
    const [files, setFiles] = useState({})

    const handleDataChange = (key,value) => {
        setDataForm({
            ...dataForm,
            [key]:value
        })
    }

    const handleFiles = (key,value) => {
      setFiles({
          ...files,
          [key]:value
      })
    }
    
    const handleChangeMilestone = (input,completeDate,endDate) => {
      setMilestone([
        ...milestone,
        {
          milestoneDescription: input,
          completedTime: completeDate,
          estimatedEndTime: endDate
        }
      ])
    }

    const removeMilestone = (key) => {
      setMilestone(
        milestone.filter((_, i) => i !== key)
      )
    }
    
    useEffect(()=>{},[milestone])

    const [isFetched,setIsFetched] = useState(true)

    const fetchProjects = async() => {
      setIsFetched(true)
      const {data} = await api.projects.planning(props.match.params.id)
      const response = data
      Object.keys(response).filter(field => [
        'projectModifiedDate','projectCreatedDate','document','assign'
      ].indexOf(field) < 0).map((field) =>
        dataForm[field] = response[field] || ''
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
      });

      setRole(getRole(props.user.id,dataForm))
      setIsFetched(false)
    }

    const fetchMilestones = async() => {
      const {data} = await api.milestones.byProject(props.match.params.id)
      setMilestone(data)
    }

    const fetchHistory = async() => {
      const history_owner = await api.histories.byRole(props.match.params.id, 1)
      const history_sponsor = await api.histories.byRole(props.match.params.id, 4)
      setHistoryOwner(history_owner.data.history)
      setHistorySponsor(history_sponsor.data.history)
    }

    useEffect(() => {
      fetchMilestones();
      fetchProjects();
      fetchHistory();
      return (()=> setIsFetched(false))
    }, [])

    useEffect(() => {}, [role])

    const isEditable = (dataForm.projectStatus === 21 || dataForm.projectStatus === 24 ) && (role.isManager || role.isTeam)

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isDraft, setIsDraft] = useState(false);
    const [isSending, setIsSending] = useState(false);
    const [status, setStatus] = useState('');
    const validation = (state) => {
      setErrors(validatePlanning(dataForm,files,milestone));
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

    useEffect(() => {
      Object.keys(errors).length !== 0 && isSubmit && setErrors(validatePlanning(dataForm,files,milestone));
      Object.keys(errors).length !== 0 && isDraft && setErrors(validateRole(dataForm));
      Object.keys(errors).length !== 0 && setIsSubmitting(false)
      Object.keys(errors).length === 0 && isSubmitting && submit(status); 

      return (() => setIsSubmitting(false))
    }, [dataForm, milestone, files, isDraft, isSubmit, isSubmitting, status])

    const submit = async(status) => {
      setIsSending(true)
      setIsSubmitting(false);
      setErrors(validateRole(dataForm))
      const postform = {};
      Object.keys(dataForm)
      .filter(field => ["project_owner","project_sponsor","project_manager","project_team","project_officer"].indexOf(field) < 0 )
      .map((field) => {
        postform[field] = dataForm[field]
        return field;
      })
      postform['projectStatus'] = status;
      postform['userId'] = props.user.id;
      postform['reason'] = reason
      try{
        const response = await api.projects.update(props.match.params.id,postform)
        milestone.map(async(item) => {
          if(!item.projectId){
            item['projectId'] = props.match.params.id
            item['projectCategoryId'] = 2
            await api.milestones.save(item)
          }
        })
        setIsSending(false)
        response.status >= 200 && response.status < 300 && props.history.goBack()
      } catch (err){
        console.error(err);
      }
    }

  return (
    <ContentLayout>
      {staticContent.map(({title,input}, key) =>{
        return (
        <div className="form-group" key={key}>
          <TitleBar>{title}</TitleBar>
          {input.map((component,key)=>{
            return (
              <Fragment key={key}>
                {
                  component.type === 'text' && !isFetched && 
                      <TextEditor 
                      label={component.label} 
                      disabled={!isEditable} 
                      componentId={component.id}
                      tooltip={component.tooltip}
                      errors={errors[component.parameter]} 
                      data={dataForm[component.parameter]} 
                      set={e => handleDataChange(component.parameter,e)}/>
                    
                }
                {
                  (component.type === 'file' && 
                  <UploadLayout>
                      <Label>{component.label}</Label>
                      <Information key={key} componentId={`Tooltip-${component.id}`} message={component.tooltip}/>
                      <UploadFilesEdit projId={props.match.params.id} 
                        isOfficer={role.isOfficer} 
                        isEditable={isEditable}
                        label={component.label}
                        componentId={component.id}
                        set={(key,value) => handleFiles(key,value)} 
                        maxFiles={3}
                        required={component.required}
                        categoryId={component.categoryId} />
                  </UploadLayout>
                  )  
                }
                {
                  (component.type === 'milestone' && !isFetched && 
                    <MilestoneLayout>
                      <Label>{component.label}</Label>
                      <Information key={key} componentId={`Tooltip-${component.id}`} message={component.tooltip}/>
                      <Milestone isEditable={isEditable} canDelete projectCategoryId={2} item={milestone} remove={(index)=>removeMilestone(index)} set={(input,start,end) => handleChangeMilestone(input,start,end)}/>
                    </MilestoneLayout>
                  )
                }
                {
                  ((component.type === 'milestone' || component.type === 'file') && <Error>{errors[component.id]}</Error> )
                }
              </Fragment>
            )
          })}
        </div>
        ) 
      })}
      <Decision 
        page={2}
        role={role}
        isEditable={isEditable}
        isSending={isSending}
        errors={isSubmit ? validatePlanning(dataForm,files,milestone):validateRole(dataForm)}
        setErrors={setErrors}
        isSubmit={isSending}
        setIsSubmit={setIsSending}
        setReason={setReason}
        validation={e => validation(e)}
        validationDraft={e => {validationDraft(e)}}
        projectStatus={dataForm.projectStatus}
        {...props}
      />
      {/* <BottomLayout>
      {isEditable &&
        <ButtonLayout>
          <Btn className="btn btn-warning" onClick={e => props.history.goBack()}>CANCEL</Btn>
          <Btn className="btn btn-info" disabled={isSending} onClick={e => validationDraft(dataForm.projectStatus === 24? '24':'21')}>SAVE DRAFT</Btn>
          {role.isManager && <Btn className="btn btn-success" disabled={isSending} onClick={e => validation('22')}>SUBMIT</Btn>}
        </ButtonLayout>
      }
      {(dataForm.projectStatus === 22 && role.isOwner) && 
        <ButtonLayout className="justify-content-center">
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('52')}>
            <LabelBtn><IoIosClose className="mb-1" size={40}/>DISSAPROVE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('24') }>
            <LabelBtn><IoIosReturnLeft className="mb-1 p-2" size={40}/>REQUEST TO REVISE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('23') }>
            <LabelBtn><IoIosCheckmark className="mb-1" size={40}/>ACKNOWLEDGE</LabelBtn>
          </BtnApproval>
        </ButtonLayout>
      }
      {(dataForm.projectStatus === 23 && role.isSponsor) && 
        <ButtonLayout className="justify-content-center">
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('52')}>
            <LabelBtn><IoIosClose className="mb-1" size={40}/>DISSAPROVE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('24') }>
            <LabelBtn><IoIosReturnLeft className="mb-1 p-2" size={40}/>REQUEST TO REVISE</LabelBtn>
          </BtnApproval>
          <BtnApproval className="btn btn-lg mx-3 mb-3 pr-4" onClick={e => decide('31') }>
            <LabelBtn><IoIosCheckmark className="mb-1" size={40}/>ACKNOWLEDGE</LabelBtn>
          </BtnApproval>
        </ButtonLayout>
      }
      </BottomLayout> */}

      <Label className="pb-3"><u>Operation List / History Log</u></Label>
      <HistoryLayout className="pb-2">
        <p><b>Project Owner</b></p>
        <History item={historyOwner} role_param={1}/>
      </HistoryLayout>
      <HistoryLayout className="pb-2">
        <p><b>Project Sponsor</b></p>
        <History item={historySponsor} role_param={4}/>
      </HistoryLayout>
      {/* <Modal isOpen={popUp} toggle={e => setPopUp(false)} className={``}>
        <ModalHeader toggle={e => setPopUp(false)}>Project Planing</ModalHeader>
        <ModalBody>
          <div>Are you sure to {status === '24' ? 'request to revise':status === '52'? 'dissaprove':'acknowledge'} this plan ?</div>
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

export default PlanningProject
