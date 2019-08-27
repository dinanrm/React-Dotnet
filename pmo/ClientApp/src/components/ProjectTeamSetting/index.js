import React, { Component } from 'react'
import { FormCard, CardContainer, Cardheader, Cardbody } from './style'
import { CustomDatePicker } from '../DatePicker';
import { FormGroup, Label, CustomInput } from 'reactstrap'
import { MultipleOptions } from '../MultipleOptions'


export class ProjectTeamSetting extends Component {
    state = {
            startDate : '',
            projectSponsor : {},
    }
    
    handleChange = (target,e) => {
        this.setState({
            [target] : e,
          });
    }

  render() {
    return (
      <CardContainer>
          <Cardheader className="text-center h5 p-3">PROJECT TEAM SETTINGS / PROJECT ORGANIZATION</Cardheader>
          <Cardbody>
              <FormCard>
                <FormGroup className="pb-3">
                    <Label className="h5">Date Prepared</Label>
                    <CustomDatePicker onSelectDate={(e) => this.handleChange('startDate',e)}/>
                </FormGroup>
                <FormGroup className="pb-3">
                    <Label className="h5" for="ps">Project Sponsor</Label>
                    <CustomInput type="select" id="ps">
                        <option value="">Select</option>
                        <option>Value 1</option>
                        <option>Value 2</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup className="pb-3">
                    <Label className="h5" for="po">Project Owner</Label>
                    <CustomInput type="select" id="po">
                        <option value="">Select</option>
                        <option>Value 1</option>
                        <option>Value 2</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup className="pb-3">
                    <Label className="h5" for="pm">Project Manager</Label>
                    <CustomInput type="select" id="pm">
                        <option value="">Select</option>
                        <option>Value 1</option>
                        <option>Value 2</option>
                    </CustomInput>
                </FormGroup>
                <FormGroup className="pb-3">
                    <Label className="h5" for="pt">Project Team</Label>
                    <CustomInput type="select" id="pt">
                        <option value="">Select</option>
                        <option>Value 1</option>
                        <option>Value 2</option>
                    </CustomInput>
                </FormGroup>
                <MultipleOptions/>
              </FormCard>
          </Cardbody>
      </CardContainer>
    )
  }
}
