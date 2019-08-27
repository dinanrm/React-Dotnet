import styled from 'styled-components'

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

export const Checkbox = styled.input.attrs(props => ({
    type: "checkbox",
    size: props.size || "10em",
  }))`
transform: scale(4);
`

export const Btn = styled.button`
color: #FFF;
padding: 0.7vw 3vw;
letter-spacing:2px;
border-radius: 30px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;
background-color : ${props => props.className.match("btn-purple") && props.theme.color.dark_purple};
opacity: ${props => props.className.match("btn-purple") && 0.9};

&:hover{
  color:${props => props.className.match("btn-purple") && '#FFF' };
  background-color:${props => props.className.match("btn-purple") && props.theme.color.dark_purple};
  opacity: ${props => props.className.match("btn-purple") && 1};
}

&:disabled{
  color:${props => props.className.match("btn-purple") && '#FFF' };
  background-color : ${props => props.className.match("btn-purple") && props.theme.color.dark_purple};
  opacity: ${props => props.className.match("btn-purple") && 0.5};
}
`

export const Error = styled.span`
color: ${props => props.theme.color.dark_red};
`

export const OptionLayout = styled.div`
position: flex;
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