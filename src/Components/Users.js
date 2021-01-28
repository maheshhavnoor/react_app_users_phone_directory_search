import React, { useMemo, useState, useEffect } from 'react'
import { useTable,useGlobalFilter } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'
import { GlobalFilter } from './GlobalFilter'
import axios from 'axios'

export const Users = () => {
  const columns = useMemo(() => COLUMNS, [])
  const [data,setData] = useState([]);
    useEffect(() =>{
            axios.get('http://localhost:8082/api/users')
            .then(response =>{
                console.log(response)
                setData(response.data)
        })
        .catch(e=> {
            console.log(e);
        })
    },[])

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data
  },useGlobalFilter)

  const {globalFilter} = state

  return (
    <>
    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
       </table>
    </>
  )
}
