import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import React , { useState, useRef, useEffect } from 'react'
import 'filepond/dist/filepond.min.css';
import api from '../../utils/api';

registerPlugin(FilePondPluginFileValidateSize,FilePondPluginFileValidateType)

const UploadFilesEdit = (props) => {

  const [files, setFiles] = useState([]);
  const pond = useRef()

  const getOriginalFileName = (filename) => {
      let underscoreIndex = filename.lastIndexOf('_')
      let extensionIndex = filename.lastIndexOf('.')
      const uniqueId = filename.substring(underscoreIndex,extensionIndex); 
      return filename.replace(uniqueId,'')
  }

  const [errorFileRemove,setError] = useState("Error during remove") 
  const [tapToRetry,setTap] = useState("tap to retry") 

  useEffect(()=>{
    props.required && props.set(props.componentId,files)
  },[files])

    return (
        <FilePond 
            ref={pond}
            allowMultiple={true}
            maxFiles={props.maxFiles || 5}
            files={files}
            allowPaste={false}
            onupdatefiles={(file) => {
                setFiles(file);
            }}
            labelFileRemoveError={errorFileRemove}
            labelTapToRetry={tapToRetry}
            // onerror={(error,file) => {
            //     setError(`${error.body} ${file.filename}.`)
            //     setTap('Check your internet connection')
            // }}
            labelIdle={!props.isEditable ? "Uploaded Files" : 'Drag & Drop your files or <span class="filepond--label-action"> Browse </span>'}
            onactivatefile={async(file) => {
                const response = file && await api.documents.download(file.serverId,{responseType: 'blob'})
                if(('data' in response)){
                    const url = URL.createObjectURL(new Blob([response.data],{type : response.headers["content-type"]}));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', file.filename);
                    document.body.appendChild(link);
                    link.click();
                    window.URL.revokeObjectURL(url);
                } 
            }}
            oninit={async() => {
                if(props.projId){
                    const { data } = props.categoryId === 60 ? await api.documents.byLessonLearned(props.projId,props.categoryId,props.LLId) : await api.documents.byParam(props.projId,props.categoryId)
                    const docs = data//data.filter(doc => doc.categoryId === 1);
                    const array = []
                    docs.map(doc => {
                        return array.push({
                            source: doc.docId,
                            options: {type:'local',file:{name: getOriginalFileName(doc.docName),size: doc.docSize, type:doc.docType}},
                            serverId: doc.docId
                        })  
                    });
                    setFiles(array);
                }
            }}
            maxTotalFileSize={2485760 * (props.maxFiles || 5)}
            maxFileSize={2485760}
            // labelMaxTotalFileSize={'Total file size should be lesser than MB.'}
            labelMaxFileSize={'Total file size should be lesser than 2MB.'}
            allowFileTypeValidation={true}
            checkValidity={true}
            allowBrowse={props.isEditable && !props.isOfficer}
            allowDrop={props.isEditable && !props.isOfficer}
            // disabled={!props.projId || !props.isEditable || props.isOfficer}
            acceptedFileTypes={
                ['application/pdf', 'application/msword','application/vnd.ms-excel','application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'application/vnd.ms-access','text/plain']}
            fileValidateTypeLabelExpectedTypesMap={{
            'application/pdf': '.pdf', 'application/msword': '.doc', 'application/vnd.ms-excel': '.xls',
            'application/vnd.ms-powerpoint': '.ppt','application/vnd.ms-access': '.mdb',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
            'text/plain':'.txt'
            }}
            labelFileTypeNotAllowed={'Upload only PDF or Office or Text file.'}
            server={{
                process: (fieldName, file, metadata, load, error, progress, abort) => {
                    const formData = new FormData();
                    formData.append("Files",file);
                    formData.append("ProjectId",props.projId);
                    formData.append("CategoryId",props.categoryId);
                    formData.append("DocStatus",1);
                    formData.append("Description",'');
                    props.month && formData.append("Month",props.month);
        
                    const request = new XMLHttpRequest();
                    request.open('POST', 'http://172.22.201.142:5000/api/documents/upload');
                    request.responseType = 'json';
                    request.upload.onprogress = (e) => {
                        progress(e.lengthComputable, e.loaded, e.total);
                    };
                    request.onload = function() {
                        if (request.status >= 200 && request.status < 300) {
                            load(request.response[0].docId);
                        }
                        else {
                            error('oh no');
                        }
                    };
                    request.send(formData);

                    return {
                        abort: () => {
                            request.abort();
                            abort();
                        }
                    };
                },
                remove: async(source, load, error) => {
                            if(!props.isOfficer && props.isEditable){
                                const response = await api.documents.delete(source)
                                response.status >= 200 && response.status < 300 ? load(response.data.docId):error('Error deleting file'); 
                            }else{
                                setError("Remove not allowed")
                                setTap("")
                                error()
                            } 
                        }
                ,
                revert: async(uniqueFileId, load, error) => {
                    const response = await api.documents.delete(uniqueFileId)
                    response.status === 200 ? load():error('Error deleting file'); 
                    
                } 
            }}
        >
        </FilePond>
    )
}

export default UploadFilesEdit