import styled from 'styled-components'
import { Button } from 'reactstrap'

export const Layout = styled.div`
/* height: 100%; */
/* height: -moz-available;          
height: -webkit-fill-available;  
height: fill-available; */
`

export const Btn = styled(Button)`
color: ${props => props.theme.color.purple};
background-color: ${props => props.theme.color.orange};
padding: 0.7vw 3vw;
border-radius : 30px;
letter-spacing:2px;
`

export const ImageContainer = styled.div`
height: 38vw;
border-radius: 0 5vw 5vw 0;
background-color: ${props => props.theme.color.orange};

` 

export const Image = styled.img`
max-width:50vw;
max-height:50vw;
padding: 4%;
margin-left: 5em;
`

export const Title = styled.p`
font-size: 4vw;
font-weight: bolder;
line-height: 5vw;
padding-bottom: 1vw;
`

export const SubTitle = styled.p`
font-size: 1vw;
opacity: 0.8;
word-wrap: break-word;
text-align: justify;
font-weight: 100;
letter-spacing: 0.1vw;
line-height: 1.6vw;
padding-bottom: 2vw;
`

