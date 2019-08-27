import React from 'react'
import { TableLayout } from './style'
import { Table } from 'reactstrap'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

function formatDate(date) {
	if (date === '') {
		return ''
	} else {
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
}

const ProjectCompletion = (props) => {

	const dataHistory = props.item

	return (
	  <React.Fragment>
		<TableLayout>
	        <Table striped>
	          <thead>
	            <tr>
	              <th>Project Role</th>
	              <th>Name</th>
	              <th>Comment</th>
	              <th>Date</th>
	            </tr>
	          </thead>
	          {Object.keys(dataHistory).length === 3 ?
	              (<tbody>
	              	<tr>
	              	  <td>Project Manager</td>
	              	  <th scope="row" colSpan="3"/>
	                </tr>
	                <tr>
	          		<td>Project Owner</td>
	          		<th scope="row" colSpan="3">Data Empty</th>
	          		</tr>
	          		<tr>
	          		<td>Project Sponsor</td>
	          		<th scope="row" colSpan="3"/>
	          		</tr>
	                </tbody>):
		          (<tbody>
		          	<tr>
		          		<td>Project Manager</td>
		          		<td>{dataHistory.manager_name}</td>
		          		<td>{dataHistory.manager.comment}</td>
		          		<td>{formatDate(dataHistory.manager.historyModifiedDate)}</td>
		          	</tr>
		          	<tr>
		          		<td>Project Owner</td>
		          		<td>{dataHistory.owner_name}</td>
		          		<td>{dataHistory.owner.comment}</td>
		          		<td>{formatDate(dataHistory.owner.historyModifiedDate)}</td>
		          	</tr>
		          	<tr>
		          		<td>Project Sponsor</td>
		          		<td>{dataHistory.sponsor_name}</td>
		          		<td>{dataHistory.sponsor.comment}</td>
		          		<td>{formatDate(dataHistory.sponsor.historyModifiedDate)}</td>
		          	</tr>
		          </tbody>)
	      	  }
	        </Table>
        </TableLayout>
      </React.Fragment>
	)
}

export default ProjectCompletion