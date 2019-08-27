import styled from 'styled-components'
import { Card, CardHeader, CardBody, Form} from 'reactstrap'

export const CardContainer = styled(Card)`
 	border: none;
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
   	display: flex;
	flex-wrap: wrap;
`
export const FormLayout = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 100%;
	height: ${props => props.height};
`
export const InputLayout = styled.div`
`

export const Label = styled.label`
	color: ${props => props.theme.color.dark_purple};
	font-size: 1.2rem;
	font-weight: 600;
` 