import React, { Component } from 'react'

export const { Provider , Consumer } = React.createContext()
export default class Context extends Component {
    getCookiees = (cname) => {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }

    state = {
        id: localStorage.getItem("id") || null,
        username: localStorage.getItem("username") ||null,
        // token : this.getCookiees('_ga')
    }
    setUser = (id,username) => {
        this.setState({id:id,username:username})
        localStorage.setItem("id",this.state.id);
        localStorage.setItem("username",this.state.username);
    }
    clearUser = () => {
      this.setState({id: null,username: null})
      localStorage.clear()
      document.cookie = ""
    }  
      
      
    render() {
        console.log('state',this.state)
    return (
      <Provider value={{ state: this.state, login: this.setUser, logout: this.clearUser}}>
          {this.props.children}
      </Provider>
    )
  }
}



