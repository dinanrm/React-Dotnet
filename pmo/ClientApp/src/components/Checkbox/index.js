// import 'semantic-ui-css/semantic.min.css'
import { Dropdown, Grid, Segment } from 'semantic-ui-react'
import React, { Component } from 'react'
import api from '../../utils/api';

export class CustomSelectSearch extends Component {
    constructor(props){
      super(props)

      this.state = { list: [], loading: true };
      this.handleChange = (e, { value }) => this.setState({ value })

      fetch('http://172.22.201.142:5000/api/users')
        .then(response => response.json())
        .then(data => {
          this.setState({ 
            list: data.map(d => ({
              key: d.userId,
              text: d.userName,
              value: d.userId,
            })),
            loading: false 
          });
        });
      
  }
  
  render() {
    const { value } = this.state
    return (
      <Dropdown
        placeholder='Select User'
        clearable
        fluid
        multiple
        search
        selection
        options={this.state.list}
        onChange={this.handleChange}
      />
    )
  }
}