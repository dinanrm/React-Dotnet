import React, {useState,useEffect} from 'react'
import { ContentLayout, TitleBar, Layout, Label , Error} from './style';
import { Col, Row, Input } from 'reactstrap'
import { CustomDatePicker } from '../DatePicker';
import TextEditor from '../TextEditor'
import Milestone from '../Milestones';
import BestPractice from '../LL&BP';
import Decision from '../Decision'
import { getRole } from '../../utils/role'
import api from '../../utils/api'
import UploadFilesEdit from '../UploadFilesEdit';
import {validateClosing} from '../Validator/validator'
import ProjectCompletion from '../ProjectCompletionAcceptance'
import Information from '../Tooltip'


const ClosingProject = (props) => {

  const title = "Project Final Report"
  const form = {
    projectId: props.match.params.id,
    preparedDate: new Date(),
    scopeStatement: '',
    projectDescription: '',
  }
  const [dataForm,setDataForm] = useState(form)
  const formHist = {
    manager : {
      comment : '',
      historyModifiedDate : '',
    },
    owner : {
      comment : '',
      historyModifiedDate : '',
    },
    sponsor : {
      comment : '',
      historyModifiedDate : '',
    }
  }
  const [role,setRole] = useState({
    isOwner: false,
    isSponsor: false,
    isManager: false,
    isTeam: false,
    isOfficer: false
  })
  const [isFetched,setIsFetched] = useState(false)
  const [milestone,setMilestone] = useState([])
  const [lessonLearned,setLessonLearned] = useState([])
  const [errors,setErrors] = useState({})
  const [isSubmit,setIsSubmit] = useState(false)
  const [reason,setReason] = useState('')
  
  const handleChangeData = (key,value) => {
      setDataForm({
        ...dataForm,
        [key]:value
      })
    }
    
  const addMilestone = (input,completedDate,endDate) => {
      setMilestone([
        ...milestone,
        {
          milestoneDescription: input,
          completedTime: completedDate,
          estimatedEndTime: endDate
        }
      ])
    }

  const addLL = (description,recommendation) => {
    setLessonLearned([
      ...lessonLearned,
      {
        lessonLearnedText: description,
        recommendation: recommendation
      }
    ])
  }
  const [projectCompletion] = useState(formHist)

  const editMilestone = async(key,id,input,completedDate,endDate) => {
    let newMilestone = {
      ...id && {milestoneId: id},
      projectId: props.match.params.id,
      projectCategoryId: 4,
      milestoneDescription: input,
      completedTime: completedDate,
      estimatedEndTime: endDate
    }

    if(!id){
      milestone[key] = newMilestone
    }else{
      const {data} = await api.milestones.update(id,newMilestone) 
      data && fetchProjects()
    }
  }

  const removeMilestone = (key) => {
    setMilestone(
      milestone.filter((_, i) => i !== key)
    )
  }

  const removeLL = (key) => {
    setLessonLearned(
      lessonLearned.filter((_, i) => i !== key)
    )
  }

  const fetchProjects = async() => {
    setIsFetched(true)
      try {
        const { data } = await api.projects.closing(props.match.params.id)
        Object.keys(data).filter(field => [
          'projectCreatedDate','projectModifiedDate','assign', 'milestone', 'scopeStatement','projectDescription','lessonLearned' ,'history', 'preparedDate'
        ].indexOf(field) < 0).map((field) =>
          dataForm[field] = data[field]
        );
        data.scopeStatement && Object.assign(dataForm,{'scopeStatement':data.scopeStatement})
        data.projectDescription && Object.assign(dataForm,{'projectDescription':data.projectDescription})
        const project_team = [];
        const project_officer = [];
        data.assign.map(el => {
          (el.roleId === 1 && Object.assign(dataForm,{'project_owner':el.roleId}) && Object.assign(dataForm,{'owner_name':el.userName}) && Object.assign(dataForm,{'userId_owner':el.userId}));
          (el.roleId === 2 && Object.assign(dataForm,{'project_manager':el.roleId}) && Object.assign(dataForm,{'manager_name':el.userName}) && Object.assign(dataForm,{'userId_manager':el.userId}));
          (el.roleId === 4 && Object.assign(dataForm,{'project_sponsor':el.roleId}) && Object.assign(dataForm,{'sponsor_name':el.userName}) && Object.assign(dataForm,{'userId_sponsor':el.userId}));
          if (el.roleId === 3){
            project_officer.push(el.roleId);
            Object.assign(dataForm,{'project_officer':project_officer});
          }
          if (el.roleId === 5){
            project_team.push(el.roleId);
            Object.assign(dataForm,{'project_team':project_team});
          }
          return el;
        })

        data.history.map(hist => {
          (hist.userId === dataForm.userId_owner && Object.assign(projectCompletion,{'owner':hist, 'owner_name':dataForm.owner_name}));
          (hist.userId === dataForm.userId_sponsor && Object.assign(projectCompletion,{'sponsor':hist, 'sponsor_name':dataForm.sponsor_name}));
          (hist.userId === dataForm.userId_manager && Object.assign(projectCompletion,{'manager':hist, 'manager_name':dataForm.manager_name}));
          
          return hist;
        })

        setMilestone(data.milestone)
        setLessonLearned(data.lessonLearned)
        setRole(getRole(props.user.id,dataForm))
      } catch (error) {
        setIsFetched(false)
        console.log(error);
      }
      setIsFetched(false)
  }

  useEffect(() => {
    isSubmit && setErrors(validateClosing(dataForm,milestone,lessonLearned))
  }, [role,dataForm,lessonLearned,milestone])

  useEffect(() => { 
    fetchProjects(props.match.params.id);
  },[])

  const decideEvent = (statusCode) => {
    setIsSubmit(true)
    setReason(reason)
    setErrors(validateClosing(dataForm,milestone,lessonLearned))
    let noErrors = Object.keys(validateClosing(dataForm,milestone,lessonLearned)).length === 0 
    noErrors && submit(statusCode)
  }

  const submit = async(statusCode) => {
    const form = {}
    Object.keys(dataForm).filter(field =>[
      'document','project_created_by','project_manager','project_officer','project_owner','project_sponsor','project_team'
    ].indexOf(field) < 0).map((field) =>
      form[field] = dataForm[field]
    )
    form.comment = reason
    form.projectStatus = statusCode
    form.userId = localStorage.getItem('id')
    const milestoneForm = milestone.filter(item => !item.milestoneId) 
    form.milestone = milestoneForm
    const lessonLearnedForm = lessonLearned.filter(item => !item.lessonLearnedId)
    form.lessonLearned = lessonLearnedForm
    try {
      const {data} = await api.projects.update(props.match.params.id,form)
      data && console.log('success',data)
      setIsSubmit(false)
      data && props.history.goBack()
    } catch (error) {
      
    }
  }

  const isEditable = (dataForm.projectStatus === 41 || dataForm.projectStatus === 44 ) && (role.isManager || role.isTeam)

    return (
        <ContentLayout>
          <TitleBar>{title}</TitleBar>
            <Row className="mb-3 mt-2">
              <Col md="9">
                <Label>Project Title</Label>
                <Input defaultValue={dataForm.initiativeTitle || ''} readOnly/>
              </Col>
              <Col md="3">
                <Label>Date Prepared</Label>
                <CustomDatePicker errors={errors.preparedDate} value={new Date(dataForm.preparedDate)} disabledInput disabledButton={!isEditable} onSelectDate={e => handleChangeData('preparedDate',e)}/>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md="3">
                <Label>Created By</Label>
                <Input defaultValue={dataForm.manager_name || ''} readOnly/>
              </Col>
            </Row>
            { !isFetched && <TextEditor 
              label={"Project Description"} 
              disabled={!isEditable}  
              componentId={"projectDescription"}
              tooltip={"Insert the basic description of the project – often from the initial charter document."}
              data={dataForm.projectDescription} 
              errors={errors.projectDescription}
              set={e => handleChangeData('projectDescription', e)}/>}
            { !isFetched && <TextEditor 
              label={"Scope Statement"} 
              disabled={!isEditable} 
              componentId={"scopeStatement"}
              tooltip={"Insert the basic description of the project – often from the initial charter document."}
              data={dataForm.scopeStatement} 
              errors={errors.scopeStatement}
              set={e => handleChangeData('scopeStatement', e)}/>}
            <Layout className="mt-3 mb-3">
              <Label>{"Milestone"}</Label>
              {/* <Information componentId={""} message={"this is tooltip"}/> */}
              <Milestone 
                isEditable={isEditable} 
                item={milestone} 
                canDelete={isEditable}
                canEdit={isEditable} 
                projectCategoryId={4}
                remove={(index)=>removeMilestone(index)} 
                edit={(key,id,input,start,end) => editMilestone(key,id,input,start,end)} 
                set={(input,start,end) => addMilestone(input,start,end)}/>
              <Error>{errors.milestone}</Error>
            </Layout>
            <Layout className="mb-3">
              <Label>{"Lessons Learned & Best Practice"}</Label>
              <Information componentId={"lessonLearned"} message={"List and describe any lessons learned from this project and provide recommendations that can be used to improve the delivery of future information systems projects."}/>
              <BestPractice 
              isEditable={isEditable} 
              item={lessonLearned} 
              remove={(index) => removeLL(index)} 
              set={(des,rec) => addLL(des,rec)}/>
              <Error>{errors.lessonLearned}</Error>
            </Layout>
            <Layout className="mb-3">
              <Label>{"Attach Support Document"}</Label>
              <UploadFilesEdit 
              projId={props.match.params.id} 
              isOfficer={role.isOfficer} 
              categoryId={41} maxFiles={3} 
              isEditable={role.isManager || role.isTeam}
              />
            </Layout>
            <Decision
              page={4}
              role={role}
              isEditable={isEditable}
              errors={validateClosing(dataForm,milestone,lessonLearned)}
              setErrors={setErrors}
              isSubmit={isSubmit}
              setIsSubmit={setIsSubmit}
              setReason={setReason}
              validation={(data,reason) => decideEvent('42',reason)}
              validationDraft={e => decideEvent(dataForm.projectStatus)}
              projectStatus={dataForm.projectStatus}
              {...props}
            />
            <Layout className="mt-5">
              <Label>{"Project Completion Acceptence"}</Label>
              {/* <Information componentId={"ta"} message={"this is tooltip"}/> */}
              <ProjectCompletion item={projectCompletion}/>
            </Layout>
        </ContentLayout>
    )
}

export default ClosingProject
