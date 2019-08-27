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

export const Layout = styled.div`
`

export const Label = styled.label`
	color: ${props => props.theme.color.dark_purple};
	font-size: 1.2rem;
	font-weight: 600;
` 

export const Error = styled.span`
	color: ${props => props.theme.color.dark_red};
`

export const Box = styled.div`
	background: 'rgba(0, 27, 45, 0.9)',
    padding: '.5rem',
    borderRadius: '5px'
`