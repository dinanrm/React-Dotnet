import React from 'react'
import { TableLayout } from './style'
import { Table } from 'reactstrap'
import { status } from './status'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate(date) {
    var d = new Date(date),
        month = '' + monthNames[d.getMonth()],
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hours = d.getHours(),
        minutes = d.getMinutes();
    if (day < 10) day = '0' + day;
    if (minutes < 10) minutes = '0' + minutes;

    return [day, month, year].join(' ') + ', ' + hours + ':' + minutes;
}

const History = (props) => {

	const dataHistory = props.item
	var sortedList = dataHistory && dataHistory.sort((a,b) => {
          return new Date(b.historyModifiedDate) - new Date(a.historyModifiedDate);
        });

	return (
	  <React.Fragment>
		<TableLayout>
	        <Table striped>
	          <thead>
	            <tr>
	              <th>Date</th>
	              <th>Status</th>
	              <th>Name</th>
	              <th>Reason/Comment</th>
	            </tr>
	          </thead>
	          <tbody>
	            {sortedList.length === 0 ?
	              ( <tr>
	                  <th scope="row" colSpan="4"className="text-center">Data Empty</th>
	                </tr>):
	              (
	                sortedList.map((data,key) => {
	                const date = formatDate(data.historyModifiedDate)
	                return (
	                  <tr key={key}>
	                    <th scope="row">{date}</th>
	                    <td>{status[props.role_param-1].input[data.statusAfter]}</td>
	                    <td>{data.user.userName}</td>
	                    <td>{data.comment}</td>
	                  </tr>
	                )
	                })
	              )
	            }
	          </tbody>
	        </Table>
        </TableLayout>
      </React.Fragment>
	)
}

export default History