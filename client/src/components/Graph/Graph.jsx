import { React, useEffect, useState, useRef } from 'react';
import Chartjs from 'chart.js/auto';
import './graph.css'
import { displayRandomColorBars } from '../../services/services'
import { useXaxisState, useYaxisState } from "../../context/graph.context"
import * as _ from "lodash"
import { keys, values } from '../../services/services'

const Graph = (props) => {
    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);
    const [index, setIndex] = useState([]);
    const [chartTypeLine, setChartTypeLine] = useState(true)
    const [Xaxis, setXaxis] = useXaxisState()
    const [Yaxis, setYaxis] = useYaxisState()


    // improve and send to services? with xAxis and yAxis?
    const setTitle = () => {
        if (!_.isEmpty(Yaxis) && !_.isEmpty(Xaxis)) {
            const yAxisTitle = keys(Yaxis).length === 1 ?
                keys(Yaxis)[0].toUpperCase() :
                keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1);
            const xAxisTitle = keys(Xaxis).length === 1 ?
                keys(Xaxis)[0].toUpperCase() :
                keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1);
            return `${yAxisTitle.slice(0, 20)} versus ${xAxisTitle.slice(0, 20)}`
        } else if (!_.isEmpty(Xaxis)) {
            const xAxisTitle = keys(Xaxis).length === 1 ?
                keys(Xaxis)[0].toUpperCase() :
                keys(Xaxis)[0].toUpperCase() + keys(Xaxis).slice(1);
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
            labels: (!_.isEmpty(Xaxis) ? values(Xaxis) : index) || 'g',
            datasets: [
                {
                    label: !_.isEmpty(Xaxis) ? `${keys(Xaxis)}` : 'y',
                    data: (!_.isEmpty(Yaxis) ? values(Yaxis) : false) || (!_.isEmpty(Xaxis) ? values(Xaxis) : []),
                    backgroundColor: displayRandomColorBars(chartTypeLine, props),
                    borderWidth: 1
                }, // add another data set?
                // {
                //     label: 'Dataset 1',
                //     data: [1, 2, 34],
                //     backgroundColor: displayRandomColorBars(chartTypeLine, props),
                // }

                //
            ]
        },
        options: {
            legend: {
                display: true,
            },
            title: {
                display: true,
                text: setTitle(),
                fontSize: 16,
                fontFamily: "'Nunito', 'sans-serif'",
            },
            scales: {
                yAxes: {
                    scaleLabel: {
                        display: true,
                        fontSize: 14,
                        labelString: (!_.isEmpty(Yaxis) ? `${keys(Yaxis)[0].toUpperCase() + keys(Yaxis).slice(1)}` : ''),
                        fontFamily: "'Nunito', 'sans-serif'",
                    },
                    ticks: {
                        display: true,
                    }
                },
                xAxes: {
                    ticks: {
                        beginAtZero: true
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

    // tooltips or regular text?
    return (
        <div>
            <div>
                <div className="graph-area-container"> 
                    {/* <div className="tooltip">Click and choose another column for the X axis</div> */}
                    <div className="options-container buttons" >
                        <button onClick={() => props.sendFavorite(chartConfig)}>Save to Favorites</button>
                        <button onClick={() => setChartTypeLine(true)}>Chart type line</button>
                        <button onClick={() => setChartTypeLine(false)}>Chart type bar</button>
                    </div>
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