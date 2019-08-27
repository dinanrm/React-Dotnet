import React, { useState, useEffect } from 'react'
import { ContentLayout, TitleBar, DescTitle, ButtonLayout, Btn, UploadLayout, BottomLayout, Label } from './style';
import ProjectOrganization from '../ProjectOrganization';
import InitiativeRegistrationRequest from '../InitiativeRegistrationRequest';
import ProjectCharter from '../ProjectCharter';  
import api from '../../utils/api';
import validate, {validateRole} from '../Validator/validator';
import UploadFilesInitial from '../UploadFilesInitial'

const CreateProject = (props) => {
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
  const [files, setFiles] = useState([]);
  const [dataForm, setDataForm] = useState(form);
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

  const getFullDate = (date) => {
    let year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    let month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    let day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    return `${year}-${month}-${day}`//date.toLocaleDateString('en-GB')
  }

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

  useEffect(() => { 
    fetchUsers();  
  },[])

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [errors, setErrors] = useState({});
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

  useEffect(() => {
    Object.keys(errors).length !== 0 && isSubmit && setErrors(validate(dataForm));
    Object.keys(errors).length !== 0 && isDraft && setErrors(validateRole(dataForm));
    Object.keys(errors).length !== 0 && setIsSubmitting(false)
    Object.keys(errors).length !== 0 && setIsSubmitting(false)
    Object.keys(errors).length === 0 && isSubmitting && submit(status); 

    return (() => setIsSubmitting(false))
  }, [dataForm, isDraft, isSubmit, isSubmitting, status])

  useEffect(()=>{
  },[files])

  const submit = async(status) => {
    setIsSending(true)
    const postform = {};
    Object.keys(dataForm)
    .filter(field => ["date","project_owner","project_sponsor","project_manager","project_team","project_officer"].indexOf(field) < 0 )
    .map((field) => {
      postform[field] = dataForm[field]
      return field;
    })
    postform['projectStatus'] = status;
    postform['preparedDate'] = getFullDate(dataForm.date) //dataForm.date;
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
    ];
    try{
      const response = await api.projects.save(postform)
      uploadFile(response.data.projectId)
    } catch (err){
      console.error(err);
    }
  }

  const uploadFile = (id) => {
    files.map(async(file) => {
      const formData = new FormData();
      formData.append("Files",file.file);
      formData.append("ProjectId",id);
      formData.append("CategoryId",1);
      formData.append("DocStatus",1);
      formData.append("Description",'');
      formData.append("docSize",file.file.size);
      formData.append("docType",file.file.type);
      

      const response = await api.documents.upload(formData);
      return response.status
    }); 
    setIsSending(false)
    setIsSubmitting(false);
    props.history.push('/project');
  }
  
  return(
    <ContentLayout>
      <TitleBar>{Title1}</TitleBar>
      <ProjectOrganization list={list} errors={errors} loading={loading} value={dataForm} set={(key,value) => handleChange(key,value)} {...props}/> 
      <TitleBar>{Title2}<DescTitle>{Desc}</DescTitle></TitleBar>
      <InitiativeRegistrationRequest list={list} errors={errors} loading={loading} value={dataForm} set={(key,value) => handleChange(key,value)} {...props}/> 
      <TitleBar>{Title3}<DescTitle>{Desc}</DescTitle></TitleBar>
      <ProjectCharter value={dataForm} errors={errors} set={(key,value) => handleChange(key,value)} {...props}/> 
      <BottomLayout>
        <UploadLayout>
          <Label>Attachment File:</Label>
          <UploadFilesInitial files={files} setFiles={e => setFiles(e)} />
        </UploadLayout>
        <ButtonLayout>
          <Btn className="btn btn-warning" onClick={e => props.history.goBack()}>CANCEL</Btn>
          <Btn className="btn btn-info" disabled={isSending} onClick={e => validationDraft('11')}>SAVE DRAFT</Btn>
          <Btn className="btn btn-success" disabled={isSending} onClick={e => validation('12')}>SUBMIT</Btn>
        </ButtonLayout>
      </BottomLayout>
    </ContentLayout>
  )
}

export default CreateProject