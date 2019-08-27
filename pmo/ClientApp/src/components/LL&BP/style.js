import styled from 'styled-components'

export const InputLayout = styled.div``

export const Error = styled.span`
color: ${props => props.theme.color.dark_red};
`

export const TableLayout = styled.div`
`

export const Button = styled.button`
justify-content: flex-end;
background-color: ${props => props.theme.color.dark_purple };
border-color: ${props => props.theme.color.dark_purple };
color: #FFF;
padding-left: 0.7vw;
border-radius: 10px;

&:hover{
   color: #FFF !important;
   background-color: ${props => props.theme.color.dark_purple };
}
`

export const ButtonLayout = styled.div`
padding-top: 5vh;
padding-bottom: 5vh;
display: flex;
justify-content: flex-end;
`