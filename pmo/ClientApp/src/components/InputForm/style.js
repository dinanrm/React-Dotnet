import styled from 'styled-components' 

export const InputLayout = styled.div`
display: ${props => props.position === "inline" && "flex"};
justify-content: ${props => props.position === "inline" && "space-between"};
padding-bottom: 1vw;
`

export const LabelLayout = styled.div`
display: flex;
/* justify-content: space-between; */
`

export const Label = styled.label`
color: ${props => props.theme.color.dark_purple};
font-size: 1.2rem;
font-weight: 600;
/* width: 20vw; */
align-self: center;
` 


export const Error = styled.span`
color: ${props => props.theme.color.dark_red};
`