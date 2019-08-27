import React, { Component } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { InputGroup, InputGroupAddon } from 'reactstrap'
import { Input, Button, Error } from './style'
import { FaRegCalendarAlt } from 'react-icons/fa'

export class CustomDatePicker extends Component {
  render() {
    return (
        <DatePicker
            customInput={<CustomInput disabledButton={this.props.disabledButton} disabledInput={this.props.disabledInput} />}
            selected={this.props.value}
            onChange={(e) => this.props.onSelectDate(e)}
            dateFormat={"dd/MM/yyyy"}
            required={this.props.required}
        />
    )
  }
}

const CustomInput = React.forwardRef((props,ref) => {
    return(
        <React.Fragment>
            <InputGroup>
                <Input required={props.required} className="form-control" value={props.value} ref={ref} onClick={props.onClick} disabled={props.disabledInput} onChange={props.onChange} />
                <InputGroupAddon addonType="append">
                    <Button className="btn btn-secondary" readOnly={props.readOnly} disabled={props.disabledButton} onClick={props.onClick}>
                        <FaRegCalendarAlt/>
                    </Button>
                </InputGroupAddon>
            </InputGroup>
            <Error>{props.errors}</Error>
        </React.Fragment>
    )
})
