import React from 'react'
import { CardContainer, Cardbody, FormCard} from './style'
import TextEditor from '../TextEditor';

const ProjectCharter = (props) => {

    return (
      <CardContainer>
          <Cardbody className="p-0 mb-5">
            <FormCard className="m-0">
                  <TextEditor label="Executive Summary:" disabled={props.disable} errors={props.errors.executiveSummary} data={props.value.executiveSummary} set={e => props.set('executiveSummary',e)}/>
                  <TextEditor label="Project Definition:" disabled={props.disable} errors={props.errors.projectDefinition} data={props.value.projectDefinition} set={e => props.set('projectDefinition',e)}/>
                  <TextEditor label="Vision:" disabled={props.disable} errors={props.errors.vision} data={props.value.vision} set={e => props.set('vision',e)}/>
                  <TextEditor label="Objectives:" disabled={props.disable} errors={props.errors.objective} data={props.value.objective} set={e => props.set('objective',e)}/>
            </FormCard>
          </Cardbody>
      </CardContainer>
    )
}

export default ProjectCharter