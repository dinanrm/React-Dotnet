import styled from 'styled-components'

export const MenuLayout = styled.div`
min-height: 100%;
min-width: 100%;
` 

export const BodyLayout = styled.div`
height: auto;
`

export const Sidebar = styled.div``
export const Content = styled.div`
min-height:93vh;
`

export const Button = styled.button`
  background-color: ${props => props.active && props.theme.color.light_purple };
  border-radius: 20px;
  font-weight: 400;
  font-size: 1.2vw;
  font-family: inherit;
`

export const Label = styled.span`
  /* font-size: 1.8vh; */
`