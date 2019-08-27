import styled from 'styled-components'

export const Error = styled.span`
    color: ${props => props.theme.color.dark_red};
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