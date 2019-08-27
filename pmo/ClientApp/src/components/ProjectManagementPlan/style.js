import styled from 'styled-components'

export const ContentLayout = styled.div`
display: flex;
flex-wrap: wrap;
`

export const SpanLayout = styled.span`
width: 69%;
margin: auto;
text-align: left;
`

export const SpanOut = styled.div`
background-color: lightgrey;
width: 100%;
border-radius: 10px;
overflow: hidden;
display: block;
position: relative;
`

export const SpanProgressBar = styled.div`
float: left;
width: ${props => props.value}%;
background-color: mediumseagreen;
margin: auto;
text-align: center;
border-radius: 10px;
color: white;
`

export const BtnFile = styled.span`
	position: relative;
	overflow: hidden;
  border-radius: 10px;
  font-size: 1vw;
  font-weight: 500;
  padding: 0.7vw 1vw;
background-color: ${props => props.disabled ? '#ADADAD':'#0074E1'};
  color: #FFF;

&:disabled {
    background-color: #ADADAD !important;
}
&:hover {
    cursor: ${props => props.disabled ?'inherit':'pointer'};
}
`

export const UploadedIconLayout = styled.span`
    color: ${props => (props.approve && props.theme.color.light_green) || (props.disapprove && props.theme.color.dark_red)};
`

export const BtnInput = styled.input`
	position: absolute;
  top: 0;
  right: 0;
  min-width: 100%;
  min-height: 100%;
  font-size: 100px;
  text-align: right;
  filter: alpha(opacity=0);
  opacity: 0;
  outline: none;   
  cursor: inherit;
  display: block;
&:disabled {
    background-color: #ADADAD !important;
}
`

export const UploadLayout = styled.div`
display: flex;
flex-wrap: wrap;
border: 1px groove lightgrey;
border-radius: 5px;
width: 65%;
`

export const Span = styled.div`
width: 100%;
white-space: nowrap;
text-overflow: ellipsis;
overflow: hidden;
`

export const TextArea = styled.textarea`
height: 75px;
`

export const Btn = styled.button`
color: #FFF;
padding: 0.7vw 2.4vw;
border-radius: 10px;
font-size: 1vw;
font-weight: 500;
margin: 0.4vw;
`

export const BtnSubmit = styled(Btn)`
background-color: #5680E9;

&:disabled {
    background-color: #ADADAD !important;
}
`

export const BtnDelete = styled(Btn)`
background-color: #B23850;
&:disabled {
    background-color: #ADADAD !important;
}
`

export const BtnView = styled(Btn)`
background-color: #0D19A3;
&:disabled {
    background-color: #ADADAD !important;
}
`

export const ButtonLayout = styled.div`
width: 100%;
padding-top: 0.8vw;
display: flex;
justify-content: flex-end;
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

&:disabled{
    color: #FFF;
    background-color: #ADADAD !important;
}
`

export const Label = styled.span`
  font-size: 0.8vw;
  font-weight: 150;
   color: inherit;
   cursor: inherit;
`