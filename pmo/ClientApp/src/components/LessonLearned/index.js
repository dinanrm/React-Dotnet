import React, { useState, useEffect } from 'react'
import { ContentLayout, TitleBar, TableLayout, BottomLayout, UploadLayout, ButtonLayout, Btn, FooterTable, AddFormLayout } from './style';
import { CustomDropdown } from '../Dropdown';
import InputForm from '../InputForm';
import TextEditor from '../TextEditor';
import api from '../../utils/api'
import UploadFilesInitial from '../UploadFilesInitial'
import CustomTable from '../Table'
import PopUp from '../PopUp';
import { Spinner, Input } from 'reactstrap'
import { column } from './column'
import {validateLessonLearned} from '../Validator/validator'

const LessonLearned = (props) => {
  
  const Title = "Lesson Learned"
  const Label_Project = "Project Title : " 
  const Label_Title = "Lesson Learned Title : " 
  const Label_Step = "Select step : " 
  const Label_Category = "Select category : " 
  const Label_Impact = "Impact : "
  const Label_Result = "Problem/Success : "
  const Label_Recommendation = "Recommendation : " 
  const Label_List = "LESSON LEARNED" 

  let form = {
    LLCategoryId: null,
    UserId: parseInt(localStorage.getItem('id')),
    ProjectId: parseInt(props.match.params.id),
    projectCategoryId: null,
    initiativeTitle: '',
    title: '',
    Impact: '',
    LessonLearnedText: '',
    Recommendation: '',
  }
  const [steps,setSteps] = useState([])
  const [dataForm,setData] = useState(form)
  const [files, setFiles] = useState([]);
  const [errors,setErrors] = useState({});
  const [dataListLL,setDataListLL] = useState([])
  const [categories,setCategories] = useState([]);
  const [fetching,setisFetching] = useState(false)
  const [loading,setisLoading] = useState(false)
  const [isSubmit,setIsSubmit] = useState(false)
  const [showAdd,setShowAdd] = useState(false)
  const [showPopUp,setShow] = useState(false)
  const [LLId, setLLId] = useState()
	const handleDataChange = (property,newData) => {
		setData({
			...dataForm,
			[property] : newData
		})
  }

  const col = [
    {
      columns: [
        ...column,
        {
          Header: "",
          style: {
            textAlign: 'center',
            margin: 'auto'
          },
          sortable: false,
          Cell: p => parseInt(localStorage.getItem('id')) === p.original.user.userId && <button className='btn text-danger'onClick={e=>{
            e.preventDefault()
            setLLId(p.original.lessonLearnedId)
            setShow(true)
          }}>X</button>,
          minWidth: 50
        }
      ],
    },
  ]

  const fetchCategories = async() => {
    setisFetching(true);
    const {data} = await api.LessonLearnedCategories.list()
    const responses = data.map(d => ({
      key: d.llCategoryId,
      text: d.llCategoryName,
      value: d.llCategoryId,
    }))
    
    setCategories(responses);
    setisFetching(false);
  }
  
  const fetchStep = async() => {
    setisFetching(true);
    const {data} = await api.ProjectCategories.list()
    const responses = data.map(d => ({
      key: d.projectCategoryId,
      text: d.projectCategoryName,
      value: d.projectCategoryId,
    }))
    
    setSteps(responses);
    setisFetching(false);
  }

  const fetchLL = async() => {
    setisLoading(true);
    const {data} = await api.LessonLearned.byProject(props.match.params.id)
    setDataListLL(data);
    setData(form)
    setisLoading(false);
  }

  const smoothScroll = (h) => {
    let i = h || 0;
    if (i < 720) {
      setTimeout(() => {
        window.scrollTo(0, i);
        smoothScroll(i + 50);
      }, 10);
    }
  }

  const directTo = (id) => {
    const projectId = props.match.params.id
    const LLId = id
    props.history.push(`/project/${projectId}/lesson-learned/${LLId}`)
  }
  
  const addLL = async() => {
    setisLoading(true);
    setIsSubmit(true);
    setErrors(validateLessonLearned(dataForm))
    let errors = validateLessonLearned(dataForm)
    const {data} = Object.keys(errors).length === 0 && await api.LessonLearned.save(dataForm);
    const upload = data && uploadFile(data.lessonLearnedId);
    data && upload && setIsSubmit(false)
    data && upload && setData(form)
    data && upload && setErrors({})
    data && upload && setFiles([])
    data && upload && setShowAdd(false)
    data && upload && fetchLL();
    setisLoading(false);
  }

  const removeLL = async(id) => {
    const {data} = await api.LessonLearned.delete(id)
    data && fetchLL()
    data && setShow(false)
  }
  
  // const editLL = (id) => {

  // }

  const uploadFile = (id) => {
    var respon = false
    files.map(async(file) => {
      const formData = new FormData();
      formData.append("Files",file.file);
      formData.append("ProjectId",props.match.params.id);
      formData.append("lessonLearnedId",id);
      formData.append("CategoryId",60);
      formData.append("docSize",file.file.size);
      formData.append("docType",file.file.type);
      
      await api.documents.upload(formData);
    });
    respon = true

    return respon
  }

  useEffect(() => {
    fetchCategories()
    fetchStep()
    fetchLL()
  }, [])

  useEffect(() => {},[files,dataListLL])
  useEffect(()=>{
    isSubmit && setErrors(validateLessonLearned(dataForm))
  },[dataForm])
  useEffect(()=>{
    !isSubmit && setData(form)
  },[isSubmit])

	return(
		<ContentLayout>
      <TitleBar>{Title}</TitleBar>
      <TableLayout>
        <CustomTable
          loading={loading}
          column={col}
          filter="ll"
          label={Label_List}
          data={dataListLL}
          onClickRow={e => directTo(e)}
          onDeleteRow={e => removeLL(e)}
          isDeleteAble={true}
          id={'lessonLearnedId'}
          {...props}
        />
      </TableLayout>
      <FooterTable>
        <Btn className={`btn btn-primary ${showAdd && 'active'}`} disabled={showAdd} onClick={
          async(e)=>{
            e.preventDefault();
            await setShowAdd(true);
            smoothScroll()}
          }>ADD</Btn>
      </FooterTable>
      <PopUp show={showPopUp} setShow={setShow} title="Lesson Learned" eventAccept={el => removeLL(LLId)}>
        {`Are you sure to delete this lesson learned ?`} 
      </PopUp>
      { showAdd && 
        <AddFormLayout>
          <InputForm classNameLabel="col-sm-2" classNameComponent="col-sm-10" position="inline" label={Label_Project}>
            <Input value={props.location.state.initiativeTitle || ''} disabled/>
          </InputForm>
          <InputForm classNameLabel="col-sm-2" classNameComponent="col-sm-10" position="inline" label={Label_Title} error={errors.title}>
            <Input type="text" maxLength={10} value={dataForm.title || ''} placeholder={'Input Lesson Learned Title'} onChange={e => handleDataChange('title',e.target.value)}/>
          </InputForm>
          <InputForm classNameLabel="col-sm-2" classNameComponent="col-sm-10" position="inline" label={Label_Step} error={errors.projectCategoryId}>
            <CustomDropdown
              data={steps}
              placeholder="Select Step"
              value={dataForm.projectCategoryId} 
              error={errors.projectCategoryId}
              onChange={e => handleDataChange("projectCategoryId",e)}
              />
          </InputForm>
          <InputForm classNameLabel="col-sm-2" classNameComponent="col-sm-10" position="inline" label={Label_Category} error={errors.LLCategoryId}>
            <CustomDropdown
              data={categories}  
              error={errors.LLCategoryId}
              placeholder="Select Category"
              loading={fetching}
              value={dataForm.LLCategoryId} 
              onChange={e => handleDataChange("LLCategoryId",e)}
              />
          </InputForm>
          <TextEditor 
          label={Label_Impact}
          data={dataForm.Impact}
          errors={errors.Impact}
          set={e => handleDataChange('Impact',e)}/>
          <TextEditor 
          label={Label_Result}
          data={dataForm.LessonLearnedText} 
          errors={errors.LessonLearnedText}
          set={e => handleDataChange('LessonLearnedText',e)}/>
          <TextEditor 
          label={Label_Recommendation}
          data={dataForm.Recommendation} 
          errors={errors.Recommendation}
          set={e => handleDataChange('Recommendation',e)}/>
          <BottomLayout>
            <UploadLayout>
              <UploadFilesInitial files={files} setFiles={e => setFiles(e)} maxTotalFile={3}/>
            </UploadLayout>
            <ButtonLayout>
              <Btn className="btn btn-warning" onClick={e => setShowAdd(false)}>CANCEL</Btn>
              <Btn className={`btn ${loading ? 'btn-secondary': 'btn-success'}`} disabled={loading || Object.keys(errors).length} onClick={e => addLL()}>{loading ? <Spinner/> : 'SUBMIT'}</Btn>
            </ButtonLayout>
          </BottomLayout>
        </AddFormLayout>
      }
    </ContentLayout>
	)
}

export default LessonLearned
