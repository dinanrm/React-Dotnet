import React, { useState,useEffect } from 'react'
import { List } from './List.js'
import api from '../../utils/api';
import DatePicker from "react-datepicker";
import { Dropdown } from 'semantic-ui-react'

const ExistingProject = (props) => {
  
  const [loading,setLoading] = useState(false);
  const [sort,setSort] = useState([]);
  const [role,setRole] = useState([]);
  const [total,setTotal] = useState(0);
  const [currentPage,setCurrent] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [projectStatus, setProjectStatus] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filter, setFilter] = useState(false);
  const option = [
        { key: 1, text: 'All', value: '' }, 
        { key: 2, text: 'Active', value: '0' }, 
        { key: 3, text: 'Finished', value: '1' }, 
        { key: 4, text: 'Disapproved', value: '2' }
      ]
  const optionRole = [
        { key: 1, text: 'All', value: '' }, 
        { key: 2, text: 'Owner', value: '1' }, 
        { key: 3, text: 'Manager', value: '2' }, 
        { key: 4, text: 'Officer', value: '3' },
        { key: 5, text: 'Sponsor', value: '4' },
        { key: 6, text: 'Team', value: '5' }
      ]

  const fetchProjects = async() => {
    setLoading(true)
    setFilter(false)
    // const { data } = await api.projects.limit(props.user.id,currentPage+1)
    const { data } = await api.projects.searchProject(props.user.id,currentPage+1,{
      keyword : keyword,
      projectStatus : projectStatus,
      roleId : roleId,
      startDate : startDate,
      endDate : endDate
    })
    // const { data } = await api.projects.lists(props.user.id)
    const roleData = await api.roles.list()
    setLoading(false);
    setRole(roleData.data);
    setTotal(data.total);

    var sortedList = data.data && data.data.sort((a,b) => {
          return new Date(b.projectCreatedDate) - new Date(a.projectCreatedDate);
        });
    setSort(sortedList)
  } 

  useEffect(() => {
    fetchProjects()
  }, [])
  
  useEffect(() => {
      fetchProjects()
  }, [currentPage])

  useEffect(() => {

  }, [keyword, projectStatus, roleId, startDate, endDate])

  useEffect(() => {
    fetchProjects()
  }, [filter])

  function getFullDate(date) {
    let year = date.toLocaleDateString('en-GB', {year: 'numeric'})
    let month = date.toLocaleDateString('en-GB', {month: '2-digit'})
    let day = date.toLocaleDateString('en-GB', {day: '2-digit'})
    return `${year}-${month}-${day}`//date.toLocaleDateString('en-GB')
  }

  const changePage = async(page) => {
    setCurrent(page)
  }

  const handleChange = (newData) => {
    setSort(newData)
  }

  const handleChangeSearch = (e) => {
    setKeyword(e.target.value.toString())
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  }

  const handleChangeFilter = (e) => {
    setProjectStatus(e.toString())
  }

  const handleChangeFilterRole = (e) => {
    setRoleId(e.toString())
  }
  
  const handleChangeStart = (date) => {
    const fullDate = getFullDate(new Date(date))
    setStartDate(fullDate)
  }

  const handleChangeEnd = (date) => {
    const fullDate = getFullDate(new Date(date))
    setEndDate(fullDate)
  }

  const handleButtonGo = () => {
    setFilter(true)
    setCurrent(0)
  }

  const handleReset = () => {
    setKeyword('')
    setProjectStatus('')
    setRoleId('')
    setStartDate('')
    setEndDate('')
    setFilter(true)
  }

  const renderForecastsTable = (list, role, loading, total, currentPage, changePage, handleChange ) => {
    return (
      <div className="h-100">
          <List items={list} 
          role={role} 
          loading={loading} 
          total={total} 
          currentPage={currentPage} 
          changePage={changePage}
          handleChange={handleChange}
          setKeyword={setKeyword}
          setProjectStatus={setProjectStatus}
          setRoleId={setRoleId}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          setFilter={setFilter}
          {...props}/>
      </div>
    );
  }

  let contents = loading
    ? <div style={{margin: 'auto',padding: '10px', textAlign: 'center'}}><em>Loading...</em></div>
    : renderForecastsTable(sort, role, loading, total, currentPage, changePage, handleChange);

  return (
    <div className="h-60">
      <div className="search-box" >
        <div className="col-5 p-0">
          Search :
          <input type="search" className="input" onChange={handleChangeSearch} onKeyPress={handleKeyPress} placeholder="Search for..."></input>
        </div>
        <div className="col-7 top-layout2">
          <div className='mr-3' size='tiny'>
            <Dropdown
              className='mr-3'
              placeholder='Filter' options={option} value={projectStatus} onChange={(e, {value}) => handleChangeFilter(value)}
            />
            <Dropdown
              placeholder='Role' options={optionRole} value={roleId} onChange={(e, {value}) => handleChangeFilterRole(value)}
            />
          </div>
          <div className='mr-3'>
            <DatePicker
              className="datepicker"
              selected={startDate}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              onChange={(e) => handleChangeStart(e)}
              dateFormat={"yyyy-MM-dd"}
            />
          </div>
          <div className='mr-3'>
            <DatePicker
              className="datepicker"
              selected={endDate}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              onChange={(e) => handleChangeEnd(e)}
              minDate={startDate}
              dateFormat={"yyyy-MM-dd"}
            />
          </div>
          <button className="btn btn-secondary btn-kedua mr-3" onClick={()=>{
            handleButtonGo()
          }}>
            Go
          </button>
          <button className="btn btn-secondary btn-kedua" onClick={()=>{
            handleReset()
          }}>
            Reset
          </button>
        </div>
      </div>
      {contents}
    </div>
  );
  
}

export default ExistingProject;
