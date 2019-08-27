import styled from 'styled-components'

export const BottomLayout = styled.div`
display: flex;
`
export const UploadLayout = styled.div`
justify-content: flex-start;
`

export const ButtonLayout = styled.div`
justify-content: flex-end;
margin-left:auto;
`

export const BtnApproval = styled.button`
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

export const LabelBtn = styled.label`
   font-size: 1.2rem;
   font-weight: 600;
   color: inherit;
   cursor: inherit;
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