import React from 'react'
import { FormLayout, InputLayout, Label, Error } from './style';
import { CustomDatePicker } from '../DatePicker';
import { CustomDropdown } from '../Dropdown';

const ProjectOrganization = (props) => {

  const {initiativeTitle, date, project_owner, project_sponsor, project_manager, project_team, project_officer} = props.value
  
  function filtered(val){
    const array1 = [project_owner, project_sponsor, project_manager];
    const array2 = array1.concat(project_team,project_officer);
    const array = val ? array2.filter(e => val.constructor === Array ? val.indexOf(e) < 0 : val !== e) : array2
    
    return props.list.filter(e => array.indexOf(e.key) < 0 )    
  }

  const { errors } = props

  return (
    <FormLayout>
        <InputLayout className="col-9 form-group pl-0">
          <Label>Project Title</Label>
          <input type="text" minLength={0} maxLenght={100} className={`form-control ${errors.initiativeTitle && 'is-invalid'}`} disabled={props.disable} value={initiativeTitle} onChange={e => props.set("initiativeTitle",e.target.value)}/>
          <Error>{errors.initiativeTitle}</Error>
        </InputLayout>
        <InputLayout className="col-3 form-group pr-0">
          <Label>Date Prepared</Label>
          <CustomDatePicker disable={props.disable} disabledInput disabledButton={props.disable} value={date} errors={errors.date} onSelectDate={e => props.set('date', e)}/>
        </InputLayout>
        <InputLayout className="col-6 form-group pl-0">
          <Label>Project Owner</Label>
          <CustomDropdown placeholder="Select User" data={filtered(project_owner)} disabled={props.disable} errors={errors.project_owner} loading={props.loading} value={project_owner} onChange={e => props.set("project_owner",e)}/>
        </InputLayout>
        <InputLayout className="col-6 form-group pr-0">
          <Label>Project Sponsor</Label>
          <CustomDropdown placeholder="Select User" data={filtered(project_sponsor)} disabled={props.disable} errors={errors.project_sponsor} loading={props.loading} value={project_sponsor} onChange={e => props.set("project_sponsor",e)}/>
        </InputLayout>
        <InputLayout className="col-6 form-group pl-0">
          <Label>Project Manager</Label>
          <CustomDropdown placeholder="Select User" data={filtered(project_manager)} disabled={props.disable} errors={errors.project_manager} loading={props.loading} value={project_manager} onChange={e => props.set("project_manager",e)}/>
        </InputLayout>
        <InputLayout className="col-6 form-group pr-0">
          <Label>Project Team</Label>
          <CustomDropdown placeholder="Select User" multiple data={filtered(project_team)} disabled={props.disable} errors={errors.project_team} loading={props.loading} value={project_team} onChange={e => props.set("project_team",e)}/>
        </InputLayout>
        <InputLayout className="col-6 form-group pl-0">
          <Label>Project Management Officer</Label>
          <CustomDropdown placeholder="Select User" multiple data={filtered(project_officer)} disabled={props.disable} errors={errors.project_officer} loading={props.loading} value={project_officer} onChange={e => props.set("project_officer",e)}/>
        </InputLayout>
    </FormLayout>
  )
}

export default ProjectOrganization;