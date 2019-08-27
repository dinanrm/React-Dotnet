import React, {useState, useEffect} from 'react'
import DatePicker from 'react-datepicker'
import { InputLayout, Error, TableLayout, Button } from './style'
import { Input, Row, Col, FormGroup, Label, Table,  } from 'reactstrap'
import api from '../../utils/api';
import PopUp from '../PopUp';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa'


const Milestone = (props) => {
  const [completeDate, setComplete] = useState(props.projectCategoryId === 4 ? new Date():null)
  const [endDate, setendDate] = useState(new Date())
  const [input,setInput] = useState('')
  const [key,setKey] = useState(null)
  const [milestoneId,setMilestoneId] = useState(null)
  const [isEditing,setIsEditing] = useState(null)
  const [show,setShow] = useState(false)
  const [showAlert,setShowAlert] = useState(false)
  const [deletedData,setDelete] = useState()

  const getFullDate = (date) => {
    let year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    let month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    let day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    return `${year}-${month}-${day}`//date.toLocaleDateString('en-GB')
  }

  const addMilestone = () => {
    if(input && (props.projectCategoryId === 4 ? completeDate : true) && endDate && props.item.length <= 20){ 
      props.set(input,props.projectCategoryId === 4 ? getFullDate(completeDate) : null,getFullDate(endDate)) 
      cancelEdit()
      // props.set(input,getFullDate(startDate),getFullDate(endDate))
    }else{
      setShowAlert(true)
    }
  }
  
  const showDataMilestone = (data,key) => {
    setKey(key)
    setIsEditing(true)
    setComplete(data.completedTime && new Date(data.completedTime))
    setendDate(new Date(data.estimatedEndTime))
    setInput(data.milestoneDescription)
    setMilestoneId(data.milestoneId)
  }

  const editMilestone = () => {
    if(input && completeDate && endDate && props.item.length <= 20){
      props.edit(key,milestoneId,input,getFullDate(completeDate),getFullDate(endDate)) 
      cancelEdit()
    }else{
      setShowAlert(true)
    }
  }

  const cancelEdit = () => {
    setKey(null)
    setComplete(new Date())
    setendDate(new Date())
    setInput('')      
    setIsEditing(false)
    setShowAlert(false)
  }
  
  const showPopUp = (data,key) => {
    setShow(true)
    setDelete({
      data: data,key: key
    })
  }

  const deleteMilestone = async(data,key) => {
    data.milestoneId && await api.milestones.delete(data.milestoneId)
    await props.remove(key)
    setShow(false)
  }

  useEffect(()=>{
  },[deletedData,show,endDate,input])

  return (
    <React.Fragment>
      { props.isEditable &&
      <InputLayout>
        <Row form>
          <Col md={isEditing ? 5 : 6}>
            <FormGroup>
              <Label for="exampleEmail">Milestone</Label>
              <Input type="text" id="exampleEmail" value={input} onChange={e => setInput(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={4}>
            <FormGroup>
                <Row>
                  <Col>
                  <Label for="date">Target Date</Label>
                  <DatePicker
                    customInput={<CustomInput/>}
                    selected={endDate}
                    // selectsStart
                    // startDate={startDate}
                    // endDate={endDate}
                    dateFormat={"dd/MM/yyyy"}
                    onChange={e => setendDate(e)}
                  />
                  </Col>
                  {props.projectCategoryId === 4 &&  <Col>
                  <Label for="date">Completed Date</Label>
                  <DatePicker
                    // id="date"
                    customInput={<CustomInput/>}
                    selected={completeDate}
                    // selectsEnd
                    // startDate={startDate}
                    // endDate={endDate}
                    dateFormat={"dd/MM/yyyy"}
                    onChange={e => setComplete(e)}
                    />
                  </Col>}
                </Row>
            </FormGroup>
          </Col>
          <Col>
            <Button className="btn btn-lg mt-4 mx-3" onClick={e => {isEditing ? editMilestone() : addMilestone()}}>{isEditing ? 'Edit Milestone':'Add Milestone'}</Button>
            {isEditing && <Button className="btn btn-lg mt-4" onClick={e => cancelEdit()} >Cancel</Button>}
            {showAlert && <Error>Please fill every field</Error>}
          </Col>
        </Row>
      </InputLayout>
      }
      <TableLayout>
        <Table striped>
          <thead>
            <tr>
              <th>#</th>
              <th>Milestone</th>
              <th>Target Date</th>
              {props.projectCategoryId === 4 && <th>Complete Date</th>}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.item.length === 0 ?
              ( <tr>
                  <th scope="row" colSpan={props.projectCategoryId === 4 ? 5 : 4} className="text-center">Data Empty</th>
                </tr>):
              (
                props.item.map((data,key) =>{
                return (
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td>{data.milestoneDescription}</td>
                    <td>{data.estimatedEndTime}</td>
                    {props.projectCategoryId === 4 && <td>{data.completedTime}</td>}
                    <td>
                      {props.canEdit && <button title="edit" onClick={e => showDataMilestone(data,key)}><FaPencilAlt/></button>}
                      {props.canDelete && <button title="delete" onClick={e => showPopUp(data,key)}><FaTrashAlt/></button>}
                    </td>
                  </tr>
                )
                })
              )
            }
          </tbody>
        </Table>
      </TableLayout>
      {deletedData && <PopUp show={show} setShow={setShow} title="Milestone" eventAccept={e => deleteMilestone(deletedData.data,deletedData.key)}>
        {`Are you sure to delete ${deletedData.data.milestoneDescription} ?`} 
      </PopUp>}
    </React.Fragment>
  )
}

const CustomInput = React.forwardRef((props,ref) => {
  return(
      <React.Fragment>
          <Input required={props.required} className="form-control" value={props.value} ref={ref} onClick={props.onClick} onChange={props.onChange}/>
          <Error>{props.errors}</Error>
      </React.Fragment>
  )
})

export default Milestone
