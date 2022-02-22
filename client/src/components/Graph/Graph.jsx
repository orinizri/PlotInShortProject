import { React, useEffect, useState, useRef } from 'react';
import Chartjs from 'chart.js/auto';
import './graph.css'
import { displayRandomColorBars } from '../../services/services'
import { useXaxisState, useYaxisState } from "../../context/graph.context"
import * as _ from "lodash"
import { keys, values } from '../../services/services'
import { UserState } from '../../context/user.context';
import api from '../../api/api';
import { headersToken } from '../../utils/utils';
import { Link } from 'react-router-dom';

const Graph = (props) => {
    const [user, setUser] = UserState();
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [index, setIndex] = useState([]);
    const [chartTypeLine, setChartTypeLine] = useState(true)
    const [Xaxis, setXaxis] = useXaxisState()
    const [Yaxis, setYaxis] = useYaxisState()
    const [rawData, setRawDataForTable] = useState('')


    // improve and send to services? with xAxis and yAxis?
    const setTitle = () => {
        if (!_.isEmpty(Yaxis) && !_.isEmpty(Xaxis)) {
            const yAxisTitle = keys(Yaxis)[0].length === 1 ?
                keys(Yaxis)[0][0].toUpperCase() :
                keys(Yaxis)[0][0].toUpperCase() + keys(Yaxis)[0].slice(1);
            const xAxisTitle = keys(Xaxis)[0].length === 1 ?
                keys(Xaxis)[0][0].toUpperCase() :
                keys(Xaxis)[0][0].toUpperCase() + keys(Xaxis)[0].slice(1);
            return `${yAxisTitle.slice(0, 20)} versus ${xAxisTitle.slice(0, 20)}`
        } else if (!_.isEmpty(Xaxis)) {
            const xAxisTitle = keys(Xaxis)[0].length === 1 ?
                keys(Xaxis)[0][0].toUpperCase() :
                keys(Xaxis)[0][0].toUpperCase() + keys(Xaxis)[0].slice(1);
            return `${xAxisTitle.slice(0, 20)}`
        } else if (!_.isEmpty(Yaxis)) {
            const yAxisTitle = keys(Yaxis).length === 1 ?
                keys(Yaxis)[0].toUpperCase() :
                keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1);
            return `${yAxisTitle.slice(0, 20)}`
        } else {
            return '';
        }
    }

    const chartConfig = {
        type: (chartTypeLine ? "line" : "bar"), 
        data: {
            labels: (!_.isEmpty(Xaxis) ? values(Xaxis) : index) || '',
            datasets: [
                {
                    label: !_.isEmpty(Xaxis) ? `${keys(Xaxis)}` : '',
                    data: (!_.isEmpty(Yaxis) ? values(Yaxis) : false) || (!_.isEmpty(Xaxis) ? values(Xaxis) : []),
                    backgroundColor: displayRandomColorBars(props),
                    borderWidth: 1
                }, // add another data set?
            ]
        },
        options: {
            legend: {
                display: true,
            },
            plugins: {
                title: {
                    display: true,
                    text: setTitle(),
                    fontSize: 16,
                    fontFamily: "'Nunito', 'sans-serif'",
                }
            },
            scales: {
                yAxes: {
                    title: {
                        display: true,
                        text: (!_.isEmpty(Yaxis) ? `${keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1)}` : '')
                    },
                    scaleLabel: {
                        display: true,
                        fontSize: 16,
                        fontFamily: "'Nunito', 'sans-serif'",
                    },
                    ticks: {
                        display: true,
                    }
                },
                xAxes: {
                    title: {
                        display: true,
                        text: (!_.isEmpty(Xaxis) ? `${keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1)}` : ''),
                        
                    },
                    ticks: {
                        beginAtZero: true,
                        fontSize: 20,
                    },
                    scaleLabel: {
                        display: true,
                        fontSize: 14,
                        labelString: (!_.isEmpty(Xaxis) ? `${keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1)}` : ''),
                        fontFamily: "'Nunito', 'sans-serif'",
                    }
                }
            }
        }
    };

    useEffect(() => {
        const getUser = async () => {
            const token = localStorage.getItem('token');
            const { data } = await api.get("/users/me", headersToken(token));
            setUser(data);
        }
        const invokeUser = async () => {
            try {
                if (!localStorage.getItem('token')) return;
                await getUser()
            } catch (e) {
                console.log(e)
            }
        }
        invokeUser()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('token')])

    useEffect(()=> {
        try {
            const rawDataForTable = localStorage.getItem('raw-data');
            setRawDataForTable(rawDataForTable)
        } catch (error) {
            
        }
    }, [localStorage.getItem('raw-data')])


    useEffect(() => {
        if ((!_.isEmpty(Xaxis)) && (Xaxis)) {
            const indexes = values(Xaxis).map((axis, index) => index + 1)
            setIndex(indexes)
        }
        if (chartContainer && chartContainer.current) {
            const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
            setChartInstance(newChartInstance)
            return () => newChartInstance.destroy();
        } // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [Yaxis, Xaxis, chartTypeLine]);

    return (
        <div>
            <div>
                <div className="graph-area-container">
                    {(!_.isEmpty(Xaxis) || !_.isEmpty(Yaxis)) && 
                    <div className="options-container buttons" >
                        {user && <button onClick={() => props.sendFavorite(chartConfig)}>Save to Favorites</button>}
                        <button onClick={() => setChartTypeLine(true)}>Chart type line</button>
                        <button onClick={() => setChartTypeLine(false)}>Chart type bar</button>
                        {rawData && <button><Link to='/table' target="_blank">Watch Raw Data</Link></button>}
                    </div>}
                    <div className="graph-container">
                        <div className="canvas">
                            <canvas ref={chartContainer}></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Graph;