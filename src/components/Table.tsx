import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TableData from '../TableData';
import { url } from '../settings';
function Table() {
  const tableData = useSelector((state: any) => state.tableData);
  const dispatch = useDispatch();
  const getApiData = async () => {
    const response = await fetch(url.character)
    const data = await response.json()
    return data;
  }
  const updateTableData = async () => {
    const receivedData = await getApiData()
    const info = receivedData.results.map((result: { name: any, status: any, species: any, image: any, id: number }) => {
      return {
        name: result.name,
        status: result.status,
        species: result.species,
        image: result.image,
        id: result.id,
      }
    })
    dispatch({ type: 'update', data: info })
  }
  useEffect(() => {
    if (tableData.rows.length === 0) {

      updateTableData()
    }
  });
  return <div><TableData dataForTable={tableData} /></div>
}
export default Table;