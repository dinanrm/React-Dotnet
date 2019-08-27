import React, { Component } from 'react'
import { Row, Container } from 'reactstrap'
import { CenterContainer } from '../../styles/global-style'
import { links } from '../../utils/link-menu'
import { Consumer } from '../../utils/context'
import ButtonCard from '../ButtonCard'
import Footer from '../Footer';

export default class Menu extends Component {
  render() {
    return (
      <Consumer>
          {({state})=>
          <React.Fragment>
            <h1 className="text-center text-white">Welcome {state.username}</h1>
            <Container>
              <CenterContainer>
                <Row>
                    {links.map(link =>
                      <ButtonCard data={link} key={link.id}/>
                    )}
                </Row>
              </CenterContainer>
            </Container>
            <Footer/>
        </React.Fragment>
          }
      </Consumer>
    )
  }
}
