 import React from "react";
 import { Editor } from 'react-draft-wysiwyg';
 import { convertToRaw, ContentState } from 'draft-js';//convertFromHTML
 import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
 import draftToHtml from 'draftjs-to-html';
 import htmlToDraft from 'html-to-draftjs';
 import { Error, FormLayout, InputLayout, Label } from './style'
 import Information from '../Tooltip'

 const TextEditor = (props) => {
    const content = (content) => {
      const blocksFromHTML = htmlToDraft(content)//convertFromHTML(content);
      if(blocksFromHTML.contentBlocks !== null){
        const state = ContentState.createFromBlockArray(blocksFromHTML)
        return convertToRaw(state)
      }else{
        return ''
      }
    }

    // const handleMaxLength = (input) => {
    //   console.log(draftToHtml(content(props.data)));
    //   if (draftToHtml(content(props.data)).length >= (props.maxLength + 8)) {
    //     return 'handled';
    //   }
    // }
      
        return (
            <React.Fragment>
              <FormLayout className="pt-3 pb-4" height="20em">
                <InputLayout className="col-12 pb-1 pl-0 pr-0">
                  <Label className="h5" >{props.label}</Label>
                  {props.componentId && <Information componentId={`Tooltip-${props.componentId}`} message={props.tooltip}/>}
                </InputLayout>
                <InputLayout className="col-12 pb-1 pl-0 pr-0 h-100">
                    <Editor
                        defaultContentState={content(props.data)}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="h-75"
                        editorClassName={`border text-dark text-ma-1 ${props.errors && 'border border-danger'} `}
                        onContentStateChange={e => props.set(draftToHtml(e))}
                        readOnly={props.disabled}
                        // handleBeforeInput={props.maxLength && handleMaxLength}
                        // handlePastedText={props.maxLength && handleMaxLength}
                        toolbar={!props.disabled ? {
                          options: ['inline', 'blockType', 'fontSize', 'fontFamily','list', 'textAlign',],
                          inline: {
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
                            bold: { className: 'bordered-option-classname' },
                            italic: { className: 'bordered-option-classname' },
                            underline: { className: 'bordered-option-classname' },
                            strikethrough: { className: 'bordered-option-classname' },
                            code: { className: 'bordered-option-classname' },
                          },
                          blockType: {
                            className: 'bordered-option-classname',
                          },
                          fontSize: {
                            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                            className: 'bordered-option-classname',
                          },
                          fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                            className: 'bordered-option-classname',
                          },
                          list: {
                            inDropdown: false,
                            className: 'bordered-option-classname',
                            dropdownClassName: undefined,
                            options: ['unordered', 'ordered'],
                            unordered: { className: 'bordered-option-classname' },
                            ordered: { className: 'bordered-option-classname' },
                          },
                          textAlign: {
                            inDropdown: false,
                            className: 'bordered-option-classname',
                            options: ['left', 'center', 'right', 'justify'],
                            left: { className: 'bordered-option-classname' },
                            center: { className: 'bordered-option-classname' },
                            right: { className: 'bordered-option-classname' },
                            justify: { className: 'bordered-option-classname' },
                          },
                        } : {options: []}}
                    />
                </InputLayout>
              </FormLayout>
              <Error className="pb-3">{props.errors}</Error>
            </React.Fragment>
        )    
 }

 export default TextEditor
 
 