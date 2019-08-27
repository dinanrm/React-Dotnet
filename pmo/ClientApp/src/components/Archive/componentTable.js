import React, { Component } from 'react'
import ReactTable from 'react-table'
import Pagination from './pagination.js'

import "react-table/react-table.css";
import "./style.css";

export class ComponentTable extends Component {

  getTotalPage(total){
    return Math.ceil(total/10)
  }

	render() {
		return (
			<ReactTable
              PaginationComponent={Pagination}
              data={this.props.items}
              pages={this.getTotalPage(this.props.total)}
              page={this.props.currentPage}
              loading={this.props.loading}
              manual
              onPageChange={(page) => this.props.changePage(page)}
              resolveData={data => data.map(row => row)}
              defaultPageSize={10}
              resizable={false}
              getTableProps={(state, rowInfo, column, instance) => {
                return {
                  style: {
                    width: '100%',
                    paddingLeft: '30px',
                    paddingRight: '30px',
                  }
                }
              }}

              getTheadProps={(state, rowInfo, column, instance) => {
                return {
                  style: {
                    color: 'black',
                    fontSize: '18px',
                    paddingTop: '1vh',
                    paddingBottom: '1vh',
                    border: '1px solid'
                  }
                }
              }}

              getTrProps={(state, rowInfo, column, instance) => {
                if (rowInfo && rowInfo.row) {
                  
                  return {
                    style: {
                        color: 'darkslateblue',
                        backgroundColor: rowInfo.viewIndex%2===0 ? '#EBEAF1' : 'transparent',
                      }

                  }
                } else{
                  return {
                  }
                }
              }}

              getTdProps={(state, rowInfo, column, instance) => {
                if (rowInfo && rowInfo.row) {
      			    return {
                  style: {
                    borderCollapse: 'collapse',
                    borderBottom: rowInfo.viewIndex-9===0 ? '1px solid #DCDCDC' : '0px',
                    height: '3.6vw',
                    width: '100%',
                    border: '1px solid black',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: column.id !== "initiativeTitle" ? 'center' : 'left',
                    margin: '0 0 0 0'
                  },
      			      onClick: (e, handleOriginal) => {
      			      }
                }
      			    } else {
                  return{}
                }
      			  }}

              getProps={(state,rowInfo, column, instance) => {
                return {
                }
              }}

              columns={this.props.header}
            />
		)
	}
}