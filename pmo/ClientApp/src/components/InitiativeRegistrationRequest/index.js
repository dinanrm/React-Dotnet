import React from 'react'
import { CardContainer, Cardbody, FormCard, InputLayout, FormLayout, Label} from './style'
// import htmlToDraft from 'html-to-draftjs';
import { CustomDropdown } from '../Dropdown';
import InputCurrency from '../InputCurrency';
import TextEditor from '../TextEditor';


const InitiativeRegistrationRequest = (props) => {

  function getSum(total, num) {
    return (total || 0) + num;
  }

  const {landCompensation, landImprovement, building, infrastructure, plantMachine, equipment, expenseUnderDevelopment, workingCapital, contingency} = props.value
  const arraySum = [landCompensation, landImprovement, building, infrastructure, plantMachine, equipment, expenseUnderDevelopment, workingCapital, contingency] 
  const total = arraySum.reduce(getSum)

  return (
      <CardContainer>
          <Cardbody className="p-0">
            <FormCard className="m-0">
              <TextEditor label="Background Information:" disabled={props.disable} errors={props.errors.backgroundInformation} data={props.value.backgroundInformation} set={e => props.set('backgroundInformation',e)}/>
              <TextEditor label="Objectives & Benefits: " disabled={props.disable} errors={props.errors.objectiveBenefit} data={props.value.objectiveBenefit} set={e => props.set('objectiveBenefit',e)}/>
                  <InputLayout className="col-12 pb-1 pl-0">
                    <Label className="h5">Premilinary Initiative Investment: <i className="font-weight-light">(show information on each item and subject to change as appropriate)</i> </Label>
                  </InputLayout>
              <FormLayout className="pb-4 col-9">
                  <InputLayout className="col-3 p-0">
                    <Label >Item</Label>
                  </InputLayout>
                  <InputLayout className="col-9 pl-0">
                    <Label >Amount (USD)</Label>
                  </InputLayout>
                  <InputCurrency label="Land compensation" disabled={props.disable} errors={props.errors.landCompensation} value={props.value.landCompensation} onChange={e => props.set("landCompensation",e)}/>
                  <InputCurrency label="Land improvement" disabled={props.disable} errors={props.errors.landImprovement} value={props.value.landImprovement} onChange={e => props.set("landImprovement",e)}/>
                  <InputCurrency label="Buildings" disabled={props.disable} errors={props.errors.building} value={props.value.building} onChange={e => props.set("building",e)}/>
                  <InputCurrency label="Infrastructure" disabled={props.disable} errors={props.errors.infrastructure} value={props.value.infrastructure} onChange={e => props.set("infrastructure",e)}/>
                  <InputCurrency label="Plan and machine" disabled={props.disable} errors={props.errors.plantMachine} value={props.value.plantMachine} onChange={e => props.set("plantMachine",e)}/>
                  <InputCurrency label="Equipment" disabled={props.disable} errors={props.errors.equipment} value={props.value.equipment} onChange={e => props.set("equipment",e)}/>
                  <InputCurrency label="Expense under development" disabled={props.disable} errors={props.errors.expenseUnderDevelopment} value={props.value.expenseUnderDevelopment} onChange={e => props.set("expenseUnderDevelopment",e)}/>
                  <InputCurrency label="Working capital" disabled={props.disable} errors={props.errors.workingCapital} value={props.value.workingCapital} onChange={e => props.set("workingCapital",e)}/>
                  <InputCurrency label="Contingency" disabled={props.disable} errors={props.errors.contingency} value={props.value.contingency} onChange={e => props.set("contingency",e)}/>
                  <InputCurrency label="Total" disabled={props.disable} errors={props.errors.total} value={total} onChange={e => props.set("total",e)}/>
              </FormLayout>
              <FormLayout className="mt-2 col-3">
                <InputLayout className="form-group pr-0 w-100">
                  <div className="py-4">
                    <Label className="h5">Requested by</Label>
                    <CustomDropdown errors={props.errors.requestedBy} disabled={props.disable} data={props.list} loading={props.loading} value={props.value.requestedBy} onChange={e => props.set("requestedBy",e)}/>
                  </div>
                  <div className="py-4">
                    <Label className="h5">Acknowledged by</Label>
                    <CustomDropdown errors={props.errors.acknowledgedBy} disabled={props.disable} data={props.list} loading={props.loading}value={props.value.acknowledgedBy} onChange={e => props.set("acknowledgedBy",e)}/>
                  </div>
                  <div className="py-4">
                    <Label className="h5">Agreed by</Label>
                    <CustomDropdown errors={props.errors.agreedBy} disabled={props.disable} data={props.list} loading={props.loading} value={props.value.agreedBy} onChange={e => props.set("agreedBy",e)}/>
                  </div>
                </InputLayout>
              </FormLayout>
                <TextEditor label="Timeline :" disabled={props.disable} errors={props.errors.timeline} data={props.value.timeline} set={e => props.set('timeline',e)}/>
            </FormCard>
          </Cardbody>
      </CardContainer>
    )

}

export default InitiativeRegistrationRequest
