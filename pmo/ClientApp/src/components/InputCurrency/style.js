import styled from 'styled-components'
import NumberFormat from 'react-number-format';

export const InputLayout = styled.div`
`

export const Label = styled.label`
color: ${props => props.theme.color.dark_purple};
font-size: 1.2rem;
font-weight: 600;
` 

export const Input = styled(NumberFormat)`
  width: 100%;
  height: 25px;
  text-align: right;
`

export const Error = styled.span`
    color: ${props => props.theme.color.dark_red};
    text-align:right;
`