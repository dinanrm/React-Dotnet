import React, { useState, useEffect } from 'react'
import CustomTable from '../Table';
import { column } from './column';
import PopUp from '../PopUp';
import InputForm from '../InputForm';
import {Col,Row, FormGroup, Label, Input, Button} from 'reactstrap'
import { CustomDatePicker } from '../DatePicker';
import TextEditor from '../TextEditor';
import api from '../../utils/api';
import {TitleBar, Btn, FooterTable, AddFormLayout, BottomLayout, ButtonLayout, OptionLayout, Error } from './style';
import {getFullDate} from "../../utils/date"
import { validateExecuting } from '../Validator/validator';

const ChangeRequest = (props) => {

  const form = {
    changeRequestId: null,
    customId: '',
    changeRequestName: '',
    changeRequestData: [],
    requester: '',
    raisedDate: null,
    approvalReqDate: new Date(),
    approvedDate: null,
    status: 0,
  }
  const defaultCategories = [
    {crCategoryId: 1, value: 'Scope', isChecked: false, title: '', description: ''},
    {crCategoryId: 2, value: 'Cost', isChecked: false, title: '', description: ''},
    {crCategoryId: 3, value: 'Quality', isChecked: false, title: '', description: ''},
    {crCategoryId: 4, value: 'Schedule', isChecked: false, title: '', description: ''},
    {crCategoryId: 5, value: 'Documents', isChecked: false, title: '', description: ''},
    {crCategoryId: 6, value: 'Requirements', isChecked: false, title: '', description: ''},
    {crCategoryId: 7, value: 'Others', isChecked: false, title: '', description: ''},
  ]
  const [categories, setCategories] = useState(defaultCategories)

  const getCategories = (data) =>{
    const cats  = data.map(({crCategoryId,title}) =>{
      const value = categories.find(x => x.crCategoryId === crCategoryId).value
      return <p key={crCategoryId}>{value} : {title} </p>
      }
    )
    return cats
  }

  const openDialog = async(data,action) => {
    setAction(action)
    setShowAdd(false);
    await reset()
    const editForm = data
    setDataForm(editForm)
    editForm.changeRequestData.map(({crCategoryId,title,description})=>{
      const index = categories.indexOf(categories.find(data => data.crCategoryId === crCategoryId))
      handleCategories(index,'title',title);
      handleCategories(index,'description',description);
      handleCategories(index,'isChecked',true);
      return index
    });
    setShowAdd(true);
    window.scrollTo(0,document.body.scrollHeight);
  }

  const decisionDialog = (status) => {
    setNext(status)
    setShow(true)
  }

  const reset = () => {
    setDataForm(form)
    setCategories(defaultCategories)
    setNext(null)
  }

  const raiseDialog = (data) => {
    setAction('raise')
    setDataForm(data)
    setNext(1)
    setShow(true)
  }

  const removeDialog = (data) => {
    setAction('remove')
    setDelete(data)
    setShow(true)
  }
  
  const getAction = (data) => {
    const currentUserId = parseInt(localStorage.getItem('id'))
    return (
    <>
      {( props.role.isManager || props.role.isTeam ) && data.userId === currentUserId && data.status === 0 && <Button color="danger" title="Remove" onClick={e => removeDialog(data)} className="mr-1">remove</Button>}
      {( props.role.isManager || props.role.isTeam ) && data.status === 0 && <Button color="info" title="Edit" onClick={e => openDialog(data,'edit')} className="mr-1">edit</Button> }
      {props.role.isManager && data.status === 0 && <Button color="warning" title="Raise" onClick={e => raiseDialog(data)} className="mr-1">raise</Button>}
      {(props.role.isOwner && data.status === 1 ) && <Button color="warning" title="Approval" onClick={e => openDialog(data,'approval')} className="mr-1">need your aproval</Button>}
      {(props.role.isSponsor && data.status === 2 ) && <Button color="warning" title="Approval" onClick={e => openDialog(data,'approval')} className="mr-1">need your aproval</Button>}
    </> 
    )
    
  }
  const col = [
    {
      columns: [
        ...column.slice(0,1),
        {
          Header: "Title Category",
          id:"titleCategory",
          style: {
            textAlign: 'left',
            margin: 'auto'
          },
          minWidth: 150,
          sortable: false,
          accessor: (d) => getCategories(d['changeRequestData'])
        },
        ...column.slice(1,column.length),
        {
          Header: "",
          id: "Action",
          style:{
            textAlign: 'center',
            margin: 'auto',
          },
          minWidth: 150,
          accessor: (data) => getAction(data),
          sortable: false,
        }
      ],
    },
  ]
  const username = localStorage.getItem("username")
  const [datatable,setDataTable] = useState([])
  const [errors,setErrors] = useState({})
  const [isFetched,setIsFetched] = useState(false)
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [action,setAction] = useState('')
  const [nextStatus,setNext] = useState(null)
  const [dataForm,setDataForm] = useState(form)
  const [isLoading,setIsLoading] = useState(false)
  const [showAdd,setShowAdd] = useState(false)
  const [showPopUp,setShow] = useState(false)
  const [deleteData,setDelete] = useState({})

  const fetchChangeRequests = async() => {
    const {data} = await api.ChangeRequests.byProject(props.match.params.id)
    setDataTable(data)
  }

  useEffect(()=>{
    setIsFetched(true)
    fetchChangeRequests()
    return setIsFetched(false)
  },[])
  useEffect(()=>{},[deleteData])
  useEffect(()=>{},[errors])
  useEffect(()=>{
    isSubmitting && setErrors(validateExecuting(dataForm,categories))
  },[dataForm,categories])

  const handleCategories = (index,key,value) => {
    const newCategory = categories[index]
    newCategory[key] = value
    const newCategories = categories.map(item => item === categories[index] ? newCategory : item)
    setCategories(newCategories)
  }
  
  const handleData = (key,value) => {
    setDataForm({
      ...dataForm,
      [key]:value 
    })
  }

  const save = (status) => {
    setIsLoading(true)
    setIsSubmitting(true)
    setErrors(validateExecuting(dataForm,categories))
    const postform = {};
    Object.assign(postform,dataForm)
    postform['projectId'] = props.project.projectId;
    postform['userId'] = parseInt(localStorage.getItem('id'));
    status === 1 && (postform['raisedDate'] = getFullDate(new Date(),'-'));
    status === 3 && (postform['approvedDate'] = getFullDate(new Date(),'-'));
    postform['status'] = status;
    const changeRequestData = [];
    categories.map(({value,isChecked,...item}) => {
        isChecked && changeRequestData.push(item)
        return item
    });
    postform['changeRequestData'] = changeRequestData;
    setIsLoading(false)
    Object.keys(validateExecuting(dataForm,categories)).length === 0 && processDataToServer(postform.changeRequestId,postform)
  }

  const processDataToServer = async(id, postform) => {
    const {data} = dataForm.changeRequestId === null ? await api.ChangeRequests.save(postform) : await api.ChangeRequests.update(id,postform)
    data && setIsSubmitting(false)
    data && reset()
    data && setShowAdd(false)
    data && fetchChangeRequests()
  }

  const remove = async(id) => {
    const {data} = await api.ChangeRequests.delete(id)
    data && setShow(false)
    data && fetchChangeRequests()
  }

  const changeStatus = async(id,status) => {
    setIsLoading(true)
    const form = {}
    form.ChangeRequestId = id
    form.status = status
    const {data} = await api.ChangeRequests.updateStatus(id,form)
    setIsLoading(false)
    data && reset()
    data && setShowAdd(false)
    data && fetchChangeRequests()
    setShow(false)
  }

  const showData = (id,data) => {
    setAction()
    openDialog(data,'viewOnly')
    setShowAdd(true)
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


  return (
  <>
    <CustomTable
      loading={isFetched}
      column={col}
      filter="cr"
      label={"Project Change Control Log"}
      data={datatable}
      isDeleteAble={true}
      onClickRow={(id,data) => showData(id,data)}
      id={'changeRequestId'}
      isPreview={showAdd}
      {...props}
    />
    <FooterTable>
      {( props.role.isManager || props.role.isTeam )&& <Btn className={`btn btn-primary ${showAdd && 'active'}`} disabled={showAdd} onClick={
        async(e)=>{
          e.preventDefault();
          setAction('add')
          await setShowAdd(true);
          await reset()
          setCategories(defaultCategories)
          smoothScroll()}
        }>ADD</Btn>}
    </FooterTable>
    { action === 'remove' && deleteData.changeRequestId && <PopUp show={showPopUp} setShow={setShow} title={`Change Request '${deleteData.changeRequestName}'`} eventAccept={el => remove(deleteData.changeRequestId)}>
      {`Are you sure to delete this change request ?`} 
    </PopUp>}
    { (action === 'approval' || action === 'raise') && <PopUp show={showPopUp} setShow={setShow} title={`Change Request '${dataForm.changeRequestName}'`} eventAccept={el => changeStatus(dataForm.changeRequestId,nextStatus)}>
      {`Are you sure to ${nextStatus === 1 ? 'raise' : nextStatus === 4 ? 'disapprove':'acknowledge'} this change request ?`} 
    </PopUp>}
    { showAdd && 
      <AddFormLayout id="form">
        <Row>
          <Col sm="9">
            <InputForm label={"Project Title"}>
              <Input defaultValue={props.project.initiativeTitle || ''} readOnly/>
            </InputForm>
          </Col>
          <Col sm="3">
            <InputForm 
              label={"Approval Date Required"}
              componentId={"approvalReqDate"}
              tooltip={"The date that creater need approver to consider to approve or disapprove."} >
              <CustomDatePicker 
              value={new Date(dataForm.approvalReqDate)} 
              disabledButton={action === 'approval' || action === 'viewOnly'} 
              disabledInput={action === 'approval' || action === 'viewOnly'} 
              onSelectDate={e => handleData('approvalReqDate', e)}/>
            </InputForm>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputForm label={"Created By"}>
              <Input defaultValue={username} readOnly/>
            </InputForm>
          </Col>
          <Col>
            <InputForm label={"Change Request ID"}>
              <Input readOnly defaultValue={dataForm.customId || ''} />
            </InputForm>
          </Col>
        </Row>
        <Row>
          <Col>
            <InputForm label={"Change Request Title"}>
              <Input defaultValue={dataForm.changeRequestName} minLength={0} maxLength={50} readOnly={action === 'approval' || action === 'viewOnly'} onChange={e => handleData("changeRequestName",e.target.value)} placeholder="Enter your change request title"/>
              <Error>{errors.changeRequestName}</Error>
            </InputForm>
          </Col>
          <Col>
            <InputForm label={"Requester"} componentId={"requester"} tooltip={"Retrieve name of person who involve the project such as Project Manager , Project team and PMO"}>
              <Input defaultValue={dataForm.requester} minLength={0} maxLength={30} readOnly={action === 'approval' || action === 'viewOnly'} onChange={e => handleData("requester",e.target.value)} placeholder="Select User"/>
              <Error>{errors.requester}</Error>
            </InputForm>
          </Col>
        </Row>
        <InputForm label={"Category Of Change Request"}  componentId={"checkbox"} tooltip={"Specify What Impact scope, time, cost, resources, quality, requirements, document"}>
          <OptionLayout>
            {categories.map(({CRCategoryId,value,isChecked},index) => 
              <FormGroup check inline key={index}>
                <Label check>
                  <Input type="checkbox" defaultChecked={isChecked} disabled={action === 'approval' || action === 'viewOnly'} onChange={e => handleCategories(index,'isChecked',e.target.checked)}/>{value}
                </Label>
              </FormGroup>
            )}
          </OptionLayout>
          <Error>{errors.checkbox}</Error>
        </InputForm>
        {categories.map(({crCategoryId,value,isChecked,title,description},index) => 
          <div key={index} className="mt-5">
            {isChecked && <> 
            <TitleBar>{value}</TitleBar>
            <InputForm label={`${value} Title`} componentId={`checkbox-${title}`} tooltip={"Describe how those changes may affect the project"}>
              <Input defaultValue={title} minLength={0} maxLength={50} readOnly={action === 'approval' || action === 'viewOnly'} onChange={e => handleCategories(index,'title',e.target.value)}/>
              <Error>{errors.changeRequestData && errors.changeRequestData[index].title}</Error>
            </InputForm>
            <TextEditor
              label={`${value} Description`}
              data={description} 
              errors={errors.changeRequestData && errors.changeRequestData[index].description}
              disabled={action === 'approval' || action === 'viewOnly'}
              set={e => handleCategories(index,'description',e)}
            />
            </>}
          </div>
        )}
        <BottomLayout>
          <ButtonLayout>
            <Btn className="btn btn-warning" onClick={e => {reset();setShowAdd(false)}}>CANCEL</Btn>
            { action !== 'viewOnly' && dataForm.status === 0 && <>
            { props.role.isManager && <Btn className="btn btn-success" disabled={isLoading || Object.keys(errors).length > 0 } onClick={e => save(1)}>SUBMIT</Btn> }
            {( props.role.isManager || props.role.isTeam ) && <Btn className="btn btn-purple" disabled={isLoading || Object.keys(errors).length > 0} onClick={e => save(0)}>SAVE</Btn>}
            </>}
            {( props.role.isOwner || props.role.isSponsor ) && (dataForm.status === 1 || dataForm.status === 2) && action === 'approval' &&
              <>
                <Btn className="btn btn-secondary" disabled={isLoading} onClick={e => decisionDialog(4)}>DISAPPROVE</Btn>
                <Btn className="btn btn-purple" disabled={isLoading} onClick={e => decisionDialog(props.role.isOwner ? 2 : 3)}>ACKNOWLEDGE</Btn>
              </>
            }
          </ButtonLayout>
        </BottomLayout>
      </AddFormLayout>
    }
  </>
  )
}

export default ChangeRequest