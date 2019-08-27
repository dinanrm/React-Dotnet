import styled from 'styled-components'

export const Input = styled.input`

&:disabled{
    color: #000;
}
`

export const Button = styled.button`
`

export const Error = styled.span`
color: ${props => props.theme.color.dark_red};
`