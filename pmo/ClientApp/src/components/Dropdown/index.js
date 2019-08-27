import 'semantic-ui-css/semantic.min.css'
import { Dropdown } from 'semantic-ui-react'
import React from 'react'
import { Error } from './style'

export const CustomDropdown = React.forwardRef((props,ref) => {
    return (
      <React.Fragment>
        <Dropdown
          clearable
          fluid
          search
          placeholder={props.placeholder}
          className={`selection ${props.disabled && 'bg-disabled'}`}
          options={props.data}
          onChange={(e,{value}) => props.onChange(value)}
          multiple={props.multiple}
          value={props.value}
          noResultsMessage='Data not found.'
          loading={props.loading}
          disabled={props.disabled}
          ref={ref}
          error={(props.multiple && props.value.length > 10 ) || props.errors !== undefined  }
        />
        <Error>{props.errors}</Error>
      </React.Fragment>
    )
})

