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

export const FooterTable = styled.div`
display:flex;
justify-content:flex-end;
padding:2vw;
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

export const AddFormLayout = styled.div`
border: 0.5px solid;
border-color: ${props => props.theme.color.gray};
padding: 2vw;
`

export const BottomLayout = styled.div`
display: flex;
justify-content: flex-end;
padding-top:2vw;
`

export const ButtonLayout = styled.div`
`