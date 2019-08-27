import React, { useState,useEffect } from 'react'
import { List } from './list.js'
import api from '../../utils/api';

const ExistingProject = (props) => {
  
  const [loading,setLoading] = useState(false);
  const [sort,setSort] = useState([]);
  const [role,setRole] = useState([]);
  const [total,setTotal] = useState(0);
  const [currentPage,setCurrent] = useState(0);
  // const [isSearch, setIsSearch] = useState(false);

  const fetchProjects = async() => {
    setLoading(true)
    const { data } = await api.projects.archive(props.user.id,currentPage+1)
    // const { data } = await api.projects.limit(props.user.id,currentPage+1)
    // const { data } = await api.projects.lists(props.user.id)
    const roleData = await api.roles.list()
    setLoading(false);
    setRole(roleData.data);
    setTotal(data.total);

    var sortedList = data.data.sort((a,b) => {
          return new Date(b.projectCreatedDate) - new Date(a.projectCreatedDate);
        });
    setSort(sortedList)
  } 

  // const searchProjects = async(keyword) => {
  //   setLoading(true)
  //   const { data } = await api.projects.search(keyword, props.user.id, currentPage+1)

  //   var sortedList = data.data.sort((a,b) => {
  //         return new Date(b.projectCreatedDate) - new Date(a.projectCreatedDate);
  //       });
  //   setSort(sortedList)
  // }

  useEffect(() => {
    fetchProjects()
  }, [])
  
  useEffect(() => {
    // if(!isSearch) {
      fetchProjects()
    // } else {

    // }
  }, [currentPage])

  const changePage = async(page) => {
    setCurrent(page)
  }

  const handleChange = (newData, page) => {
    setSort(newData)
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
          {...props}/>
      </div>
    );
  }

  let contents = loading
    ? <div style={{margin: 'auto',padding: '10px', textAlign: 'center'}}><em>Loading...</em></div>
    : renderForecastsTable(sort, role, loading, total, currentPage, changePage, handleChange);

  return (
    <div className="h-100">
      {contents}
    </div>
  );
  
}

export default ExistingProject;
