import './statistics.css'
import { useEffect } from 'react';
import { useState } from 'react';
import * as _ from "lodash";
import { useXaxisState, useYaxisState } from "../../context/graph.context"
import { keys, values } from '../../services/services'

const Statistics = (props) => {
    const [xArray, setXArray] = useState([])
    const [yArray, setYArray] = useState([])
    const [Xaxis, setXaxis] = useXaxisState()
    const [Yaxis, setYaxis] = useYaxisState()

    useEffect(() => {
        !_.isEmpty(Xaxis) ? setXArray(values(Xaxis).map(Number)) : setXArray([]);
        !_.isEmpty(Yaxis) ? setYArray(values(Yaxis).map(Number)) : setYArray([]);
    }, [Xaxis, Yaxis])

    const min = (array) => Math.min(...array)

    const max = (array) => Math.max(...array)
    
    const mode = (array) => {
        let numCounter = {};
        for (const number of array) {
            numCounter[number] = numCounter[number] ? numCounter[number] + 1 : 1;
        }
        if (Math.max(Object.values(numCounter)) === 1) {
            return '-'
        }
        return Object.keys(numCounter)[Object.values(numCounter).indexOf(Math.max(...Object.values(numCounter)))]
    }
    const median = (array) => {
        const mid = Math.floor(array.length / 2),
            nums = [...array].sort((a, b) => a - b);
        return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };

    return (
        <div className='statistics-container'>
                {!_.isEmpty(Xaxis) && !isNaN(_.mean(xArray)) && <div className='x-axis-container'>
                    <h4>{(keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1)).slice(0,20)}</h4>
            <div className='x-axis-statistics'>
                    <div><strong>Mean:</strong> {_.mean(xArray).toFixed(2)}</div>
                    <div><strong>Range:</strong> {min(xArray)} - {max(xArray)}</div>
                    <div><strong>Mode:</strong> {mode(xArray)}</div>
                    <div><strong>Median:</strong> {median(xArray)}</div>
            </div>
                </div>}
                {!_.isEmpty(Yaxis) && !isNaN(_.mean(yArray)) && <div className='y-axis-container'>
                    <h4>{(keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1)).slice(0,20)}</h4>
            <div className='y-axis-statistics'>
                    <div><strong>Mean:</strong> {_.mean(yArray).toFixed(2)} </div>
                    <div><strong>Range:</strong> {min(yArray)} - {max(yArray)}</div>
                    <div><strong>Mode:</strong> {mode(yArray)}</div>
                    <div><strong>Median:</strong> {median(yArray)}</div>
            </div>
                </div>}
        </div>
    )
}
export default Statistics;