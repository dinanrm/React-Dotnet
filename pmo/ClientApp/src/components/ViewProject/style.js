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

export const BottomLayout = styled.div`
display: flex;
justify-content: space-between;
`

export const ButtonLayout = styled.div`

`

export const UploadLayout = styled.div`
width: 20em;
`

export const Btn = styled.button`
color: #FFF;
padding: 0.7vw 3vw;
letter-spacing:2px;
border-radius: 30px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;
`

export const BtnApprove = styled.button`
/* background-color: ${props => props.theme.color.dark_purple };
border-color: ${props => props.theme.color.dark_purple };
color: #FFF;
padding-left: 0.7vw;
border-radius: 10px;

&:hover{
   color: ${props => props.theme.color.dark_purple };
   background-color: #FFF !important;
} */
color: ${props => props.theme.color.dark_purple};
background-color: '#FFF';
border-color: ${props => props.theme.color.dark_purple};
padding-left: 0.7vw;
padding-bottom: 0;
border-radius: 10px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;

&:hover{
   color: #FFF;
   background-color: ${props => props.theme.color.dark_purple };
   cursor: pointer;
}
`

export const BtnDecline = styled(BtnApprove)``
// color: ${props => props.theme.color.dark_purple};
// background-color: '#FFF';
// border-color: ${props => props.theme.color.dark_purple};
// padding-left: 0.7vw;
// border-radius: 10px;

// &:hover{
//    color: #FFF !important;
//    background-color: ${props => props.theme.color.dark_purple };
// }
// `

export const Label = styled.label`
color: ${props => props.theme.color.dark_purple};
font-size: 1.2rem;
font-weight: 600;
` 
export const LabelButton = styled.label`
   font-size: 1.2rem;
   font-weight: 600;
   color: inherit;
   cursor: inherit;
`