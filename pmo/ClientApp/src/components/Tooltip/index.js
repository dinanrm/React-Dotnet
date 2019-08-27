import React,{useState} from 'react'
import {IoIosInformationCircle} from 'react-icons/io' 
import {Tooltip} from 'reactstrap'

const Information = (props) => {

  const [isTooltipShow,setTooltipShow] = useState(false)

  return (
    <span>
      <IoIosInformationCircle className="mb-1 pl-2" size={27} id={props.componentId}/>
      <Tooltip 
        placement="right" 
        isOpen={isTooltipShow} 
        autohide={false} 
        toggle={e => setTooltipShow(!isTooltipShow)} 
        target={props.componentId}>
            {props.message}
      </Tooltip>
    </span>
  )
}

export default Information
