import React from 'react'
import { InputLayout, Label, Input, Error } from './style'

const InputCurrency = React.forwardRef((props,ref) =>{

  return (
    <React.Fragment> 
      <InputLayout className="col-3 p-0">
        <Label >{props.label}</Label>
      </InputLayout>
      <InputLayout className="col-9 pl-0 pr-0">
        <Input 
        className={`form-control ${props.erros && 'is-invalid'}`}  
        thousandSeparator={true}
        value={props.value}
        disabled={props.disabled}
        onValueChange={(values) => props.onChange(parseInt(values.value)) }
        ref={ref}
        />
        <Error>{props.errors}</Error>
      </InputLayout>
    </React.Fragment>
  )
    
})

export default InputCurrency;