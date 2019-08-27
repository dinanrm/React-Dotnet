import React, {useState, useEffect} from 'react'
import {ContentLayout, TextArea, Span, BtnSubmit, BtnDelete, BtnView, UploadLayout, SpanLayout, SpanProgressBar, BtnFile, BtnInput, SpanOut, ButtonLayout, BtnApproval, Label, UploadedIconLayout} from './style'
import {MdFileUpload} from 'react-icons/md'
import axios from 'axios'
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import api from '../../utils/api';

const ProjectManagementPlan = (props) => {
	const endpoint = 'http://172.22.201.142:5000/api/documents/upload'
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [percentage, setPercentage] = useState('0')
	const [text, setText] = useState(props.value.docDescription || '')
	const [canSubmit, setCanSubmit] = useState(false);
	const [canDelete, setCanDelete] = useState(false);
	const [canView, setCanView] = useState(false);
	const [canBrowse, setCanBrowse] = useState(false);
	const [canApprove, setCanApprove] = useState(false);
	const [idDoc, setIdDoc] = useState(null);
	const [isHidden, setIsHidden] = useState(false);
	const [col, setCol] = useState('col-12')
	const [state, setState] = useState('')

	const handleselectedFile = event => {
		if (event.target.files.length !== 0) {
			const type = event.target.files[0].type
			const size = event.target.files[0].size
			const name = event.target.files[0].name
			if(type.includes('officedocument') || type.includes('pdf') || type.includes('text')) {
				if(size > 10000000) {
			      	alert('File size exceeds limit of 10MB.')
		      	} else if (name.length > 50) {
		      		alert('File name exceeds limit of 50 characters')
		      	} else {
					setFile(event.target.files[0])
					setFileName(event.target.files[0].name)
					setCanSubmit(true)
				}
			} else {
				alert('File is not allowed.')
			}
		}
	}

	const handleUpload = () => {
		if(!file) {
      		alert('Please upload a file.')
    	}

    	const data = new FormData()
    	data.append('files', file)
    	data.append('projectID', props.projectId)
    	data.append('categoryId', 2)
    	data.append('DocStatus', 0)
    	data.append('Description', text)

	    axios
	      .post(endpoint, data, {
	        onUploadProgress: ProgressEvent => {
	          setPercentage(Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total))
	        },
	      })
	      .then(res => {
	        setCanView(true)
	        setCanDelete(true)
	        setCanSubmit(false)
	        setCanBrowse(false)
	        setCanApprove(true)
	        // res.data.docId
	        setIdDoc(res.data[0].docId)
	        props.set(true)
	      })
		}

	  const approve_sponsor = (data) => {
		data.map((data)=> {
		const i = data.docStatus

			if (i === 2) {
			props.set(false)
			} else if (i === 1) {
			props.set(true)
			}
			return data
		})
		}

  	const changeStatus = async(param) => {
  		try{
	  		const response = await api.documents.updateStatus(param)
	  		const { data } = await api.documents.byProject(props.projectId)
	  		
			approve_sponsor(data)
	  		if (response.status === 204 && state === 'approve') {
	  			setIcon(<IoIosCheckmark size={35}/>)
		  		setCanBrowse(false)
		  		setCanApprove(false)
		  		setCanDelete(false)
	  		} else if (response.status === 204 && state === 'disapprove') {
	  			setIcon(<IoIosClose size={35}/>)
		  		setCanBrowse(false)
		  		setCanApprove(false)
	  		} else {
	  			return alert('Failed to approve/disapprove file.');
	  		}
  		} catch (err) {
  			console.error(err)
  			return alert('Something went wrong with your connection/server.')
  		}
  	}

  	const [icon, setIcon] = useState(<MdFileUpload size={35}/>)

  	const downloadFile = async(id) => {
  		const response = await api.documents.download(props.value.docId,{responseType: 'blob'})
        if(('data' in response)){
            const url = URL.createObjectURL(new Blob([response.data],{type : response.headers["content-type"]}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            window.URL.revokeObjectURL(url);
        }
  	}

  	const deleteFile = async(id) => {
  		const data = await api.documents.delete(id)
  		if (data.status !== 200) {
	  			return alert('Something went wrong.');
	  	} else {
  			props.hideOverlay(id)
  		}
  	}

  	useEffect(() => {
  		const status = props.status
  		const value = props.value
  		const role = props.role

  		if (role === 2) {
			setIsHidden(true)
			setCol('col-8')
			setCanDelete(true)
		}
		
  		if (value >= 0) {
    		setCanApprove(false)
    		setCanView(false)
    		setCanDelete(false)
    		if (role === 1 || role === 3 || role === 4) {
    			setCanBrowse(false)
    		} else {
    			setCanBrowse(true)
    		}
    	} else {
    		setFileName(value.docName)
    		setPercentage('100')
    		setCanApprove(true)
    		setCanView(true)
    		setCanBrowse(false)
    		if (value.docStatus === 1 && role === 2) {
    			setCanApprove(false)
    			setCanDelete(true)
    			setIcon(<IoIosCheckmark size={35}/>)
    		} else if (value.docStatus === 2 && role === 2) {
    			setCanApprove(false)
    			setCanDelete(true)
    			setIcon(<IoIosClose size={35}/>)
    		}

    		switch (status) {
	    		case 21:
	    			if (role === 1 || role === 3 || role === 4) {
	    				setCanDelete(false)
	    			}
	    			break
	    		case 22:
			    	setCanDelete(false)
	    			break
	    		case 24:
	    			if (role === 1 || role === 3 || role === 4) {
	    				setCanDelete(false)
	    			} else {
	    				setCanDelete(true)
	    			}
	    			break
	    		default:
	    			break
	    	}
    	}
  	},[])

  	const data = new FormData()

  	const approved = () => {
  		setState('approve')
  	}

  	const disapproved = () => {
  		setState('disapprove')
  	}

  	useEffect(()=>{
  		if (state === 'approve') {
  			data.append('docId', idDoc || props.value.docId)
  			data.append('docStatus', 1)
  			changeStatus(data)
  		} else if (state === 'disapprove') {
  			props.disapprove_file()
  			data.append('docId', idDoc || props.value.docId)
  			data.append('docStatus', 2)
  			changeStatus(data)
  		}
  	},[state])

  	useEffect(() => {

  	}, [idDoc])

	return(
		<ContentLayout className="pt-3 pb-4" >
			<UploadLayout className="p-2 mr-3">
				<UploadedIconLayout docStatus={props.value.docStatus}>{icon}</UploadedIconLayout>
				<SpanLayout>
						<Span>{fileName}<br/></Span>
						<SpanOut className=""><SpanProgressBar id="myBar" value={percentage}>&nbsp;&nbsp;{percentage}%</SpanProgressBar></SpanOut>
				</SpanLayout>
				<BtnFile disabled={!canBrowse}>
					Browse File<BtnInput type="file" onChange={handleselectedFile} disabled={!canBrowse}></BtnInput>
				</BtnFile>
			</UploadLayout>
			<BtnSubmit className="" disabled={!canSubmit} onClick={handleUpload}>Upload</BtnSubmit>
			<BtnDelete className="" disabled={!canDelete} onClick={e => deleteFile(idDoc || props.value.docId)}>Delete</BtnDelete>
			<BtnView className="" disabled={!canView} onClick={downloadFile}>View</BtnView>
			<Span className="col-12 p-0 mt-2">Note :</Span>
			<TextArea disabled={!canSubmit} className={col} value={text} onChange={(event)=>{
                      setText(event.target.value)
                   }}></TextArea>
            <ButtonLayout className="col-4">
	          <BtnApproval disabled={!canApprove} hidden={!isHidden} className="btn btn-lg mx-3 mb-3 pr-4" onClick={e=>disapproved()}>
	            <Label><IoIosClose className="mb-1" size={15}/>DISAPPROVE</Label>
	          </BtnApproval>
	          <BtnApproval disabled={!canApprove} hidden={!isHidden} className="btn btn-lg mx-3 mb-3 pr-4" onClick={e=>approved()}>
	            <Label><IoIosCheckmark className="mb-1" size={15}/>APPROVE</Label>
	          </BtnApproval>
	        </ButtonLayout>
		</ContentLayout>
	)
}

export default ProjectManagementPlan;