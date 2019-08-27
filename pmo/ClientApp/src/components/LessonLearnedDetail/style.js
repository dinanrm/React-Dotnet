import styled from 'styled-components'

export const ContentLayout = styled.div`
display: flex;
flex-direction: column;
padding: 1.5vw 3vw 1.5vw 3vw;
`

export const HeaderLayout = styled.div`
display:flex;
justify-content:space-between;
align-items: center;
background-color: ${props => props.theme.color.gray};
padding: 1vw;
`
export const HeaderText = styled.span`
font-weight: 600;
font-size: 1.2rem;
color: ${props => props.theme.color.dark_purple};
`

export const BodyLayout = styled.div``

