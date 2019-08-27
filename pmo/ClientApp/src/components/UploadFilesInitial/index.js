import { FilePond,registerPlugin } from 'react-filepond';
import React from 'react'
import 'filepond/dist/filepond.min.css';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';

registerPlugin(FilePondPluginFileValidateSize)

const UploadFilesInitial = (props) => {

    return (
        <FilePond 
            allowMultiple={true}
            maxFiles={props.maxTotalFile || 5}
            files={props.files}
            allowPaste={false}
            onupdatefiles={e => props.setFiles(e)}
            // maxTotalFileSize={10485760}
            // labelMaxTotalFileSize={'Total file size should be lesser than 10MB.'}
            allowFileTypeValidation={true}
            checkValidity={true}
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
            labelFileTypeNotAllowed={'Upload only PDF or Office file.'}
            maxTotalFileSize={2485760 * (props.maxTotalFile || 5)}
            maxFileSize={2485760}
            // labelMaxTotalFileSize={'Total file size should be lesser than 6MB.'}
            labelMaxFileSize={'Total file size should be lesser than 2MB.'}
        />
    )
}

export default UploadFilesInitial