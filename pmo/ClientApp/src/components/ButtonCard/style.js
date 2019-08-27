import styled from 'styled-components'


export const Card = styled.div`
    /* left: 261px; */
    top: 327px;
    width: 11vw;
    height: 12vw;
    min-width: 80px;
    min-height: 86px; 
    border-radius: 2em;
    margin-left:auto;
    margin-right:auto;
    display:block;
    background-color: ${props => props.theme.color.light_green};
    background-image: linear-gradient(${props => props.theme.color.light_green},${props => props.theme.color.light_blue});
`

export const CardBody = styled.div`
    margin-left:auto;
    margin-right:auto;
    word-wrap: break-word;
`

export const CardDesc = styled.div`
    text-align: center;
    color: ${props => props.theme.color.light_brown};
    padding-top: 1em;
    font-size: large;
    width: 4.5em;
    margin-left: auto;
    margin-right: auto;
`

export const ButtonCardContainer = styled.button`
    background-color: transparent;
    border: 0px;
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    -webkit-transition: all .2s cubic-bezier(.645,.045,.355,1);
    transition: all .2s cubic-bezier(.645,.045,.355,1);
`

export const ImageCard = styled.img`
    height: 10vw;
    width: 10vw;
`