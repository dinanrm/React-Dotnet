import React, {useState, useEffect} from 'react'
import { InputLayout, TableLayout, Button, Error } from './style'
import { Input, Row, Col, FormGroup, Label, Table,  } from 'reactstrap'
import api from '../../utils/api';
import PopUp from '../PopUp';


const BestPractice = (props) => {
  // const [startDate, setstartDate] = useState(new Date())
  const [input,setInput] = useState('')
  const [input2, setInput2] = useState('')
  const [show,setShow] = useState(false)
  const [deletedData,setDelete] = useState()
  const [showAlert,setShowAlert] = useState(false)

  const addMilestone = () => {
    if(input && input && input2 && props.item.length <= 20){
      props.set(input,input2)
      cancelEdit()
    }else{
      setShowAlert(true)
    }
  }

  const showPopUp = (data,key) => {
    setShow(true)
    setDelete({
      data: data,key: key
    })
  }

  const cancelEdit = () => {
    setInput('')
    setInput2('')      
    setShowAlert(false)
  }

  const deleteMilestone = async(data,key) => {
    data.lessonLearnedId && await api.LessonLearned.delete(data.lessonLearnedId)
    console.log('data',data);
    await props.remove(key)
    setShow(false)
  }

  useEffect(()=>{
  },[deletedData,show,input2,input])

  return (
    <React.Fragment>
      { props.isEditable &&
      <InputLayout>
        <Row form>
          <Col md={5}>
            <FormGroup>
              <Label for="exampleEmail">Description</Label>
              <Input type="text" value={input} onChange={e => setInput(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={5}>
            <FormGroup>
              <Label for="date">Recommendation</Label>
              <Input type="text" value={input2} onChange={e => setInput2(e.target.value)} />
            </FormGroup>
          </Col>
          <Col md={2}>
            <Button className="btn btn-lg mt-4 ml-3" onClick={e => addMilestone()}>Add Milestone</Button>
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
              <th>Description</th>
              <th>Recommendation</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.item.length === 0 ?
              ( <tr>
                  <th scope="row" colSpan="4"className="text-center">Data Empty</th>
                </tr>):
              (
                props.item.map((data,key) =>{
                return (
                  <tr key={key}>
                    <th scope="row">{key+1}</th>
                    <td>{data.lessonLearnedText}</td>
                    <td>{data.recommendation}</td>
                <td>{props.isEditable && <button className="text-danger" onClick={e => showPopUp(data,key)}>x</button>}</td>
                  </tr>
                )
                })
              )
            }
          </tbody>
        </Table>
      </TableLayout>
      {deletedData && <PopUp show={show} setShow={setShow} title="Lesson Learned & Best Practice" eventAccept={e => deleteMilestone(deletedData.data,deletedData.key)}>
        {`Are you sure to delete ${deletedData.data.lessonLearnedText} ?`} 
      </PopUp>}
    </React.Fragment>
  )
}

export default BestPractice
