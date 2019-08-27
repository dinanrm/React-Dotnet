import React, { Component } from 'react'
import { Consumer } from '../../utils/context'
import { Switch, Route } from 'react-router-dom'
import { CenterContainer } from '../../styles/global-style'
import { Container, Row } from 'reactstrap'
import ButtonCard from '../ButtonCard'
import FormNew from '../FormNew'
import NoMatch from '../NoMatch';
import Footer from '../Footer';
export default class NewProject extends Component {
  render() {
    return (
        <Switch>
            <Route exact path="/new-project" component={Menu}></Route>
            <Route path="/new-project/major" render={(props) => <FormNew {...props} type="major" path={props}/>}></Route>
            <Route path="/new-project/minor" render={(props) => <FormNew {...props} type="minor" path={props}/>}></Route>
            <Route path="/new-project/:id" component={NoMatch}></Route>
        </Switch>
    )
  }
}

const projects = [
    {
        id: 1,
        title: "MAJOR PROJECT",
        path: "/new-project/major",
        image: "MenuPMO-05.png"
    },
    {
        id: 2,
        title: "MINOR PROJECT",
        path: "/new-project/minor",
        image: "MenuPMO-06.png"
    },
]

const Menu = () => {
    return(
        <Consumer>
        {({state}) =>
            <Container>
                <h1 className="text-center text-white">Welcome {state.username}</h1>
                <CenterContainer>
                    <Row>
                        {projects.map(project =>
                            <ButtonCard data={project} key={project.id}/>
                        )}
                    </Row>
                </CenterContainer>
                <Footer/>
            </Container>
        }
        </Consumer>
    )
}
