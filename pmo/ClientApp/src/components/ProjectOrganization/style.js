import styled from 'styled-components'

export const FormLayout = styled.div`
display: flex;
flex-wrap: wrap;
`

export const InputLayout = styled.div`

`

export const Label = styled.label`
color: ${props => props.theme.color.dark_purple};
font-size: 1.2rem;
font-weight: 600;
` 

export const Error = styled.span`
color: ${props => props.theme.color.dark_red};
`