import React, {useState,useEffect} from 'react'
import {ContentLayout, HeaderLayout, HeaderText, BodyLayout} from './style'
import api from '../../utils/api';
import {getFullDate} from '../../utils/date'
import TextEditor from '../TextEditor'
import UploadFilesEdit from '../UploadFilesEdit'
import {Button} from 'reactstrap'
import {IoIosArrowBack} from 'react-icons/io'


const LessonLearnedDetail = (props) => {

  const form = {
    "impact": '',
    "lessonLearnedText": '',
    "recommendation": '',
    "lessonLearnedCreatedDate": null,
    "lessonLearnedCategory": {},
    "user":{},
    "projectCategory":{}
  }
  const [data,setData] = useState(form)

  const fetchLL = async() => {
    const {data} = await api.LessonLearned.get(props.match.params.idLL)
    setData(data)
  }

  useEffect(() => {
    fetchLL()
  }, [])

  useEffect(()=>{},[data])

    return (
        <ContentLayout>
            <HeaderLayout>
              <Button onClick={e => props.history.goBack()}className="px-3 py-1"><IoIosArrowBack className="mb-1 ml-0 mr-1"/>back</Button>
              <HeaderText>Lesson Learned : {data.projectCategory.projectCategoryName}</HeaderText>
              <HeaderText>Note By : {data.user.userName}</HeaderText>
              <HeaderText>Category : {data.lessonLearnedCategory.llCategoryName}</HeaderText>
              <HeaderText>Date : {getFullDate(data.lessonLearnedCreatedDate,"/")}</HeaderText>
            </HeaderLayout>
            <BodyLayout>
              {data.impact !== '' && <TextEditor 
                label={"Impact"} 
                disabled={true} 
                data={data.impact || ''}/>}
              {data.lessonLearnedText !== '' && <TextEditor 
                label={"Problem / Success"} 
                disabled={true} 
                data={data.lessonLearnedText || ''} />}
              {data.recommendation !== '' && <TextEditor 
                label={"Recommendation"} 
                disabled={true} 
                data={data.recommendation || ''} />}
              <UploadFilesEdit
                projId={props.match.params.id} 
                isOfficer={false} 
                categoryId={60} maxFiles={3} 
                LLId={props.match.params.idLL}
                isEditable={false}/>
            </BodyLayout>
        </ContentLayout>
    )
}

export default LessonLearnedDetail
