import React, { Component } from 'react'
import { ComponentTable } from './ComponentTable'
import { FaHistory, FaGraduationCap } from 'react-icons/fa'

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [month, day, year].join('/');
}

export class List extends Component {

  constructor(props) {
    super(props);
    this.state = {

      filtered: [],
      black: true,
      header: [],
    };
  }

  componentDidMount() {
    this.setState({
      filtered: this.props.items,
      header: [
        {
                  Header: "Project Title",
                  accessor: "initiativeTitle",
                  style: {
                    paddingLeft: '20px',
                    paddingRight: '20px',
                    margin: 'auto',
                    textOverflow: 'ellipsis',
                  },
                  minWidth: 150,
                  Cell: props => {
                    let text_role = this.props.role;
                    let param = props.original.assign[0].roleId;
                    switch(param) {
                      case 1:
                          text_role = text_role[param-1].roleName
                          break
                      case 2:
                          text_role = text_role[param-1].roleName
                          break
                      case 3:
                          text_role = text_role[param-1].roleName
                          break
                      case 4:
                          text_role = text_role[param-1].roleName
                          break
                      case 5:
                          text_role = text_role[param-1].roleName
                          break
                      default:
                          break
                    }
                    return(
                      <div>
                          <div className='title'>{props.original.initiativeTitle}</div>
                          <div className='created-date'>
                            <span className="alignLeft pr-5">Created: {formatDate(props.original.projectCreatedDate)}</span>
                            <span className="alignRight pl-5">Role: {text_role}</span>
                          </div>
                      </div>
                    )
                  }
                },
                {
                  Header: "Initiating",
                  accessor: "projectStatus",
                  style: {
                    textAlign: 'center',
                    margin: 'auto'
                  },
                  sortable: true,
                  Cell: props => {
                    let btn_class;
                    let button_text;
                    const data = props.original
                    if (data.projectStatus === 11) {
                      btn_class = "btn btn-draft text-white" 
                      button_text = "Draft" 
                    } else if (data.projectStatus === 14) {
                      btn_class = "btn btn-need-revise text-white";
                      button_text = (data.assign[0].roleId === 2 || data.assign[0].roleId === 5) ? "Need Your Revise":"In Revise"
                    } else if (data.projectStatus === 12){
                      btn_class = "btn btn-need-approval text-white";
                      button_text = (data.assign[0].roleId === 1 ) ? "Need Your Approval" : "In Review Owner "
                    } else if (data.projectStatus === 13) {
                      btn_class = "btn btn-need-approval text-white";//btn-change-owner"
                      button_text = (data.assign[0].roleId === 4 ) ? "Need Your Approval" : "In Review Sponsor "//"Approved"
                    } else if (data.projectStatus === 51) {
                      btn_class = "btn btn-disapprove text-white"
                      button_text = "Dissaproved"
                    } else {
                      btn_class = "btn btn-change text-white ";
                      button_text = "Approved"
                    }

                    return(
                      <button className={btn_class} onClick={()=>{
                        this.props.history.push(`/project/${props.original.projectId}`);
                      }}>{button_text}</button>
                    )
                  },
                  minWidth: 50
                },
                {
                  Header: "Planning",
                  accessor: "projectStatus",
                  style: {
                    textAlign: 'center',
                    margin: 'auto'
                  },
                  sortable: true,
                  Cell: props => {
                    let button_text;
                    let btn_class;
                    let canOpen = false;
                    const data = props.original
                    if (data.projectStatus >= 31 && data.projectStatus <= 50) {
                      btn_class = "btn btn-change text-white";
                      button_text = "Approved"
                    } else if (data.projectStatus === 24) {
                      btn_class = "btn btn-need-revise text-white";
                      button_text = (data.assign[0].roleId === 2 || data.assign[0].roleId === 5) ? "Need Your Revise":"In Revise"
                    } else if (data.projectStatus === 22){
                      btn_class = "btn btn-need-approval text-white";
                      button_text = (data.assign[0].roleId === 1) ? "Need Your Approval" : "In Review Owner"
                    } else if (data.projectStatus === 23){
                      btn_class = "btn btn-need-approval text-white";
                      button_text = (data.assign[0].roleId === 4) ? "Need Your Approval" : "In Review Sponsor"
                    } else if (data.projectStatus === 21) {
                      btn_class = "btn btn-draft text-white"
                      button_text = "Draft"
                    } else if (data.projectStatus === 52) {
                        btn_class = "btn btn-disapprove text-white"
                        button_text = "Dissaproved"
                    } else {
                      btn_class = "btn btn-default text-white"
                      button_text = "Not Available"
                      canOpen = true;
                    }
                    return(
                      <button disabled={canOpen} className={btn_class} onClick={()=>{
                        this.props.history.push(`/project/${props.original.projectId}/planning`);
                      }}>{button_text}</button>
                    )
                  },
                  minWidth: 50
                },
                {
                  Header: "Executing",
                  accessor: "projectStatus",
                  style: {
                    textAlign: 'center',
                    margin: 'auto'
                  },
                  sortable: true,
                  Cell: props => {
                    let button_text;
                    let btn_class;
                    let canOpen;
                    const data = props.original
                    if (data.projectStatus >= 31 && data.projectStatus < 50) {
                      btn_class = "btn btn-draft text-white"
                      button_text = "Available"
                    } else if(data.projectStatus === 50) {
                      btn_class = "btn btn-change text-white"
                      button_text = "Approved"
                    } 
                    else {
                      btn_class = "btn btn-default text-white"
                      button_text = "Not Available"
                      canOpen = true
                    }
                    return(
                      <button disabled={canOpen} className={btn_class} onClick={()=>{
                        this.props.history.push(`/project/${props.original.projectId}/executing`);
                      }}>{button_text}</button>
                    )
                  },
                  minWidth: 50
                },
                {
                  Header: "Closing",
                  accessor: "projectStatus",
                  style: {
                    textAlign: 'center',
                    margin: 'auto'
                  },
                  sortable: true,
                  Cell: props => {
                    let button_text;
                    let btn_class;
                    let canOpen;
                    const data = props.original
                    if (data.projectStatus === 50) {
                      btn_class = "btn btn-change text-white";
                      button_text = "Approved"
                    } else if (data.projectStatus === 44) {
                      btn_class = "btn btn-need-revise text-white";
                      button_text = (data.assign[0].roleId === 2 || data.assign[0].roleId === 5) ? "Need Your Revise":"In Revise"
                    } else if (data.projectStatus === 42){
                      btn_class = "btn btn-need-approval text-white";
                      button_text = (data.assign[0].roleId === 1) ? "Need Your Approval" : "In Review Owner"
                    } else if (data.projectStatus === 43){
                      btn_class = "btn btn-need-approval text-white";
                      button_text = (data.assign[0].roleId === 4) ? "Need Your Approval" : "In Review Sponsor"
                    } else if (data.projectStatus >= 31 && data.projectStatus < 50) {
                      btn_class = "btn btn-draft text-white"
                      button_text = "Draft"
                    // } else if (data.projectStatus === 54) {
                    //     btn_class = "btn btn-disapprove text-white"
                    //     button_text = "Dissaproved"
                    } else{
                      btn_class = "btn btn-default text-white"
                      button_text = "Not Available"
                      canOpen = true;
                    }
                    return(
                      <button disabled={canOpen} className={btn_class} onClick={()=>{
                        this.props.history.push(`/project/${props.original.projectId}/closing`);
                      }}>{button_text}</button>
                    )
                  },
                  minWidth: 50
                },
                {
                  Header: "Action",
                  style: {
                    textAlign: 'center',
                    margin: 'auto'
                  },
                  sortable: false,
                  Cell: props =>
                      <div>
                          <button className='btn btn-document ml-0'onClick={()=>this.props.history.push(`/history/${props.original.projectId}`)}><FaHistory size={15}/></button>
                          {/*<button className='btn btn-view ml-1'><FaEyeSlash size={15}/></button>*/}
                          <button className='btn btn-lesson-learned ml-1' onClick={()=>this.props.history.push(
                            {
                              pathname: `/project/${props.original.projectId}/lesson-learned`,
                              state: {
                                id: parseInt(localStorage.getItem('id')),
                                username: localStorage.getItem('username'),
                                initiativeTitle: props.original.initiativeTitle
                              }
                            }
                            )}><FaGraduationCap size={15}/></button>
                      </div>,
                  minWidth: 50
                }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      filtered: nextProps.items
    });
  }

  render() {
      
      return (
          <div className="h-100">
            <ComponentTable 
              items={this.state.filtered}
              header={this.state.header}
              {...this.props}>
            </ComponentTable>
          </div>
      )
  }
}