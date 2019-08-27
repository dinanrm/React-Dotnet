import React, { Component } from 'react';
import { FaUser,FaLock } from "react-icons/fa";
import { Alert, InputGroup, InputGroupAddon, InputGroupText, Input } from 'reactstrap';
import { Container, ButtonLogin } from './style';
import '../../styles/custom.css';
import { Consumer } from '../../utils/context'
import { Redirect } from 'react-router-dom';
import api from '../../utils/api'

export default class Login extends Component {
  static displayName = Login.name;

  constructor (props) {
    super(props);
    this.state = { 
      id: null,
      username : '', 
      password: '', 
      isSubmitting: false, 
      isAuthincated: false,
      isError: false
    };
  }

  onChange = (e) => {
    this.setState({
      [e.target.name] : e.target.value,
    });
  }

  onClick = async (e,setUser) => {
    this.setState({isSubmitting : true})
    e.preventDefault();
    const { data } = await api.users.login(this.state.username,this.state.password)
    const { userId,userName } = data? data : null ;
    setUser(userId,userName);
    this.setState({isSubmitting : false})
    this.setState({isAuthincated : userId?true:false, isError: userId?false:true, id: userId})
  }

  buttonLoading = () => {
    return (
    (!this.state.isSubmitting) ?
      (
        <span>Login</span>
      )
    :
      (
        <span className="spinner-border spinner-border-xs" role="status" aria-hidden="true"></span>
      )
    )
  } 

  onDismiss() {
    this.setState({ isError: false });
  }

  render () {
    const { isAuthincated,id,username,isSubmitting, isError } = this.state;

    if (isAuthincated === true) {
      return (
          <Redirect to={{ pathname: "/", state: { id: id, username: username}}}/>
        )
    };

    return (
      <Container>
        <Consumer>
          {({login})=>
          <React.Fragment>
          <Alert color="danger" isOpen={isError} toggle={() => this.onDismiss()}>User or Password Not Found</Alert> 
          <InputGroup size="lg">
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="bg-purple text-white">
                <FaUser/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="text" className="form-control" name="username" placeholder="Username" value={this.state.username} onChange={e => this.onChange(e)} />
          </InputGroup>
          <br/>
          <InputGroup size="lg">
            <InputGroupAddon addonType="prepend">
              <InputGroupText className="bg-purple text-white">
                <FaLock/>
              </InputGroupText>
            </InputGroupAddon>
            <Input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={e => this.onChange(e)} />
          </InputGroup>
          <br/>
          <ButtonLogin className="btn btn-lg text-white btn-block" onClick={e => this.onClick(e,login)} disabled={isSubmitting}>
            {this.buttonLoading()}
          </ButtonLogin>
          <br/>
          </React.Fragment>
          }
        </Consumer>
      </Container>
    );
  }
}
