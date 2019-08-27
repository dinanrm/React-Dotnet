import React, {useState, useEffect} from 'react'
import { TableLayout } from './style'
import { Table } from 'reactstrap'
import { status } from '../History/status'
import api from '../../utils/api';

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

const LogHistory = (props) => {

	const [item, setItem] = useState([])

	const fetchHistory = async() => {
		const {data} = await api.histories.byProjectId(props.match.params.id)
		
		var sortedList = data && data.sort((a,b) => {
          return new Date(b.historyModifiedDate) - new Date(a.historyModifiedDate);
        });
        setItem(sortedList)
	}

	useEffect(() => {
      fetchHistory();
    }, [])

	return (
	  <React.Fragment>
		<TableLayout>
	        <Table striped>
	          <thead>
	            <tr>
	              <th>Date</th>
	              <th>Status</th>
	              <th>Name</th>
	              <th>Role</th>
	              <th>Reason/Comment</th>
	            </tr>
	          </thead>
	          <tbody>
	            {item.length === 0 ?
	              ( <tr>
	                  <th scope="row" colSpan="5" className="text-center">Data Empty</th>
	                </tr>):
	              (
	                item.map((data,key) => {
	                const date = formatDate(data.historyModifiedDate)
	                return (
	                  <tr key={key}>
	                    <td>{date}</td>
	                    <td>{status[data.user.role.roleId-1].input[data.statusAfter]}</td>
	                    <td>{data.user.userName}</td>
	                    <td>{data.user.role.roleName}</td>
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

export default LogHistory