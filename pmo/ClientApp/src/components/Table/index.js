import ReactTable from "react-table";
import "react-table/react-table.css";
import React, {useState, useEffect} from 'react'
import Pagination from '../ExistingProject/Pagination'
import Header from "./header";

const CustomTable = (props) => {
  
  const data = props.data
  const [filteredData,setData] = useState(data)
  const [sort,setSort] = useState(0)
  const [page,setPage] = useState(0)
  const [clickedRow,setClickedRow] = useState(null)


  useEffect(() => {setData(data)}, [data])
  useEffect(() => {setPage(0)}, [filteredData])
  useEffect(() => {}, [props.isPreview])

    return (
        <>
          {props.filter === "ll" && <Header label={props.label} data={props.data} set={e => setData(e)} setSort={e => setSort(e)}/>}
          {/* {props.filter === "cr" && <Header label={props.label} data={props.data} set={e => setData(e)} setSort={e => setSort(e)}/>} */}
          <ReactTable
            PaginationComponent={Pagination}
            sortable={false}
            sorted={[
              {
               id: props.id,
               desc: sort ? false : true
              }
            ]}
            data={filteredData}
            page={page}
            onPageChange={setPage}
            total={props.total}
            columns={props.column}  
            loading={props.loading}
            defaultPageSize={10}
            className="-striped -highlight"
            getTdProps={(state, rowInfo, column) => {
              if (rowInfo && rowInfo.row) {
                return {
                    onClick: (e) => {
                      const idLL = rowInfo.row._original[props.id];
                      column.Header !== "" && props.onClickRow(idLL,rowInfo.original) 
                    }
                  }
                }else{
                  return {}
                }
              }
            }
            getTrProps={(state,rowInfo,column)=> {
              return {
                onClick: (e) => {
                  const idLL = rowInfo.original.changeRequestId 
                  setClickedRow(idLL)
                },
                ...props.isPreview && {
                  style:{
                    background : rowInfo && clickedRow === rowInfo.original.changeRequestId && '#5BDBFF',
                  }
                }
              }
            }}
          />
        </>
    )
}

export default CustomTable
