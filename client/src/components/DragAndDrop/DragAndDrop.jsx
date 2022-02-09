import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { arrangeData as organizeData } from '../../services/services';
import { useXaxisState, useYaxisState } from "../../context/graph.context"
import './drag-and-drop.css'

const DragAndDrop = (props) => {

    const [headers, setHeaders] = useState({ headers: [], xAxis: [], yAxis: [] })
    const [organizedData, setOrganizedData] = useState([])
    const [organizedDataByRows, setOrganizedDataByRows] = useState([])
    const [Xaxis, setXaxis] = useXaxisState()
    const [Yaxis, setYaxis] = useYaxisState()

    const selectedColumn = (selectedXaxis, selectedYaxis) => {
        setXaxis(selectedXaxis)
        setYaxis(selectedYaxis)
    }

    useEffect(() => {
        const rows = organizeData(props.data)
        setOrganizedDataByRows(rows)
        let organizedData = rows[0].map((element, index) => {
            let updatedData = [];
            for (let i = 1; i < rows.length; i++) {
                updatedData.push(rows[i][index])
            }
            return { [element]: updatedData }
        })
        setOrganizedData(organizedData)
        props.getData(organizedData)
        const columnsHeaders = [...organizedData]
        setHeaders({ ...headers, headers: columnsHeaders })
    }, [props.data])

    useEffect(() => {
        if (headers.headers.length === 0) {
            const headersCopy = { ...headers }
            headersCopy.headers = organizedData
            setHeaders(headersCopy)
        }
        if (headers.xAxis || headers.yAxis) {
            selectedColumn(headers.xAxis[0], headers.yAxis[0])
        }
    }, [organizedData, headers]);


    const onDragEnd = ({ source, destination }, columns, setColumns) => {
        if (!destination) return;
        if (source.droppableId !== destination.droppableId) {
            const sourceColumn = columns[source.droppableId];
            const destColumn = columns[destination.droppableId];
            if (destColumn.length >= 1 && destination.droppableId !== 'headers') return;
            const sourceItems = [...sourceColumn];
            const destItems = [...destColumn];
            const [removed] = sourceItems.splice(source.index, 1);
            destItems.splice(destination.index, 0, removed);
            setColumns({
                ...columns,
                [source.droppableId]: sourceItems,
                [destination.droppableId]: destItems
            });
        } else {
            const column = columns[source.droppableId];
            const copiedItems = [...column];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({ ...columns, [source.droppableId]: copiedItems });
        }
    };

    return (
        <div className='table-area'>
            <DragDropContext onDragEnd={(result) => onDragEnd(result, headers, setHeaders)}>
                {organizedData.length > 1 && <Droppable droppableId="headers">
                    {(provided) => (
                        <div className="columns-headers" {...provided.droppableProps} ref={provided.innerRef} >
                            {organizedData.length > 1 && headers.headers.map((column, index) => {
                                return (
                                    <Draggable style={{ minHeight: '30px' }} index={index} draggableId={Object.keys(column).toString()} key={Object.keys(column).toString()}>
                                        {(provided) => (
                                            <div className='draggable headers buttons' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                {Object.keys(column)}
                                            </div>
                                        )}
                                    </Draggable>)
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>}
                {organizedData.length > 1 && <Droppable droppableId="xAxis">
                    {(provided) => (
                        <div className="x-axis" {...provided.droppableProps} ref={provided.innerRef}>
                            {organizedData.length > 1 && headers.xAxis.map((column, index) => {
                                return (
                                    <Draggable style={{ minHeight: '30px' }} index={index} draggableId={Object.keys(column).toString()} key={Object.keys(column).toString()}>
                                        {(provided) => (
                                            <div className='draggable xaxis' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                {Object.keys(column)}
                                            </div>
                                        )}
                                    </Draggable>)
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>}
                {organizedData.length > 1 && <Droppable droppableId="yAxis">
                    {(provided) => (
                        <div className="y-axis" {...provided.droppableProps} ref={provided.innerRef}>
                            {organizedData.length > 1 && headers.yAxis.map((column, index) => {
                                return (
                                    <Draggable style={{ minHeight: '30px' }} index={index} draggableId={Object.keys(column).toString()} key={Object.keys(column).toString()}>
                                        {(provided) => (
                                            <div className='draggable yaxis' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                {Object.keys(column)}
                                            </div>
                                        )}
                                    </Draggable>)
                            })}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                }
            </DragDropContext>

        </div>
    )
}
export default DragAndDrop;