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
        if (Math.max(Object.values(numCounter)[0]) === 1) {
            return '-'
        }
        return Object.keys(numCounter)[Object.values(numCounter).indexOf(Math.max(...Object.values(numCounter)))]
    }
    const median = (array) => {
        const mid = Math.floor(array.length / 2),
            nums = [...array].sort((a, b) => a - b);
        return array.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    };
    console.log(yArray)
    return (
        <div className='statistics-container'>
                {!_.isEmpty(Xaxis) && <>
            <div className='x-axis-container'>
                    <div><h4>{(keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1)).slice(0,20)}</h4></div>
                    <div><strong>Mean:</strong> {_.mean(xArray)}</div>
                    <div><strong>Minimun:</strong>  {min(xArray)}</div>
                    <div><strong>Maximum:</strong>  {max(xArray)}</div>
                    <div><strong>Mode:</strong>  {mode(xArray)}</div>
                    <div><strong>Median:</strong>  {median(xArray)}</div>
            </div>
                </>}
                {!_.isEmpty(Yaxis) && <>
            <div className='y-axis-container'>
                    <div><h4>{(keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1)).slice(0,20)}</h4></div>
                    <div><strong>Mean:</strong> {_.mean(yArray)} </div>
                    <div><strong>Minimun:</strong>  {min(yArray)}</div>
                    <div><strong>Maximum:</strong>  {max(yArray)}</div>
                    <div><strong>Mode:</strong>  {mode(yArray)}</div>
                    <div><strong>Median:</strong>  {median(yArray)}</div>
            </div>
                </>}
        </div>
    )
}
export default Statistics;