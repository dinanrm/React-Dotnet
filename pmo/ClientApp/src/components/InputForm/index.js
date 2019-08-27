import React from 'react'
import { InputLayout, Label,  Error, LabelLayout } from './style' 
import Information from '../Tooltip'

const InputForm = (props) => {
    return (
      <InputLayout position={props.position}  >
        <LabelLayout>
        <Label className={props.classNameLabel}>{props.label}</Label>
        {props.componentId && <Information componentId={`Tooltip-${props.componentId}`} message={props.tooltip} />}
        </LabelLayout>
        <div className={props.classNameComponent}>
        {props.children}
        <Error>{props.error}</Error>
        </div>
      </InputLayout>
    )
}

export default InputForm