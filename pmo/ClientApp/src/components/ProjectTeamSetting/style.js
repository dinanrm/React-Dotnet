import styled from 'styled-components'
import { Form, Card, CardHeader, CardBody } from 'reactstrap'

export const CardContainer = styled(Card)`
 border: 1px solid;
`

export const Cardheader = styled(CardHeader)`
    background-color: ${props => props.theme.color.dark_purple};
    color: white;
`

export const Cardbody = styled(CardBody)`
    background-color: white;
`

export const FormCard = styled(Form)`
    color: ${props => props.theme.color.purple};
`