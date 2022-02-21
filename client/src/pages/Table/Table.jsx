
import './table.css'
import { useState, React, useEffect } from 'react';

const Table = (props) => {
    const [arrangedData, setArrangedData] = useState([])
    const [arrangedDataByRows, setArrangedDataByRows] = useState([])

    const arrangeData = (data) => {
        let rows = data.split(' ').map(row => {
            let cell = row.split('	')
            return cell;
        })
        return rows
    }
// TODO: HIGHLIGHT COLUMN (MAYBE WITH ONLY CSS - :after)
    const selectColumnHeader = (e) => {
        let columnTarget = e.target.textContent
        if (props.xAxisState) {
            const xAxisValue = arrangedData.filter(item=> {
                console.log(Object.keys(item))
                return Object.keys(item)[0] === columnTarget
            })
            props.getXAxisColumn(xAxisValue)
            console.log(xAxisValue)
        } else {
            props.selectedColumn(columnTarget)
        }
    }

    useEffect(() => {
        const rawData = localStorage.getItem('raw-data')
        const rows = arrangeData(rawData)
        setArrangedDataByRows(rows)
        let temp = rows[0].map((element,index)=> {
            let updatedData = [];
            for (let i=1; i<rows.length;i++) {
                updatedData.push(rows[i][index])
            }
            return {[element] : updatedData}
        })
        setArrangedData(temp)
    }, [])

    return (
        <div className="table-container">
            <table className="ui celled table">
                <thead>
                    <tr>
                        {arrangedData.length>1 && Object.values(arrangedData).map((element,index) => {
                            return <th key={Object.keys(element)[0]} onClick={e=>selectColumnHeader(e)}>{Object.keys(element)}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {arrangedDataByRows.length>1 && arrangedDataByRows.map((row,index) => {
                        while (index>=1) {
                            return (
                                <tr key={index}>
                                {row.map((cell,index) => {
                                    return <td key={index}>{cell}</td>
                                })}
                                </tr>
                                )
                            }
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}
export default Table;