import styled from 'styled-components'

export const ContentLayout = styled.div`
display: flex;
flex-direction: column;
padding: 1.5vw 3vw 1.5vw 3vw;
`

export const TitleBar = styled.div`
background-color: ${props => props.theme.color.dark_purple};
color: #FFF;
font-size: 1.1vw;
font-weight: 600;
padding: 1vw 0 1vw 0;
margin-bottom: 1vw;
text-align: center;
`

export const DescTitle = styled.span`
font-style: italic;
opacity: 0.7;
`

export const ButtonLayout = styled.div`
display: flex;
justify-content: flex-end;
`

export const Btn = styled.button`
color: #FFF;
padding: 0.7vw 3vw;
letter-spacing:2px;
border-radius: 30px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;

&:disabled {
    background-color: #ADADAD !important;
}
`

export const BtnAdd = styled.button`
color: #FFF;
padding: 0.7vw 3vw;
border-radius: 10px;
font-size: 1vw;
font-weight: 500;
background-color: mediumseagreen;
width: 30%;

&:focus {
    outline: 0 !important;
}
`

export const BtnApprove = styled(Btn)`
background-color: ${props => props.theme.color.dark_purple };
border-color: ${props => props.theme.color.dark_purple };
padding-left: 0.7vw;
border-radius: 10px;
width: 139px;

&:hover{
   color: ${props => props.theme.color.dark_purple };
   background-color: #FFF !important;
}

&:disabled {
    background-color: #ADADAD !important;
}
`

export const BtnDecline = styled(Btn)`
color: ${props => props.theme.color.dark_purple} !important;
background-color: transparent;
border-color: ${props => props.theme.color.dark_purple};
padding-left: 0.7vw;
border-radius: 10px;
width: 139px;

&:hover{
   color: #FFF !important;
   background-color: ${props => props.theme.color.dark_purple };
}

&:disabled {
    background-color: #ADADAD !important;
}
`

export const BtnApproval = styled(Btn)`
color: ${props => props.theme.color.dark_purple};
background-color: '#FFF';
border-color: ${props => props.theme.color.dark_purple};
padding-left: 0.7vw;
border-radius: 10px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;

&:hover{
    color: ${props => props.disabled ?'inherit':'#FFF'};
   background-color: ${props => props.disabled? 'inherit':props.theme.color.dark_purple };
   cursor: ${props => props.disabled ?'inherit':'pointer'};
}
`


export const Label = styled.span`
  font-size: 0.8vw;
  font-weight: 150;
   color: inherit;
   cursor: inherit;
`