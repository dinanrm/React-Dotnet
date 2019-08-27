import styled from 'styled-components'
import img from './Login-PMO-3.jpg'

export const BackgroundContainer = styled.div`
    background-color: ${props => props.theme.color.purple};
    background-image: url(${img});
    background-size: cover; 
    min-height: 100%;
`

export const CenterContainer = styled.div`
    position: absolute;
    top: 50%; 
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center; 
`