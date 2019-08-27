import React, { Component } from 'react'
import { ComponentTable } from './componentTable'
import { FaEyeSlash, FaGraduationCap } from 'react-icons/fa'

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
      header: []
    };
    this.handleChange = this.handleChange.bind(this);
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
                    let btn_class = "btn btn-change ";
                    let button_text = "Approved";

                    return(
                      <button className={btn_class} onClick={()=>{
                        // this.props.history.push(`/project/${props.original.projectId}`);
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
                    let btn_class = "btn btn-change ";
                    let button_text = "Approved";

                    return(
                      <button className={btn_class} onClick={()=>{
                        // this.props.history.push(`/managementPlanning/${props.original.projectId}`);
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
                    let btn_class = "btn btn-change ";
                    let button_text = "Approved";

                    return(
                      <button className={btn_class} onClick={()=>{
                        
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
                    let btn_class = "btn btn-change ";
                    let button_text = "Approved";

                    return(
                      <button className={btn_class} onClick={()=>{
                        
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
                          <button className='btn btn-view ml-1'><FaEyeSlash size={15}/></button>
                          <button className='btn btn-lesson-learned ml-1'><FaGraduationCap size={15}/></button>
                      </div>,
                  minWidth: 50
                }
      ]
    });
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   filtered: nextProps.items
    // });
  }
    
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  handleChange(e) {
    let currentList = [];
    let newList = [];
        
    if (e.target.value !== "") {
      currentList = this.props.items;
      newList = currentList.filter(item => {
        const lc = item.initiativeTitle.toString().toLowerCase();
        // const lc2 = item.projectCategory.toString().toLowerCase();
        // const lc3 = item.projectDescription.toString().toLowerCase();
        // const lc4 = item.projectStatus.toString().toLowerCase();
        // const lc5 = item.projectCreatedDate.toString().toLowerCase();
        // change search term to lowercase
        const filter = e.target.value.toString().toLowerCase();
        return lc.includes(filter);
        // || lc2.includes(filter) || lc3.includes(filter) || lc4.includes(filter) || lc5.includes(filter);
      });
    } else {
      newList = this.props.items;
    }
    this.setState({
      filtered: newList
    });
    this.props.handleChange(this.state.filtered)
  }
    
  render() {
      return (
          <div className="h-100">
            <div className="search-box" >
              <form>
                Search :
                <input type="search" className="input" onChange={this.handleChange} onKeyPress={this.handleKeyPress} placeholder="Search for..."></input>
                
              </form>
            </div>
            <ComponentTable 
              items={this.state.filtered}
              header={this.state.header}
              {...this.props}>
            </ComponentTable>
          </div>
      )
  }
}