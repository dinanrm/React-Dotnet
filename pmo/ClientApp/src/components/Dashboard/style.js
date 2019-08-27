import styled from 'styled-components'

export const Layout = styled.div`
`

export const HeaderTable = styled.div`
	border-style: none none ridge none;
`

export const TopLayout = styled.div`
	display: flex;
	padding-top: 50px;
	padding-left: 30px;
	padding-right: 30px;
`

export const GroupLayout = styled.div`
	display: flex;
`

export const GroupLayout1 = styled.div`
	margin: auto;
`

export const GroupLayout2 = styled.div`
	width: 70%;
`

export const BotLayout = styled.div`
	display: flex;
	padding-top: 50px;
	padding-left: 30px;
	padding-right: 30px;
	padding-bottom: 50px;
`

export const BigBox = styled.div`
	width: 18vw;
    height: 16vw;
    background-color: ${props => props.box_color};
    margin: auto;
    color: white;
	text-align: center;
	vertical-align: middle;
	font-size: 8.5vw;
`

export const BigTitle = styled.div`
	width: 18vw;
	height: 3.7vw;
	background-color: ${props => props.title_color};
	color: white;
	text-align: center;
	vertical-align: middle;
	font-size: 2.4vw;
`

export const BoxAllProject = styled.div`
	width: 12vw;
    height: 10vw;
    background-color: ${props => props.box_color};
    margin: auto;
    color: white;
	text-align: center;
	vertical-align: middle;
	font-size: 5.5vw;
`

export const TitleAllProject = styled.div`
	width: 12vw;
	height: 2.3vw;
	background-color: ${props => props.title_color};
	color: white;
	text-align: center;
	vertical-align: middle;
	font-size: 1.5vw;
`

export const TableLayout = styled.div`
	border-style: groove;
	box-shadow: 5px 5px #888888;
	margin: 10px;
	width: 33%;
	height: 25.8vw;
	vertical-align: middle;
	font-size: 1.5vw;
	border-radius: 10px;
	overflow: auto;
`

export const Font = styled.p`
	color: #0000CD;
	font-size: 1.4vw;
	line-height: 1.4;
`

export const Button = styled.button`
	color: #0000CD;
	font-size: 1.3vw;
`

export const DateFont = styled.p`
	color: #696969;
	font-size: 1.1vw;
`

export const TitleBar = styled.div`
	background-color: #302E76;
	color: #FFF;
	font-size: 1.1vw;
	font-weight: 600;
	padding: 1vw 0 1vw 0;
	margin-bottom: 1vw;
	margin-left: 3vw;
	margin-right: 3vw;
	text-align: center;
`