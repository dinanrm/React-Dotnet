import React, { Component } from 'react'
import { Consumer } from '../../utils/context'
import { HeaderContainer, Title, Welcome, Nav, CreateProject} from'./style'
import { Link } from 'react-router-dom'

export default class NavMenu extends Component {

  render() {
    const title = "PROJECT MANAGEMENT OFFICE"

    return (
        <Consumer>
            {({state}) =>

            <HeaderContainer className="d-flex align-items-center text-white flex-nowrap">
                <Nav className="col-2 text-center px-0">
                    <Welcome>Halo, {state.username}!</Welcome>
                </Nav>
                <Nav className="col-7">
                    <Title>{title}</Title>
                </Nav>
                <Nav className="col-2">
                    <Link to="/create-project">
                        <CreateProject className="btn btn-success btn-lg">+ CREATE PROJECT</CreateProject>
                    </Link>
                </Nav>
                <Nav className="col-1">
                </Nav>
            </HeaderContainer>
           
        }
        </Consumer>
    )
  }
}
