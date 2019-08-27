import React, {useState, useEffect} from 'react'
import { Table } from 'reactstrap'
import { BigBox, BigTitle, Layout, TopLayout, BotLayout, 
	BoxAllProject, TitleAllProject, TableLayout, Font, 
	DateFont, GroupLayout, GroupLayout1, GroupLayout2, Button, TitleBar } from './style'
import api from '../../utils/api';
import { Chart } from "react-charts";

function formatDate(date) {
    var d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear()
    if (day < 10) day = '0' + day;

    return [day, month, year].join('/');
}

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const Dashboard = (props) => {

	const [dataStatistic, setDataStatistic] = useState([])
	const [dataRecentApr, setDataRecentApr] = useState([])
	const [dataRecentDis, setDataRecentDis] = useState([])
	const [dataChart1, setDataChart1] = useState([])
	const [dataChart2, setDataChart2] = useState([])
	const [dataTaskProject, setDataTaskProject] = useState([])
	const [dataTaskCR, setDataTaskCR] = useState([])
	const fetchData = async() => {
		const {data} = await api.dashboard.statistic()
		const recentApr = await api.dashboard.recentApproved()
		const recentDis = await api.dashboard.recentDisapproved()
		const chart = await api.dashboard.chart()
		const userTask = await api.dashboard.userTask(localStorage.getItem('id'))
		const chartMonth = []
		const chartData = []

		setDataStatistic(data)
		setDataRecentApr(recentApr.data)
		setDataRecentDis(recentDis.data)

		chart.data.map((item, index) => {
			chartMonth.push([monthNames[item.month-1], item.initiatedProject])
			chartData.push([monthNames[item.month-1], item.finishedProject])
			return 0;
		})
		setDataChart1(chartMonth)
		setDataChart2(chartData)

		setDataTaskProject(userTask.data.projects.data)
		setDataTaskCR(userTask.data.changeRequests.data)
	}

	const series = React.useMemo(
	    () => ({
	      type: 'bar'
	    }),
	    []
	  )

	useEffect(() => {
      fetchData();

    }, [])

	return (
		<Layout>
			<TopLayout>
				<GroupLayout1>
					<BigBox box_color={'#6A5ACD'}>
						<BigTitle title_color={'#483D8B'}>
							<p>All Project</p>
						</BigTitle>
						<p>{dataStatistic.length === 0 ? 0 : dataStatistic.total}</p>
					</BigBox>
				</GroupLayout1>
				<GroupLayout2>
					<GroupLayout className="mb-5">
						<BoxAllProject box_color={'#D0007A'}>
							<TitleAllProject title_color={'#80004A'}>
								<p>Initiating</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.initiating}</p>
						</BoxAllProject>
						<BoxAllProject box_color={'#00BFFF'}>
							<TitleAllProject title_color={'#4682B4'}>
								<p>Planning</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.planning}</p>
						</BoxAllProject>
						<BoxAllProject box_color={'#f57a00'}>
							<TitleAllProject title_color={'#b35900'}>
								<p>Executing</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.executing}</p>
						</BoxAllProject>
					</GroupLayout>
					<GroupLayout>
						<BoxAllProject box_color={'#FFD700'}>
							<TitleAllProject title_color={'#b39b00'}>
								<p>Closing</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.closing}</p>
						</BoxAllProject>
						<BoxAllProject box_color={'#DC143C'}>
							<TitleAllProject title_color={'#8B0000'}>
								<p>Disapproved</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.disapproved}</p>
						</BoxAllProject>
						<BoxAllProject box_color={'#00fa9a'}>
							<TitleAllProject title_color={'#00995e'}>
								<p>Finished</p>
							</TitleAllProject>
							<p>{dataStatistic.length === 0 ? 0 : dataStatistic.finished}</p>
						</BoxAllProject>
					</GroupLayout>
				</GroupLayout2>
			</TopLayout>
			<BotLayout>
				<TableLayout>
					<Table>
						<thead>
							<tr>
								<th className="pl-5">My Task ({dataTaskProject.length === 0 && dataTaskCR.length === 0 ? 0 : dataTaskProject.length + dataTaskCR.length})</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th className="pl-4">Project ({dataTaskProject.length === 0 ? 0 : dataTaskProject.length})</th>
							</tr>
							{dataTaskProject.length === 0 ?
				              ( <tr>
				                  <th scope="row" colSpan="5" className="text-center">Data Empty</th>
				                </tr>
							  ):
				              (
				                dataTaskProject.map((data,key) => {
					                return (
					                  <tr key={key}>
					                    <td className="pl-4">
						                    <Button className="btn btn-block btn-sm text-left p-0" onClick={()=>{
						                    	if (data.projectStatus < 20 ) {
						                    		props.history.push(`/project/${data.projectId}`);
						                    	} else if (data.projectStatus < 30 && data.projectStatus > 20){
						                    		props.history.push(`/project/${data.projectId}/planning`);
						                    	} else if (data.projectStatus > 30){

						                    	}
						                    }}>{data.initiativeTitle}</Button>
						                    <DateFont>{data.role[0].roleName}</DateFont>
					                    </td>
					                  </tr>
					                )
				                })
				              )
				            }
							<tr>
								<th className="pl-4">Change request ({dataTaskCR.length === 0 ? 0 : dataTaskCR.length})</th>
							</tr>
				            {dataTaskCR.length !== 0 ?
				            	(
				            		dataTaskCR.map((data,key) => {
						                return (
						                  <tr key={key}>
						                    <td className="pl-4">
							                    <Button className="btn btn-block btn-sm text-left p-0" onClick={()=>{
							                    	props.history.push(`/project/${data.project.projectId}/executing`);
							                    }}>{data.changeRequestName}</Button>
							                    <DateFont>{data.role[0].roleName}</DateFont>
						                    </td>
						                  </tr>
						                )
					                })
					            ) : 
					            (<tr>
					            	<th scope="row" colSpan="5" className="text-center">Data Empty</th>
					            </tr>)
				            }
						</tbody>
					</Table>
				</TableLayout>
				<TableLayout>
					<Table>
						<thead>
							<tr>
								<th className="pl-5">Recent Approved Project</th>
							</tr>
						</thead>
						<tbody>
							{dataRecentApr.length === 0 ?
				              ( <tr>
				                  <th scope="row" colSpan="5" className="text-center">Data Empty</th>
				                </tr>):
				              (
				                dataRecentApr.map((data,key) => {
				                	const date = formatDate(data.projectCreatedDate)
					                return (
					                  <tr key={key}>
					                    <td className="pl-4">
						                    <Font className="text-left p-0 m-0">{data.initiativeTitle}</Font>
						                    <DateFont>date created : {date}</DateFont>
					                    </td>
					                  </tr>
					                )
				                })
				              )
				            }
						</tbody>
					</Table>
				</TableLayout>
				<TableLayout>
					<Table>
						<thead>
							<tr>
								<th className="pl-5">Recent Disapproved Project</th>
							</tr>
						</thead>
						<tbody>
							{dataRecentDis.length === 0 ?
				              ( <tr>
				                  <th scope="row" colSpan="5" className="text-center">Data Empty</th>
				                </tr>):
				              (
				                dataRecentDis.map((data,key) => {
				                	const date = formatDate(data.projectCreatedDate)
					                return (
					                  <tr key={key}>
					                    <td className="pl-4">
						                    <Font className="text-left p-0 m-0">{data.initiativeTitle}</Font>
						                    <DateFont>date created : {date}</DateFont>
					                    </td>
					                  </tr>
					                )
				                })
				              )
				            }
						</tbody>
					</Table>
				</TableLayout>
			</BotLayout>
			<TitleBar>{"Project Finished & Created Graph"}</TitleBar>
			<div
			    style={{
			      height: "20vw",
			      marginLeft: "3vw",
			      marginRight: "3vw",
			      marginBottom: "77px",
			      background: "#302E76",
		          padding: '.5rem'
			    }}
			  >
			    <Chart
			      data={[
			        {
			          label: "Project Created",
			          data: dataChart1
			        },
			        {
			          label: "Project Finished",
			          data: dataChart2
			        }
			      ]}
			      axes={[
			        { primary: true, type: "ordinal", position: "bottom" },
			        { type: "linear", position: "left", stacked: false }
			      ]}
			      series={series}
			      tooltip
			      dark
			    />
			  </div>
		</Layout>
	)
}

export default Dashboard