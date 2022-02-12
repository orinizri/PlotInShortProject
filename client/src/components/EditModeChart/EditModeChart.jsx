import { useEffect, useRef } from "react";
import Chartjs from 'chart.js/auto';
import './edit-mode-chart.css'


const EditModeChart = ({ deleteChartFromFavorites, offEditGraph, onUpdateButton, chartConfig }) => {
    const chartRef = useRef(null)
    useEffect(() => {
        if (chartRef.current) {
            const newChartInstance = new Chartjs(chartRef.current, chartConfig.description);
            return () => newChartInstance.destroy();
        }
    }, []);


    return (

        <div key={chartConfig._id}>
            <div className="chart-container" id={chartConfig._id}>
                <canvas ref={chartRef}></canvas>
                <div className="favorite-buttons">
                    <button onClick={deleteChartFromFavorites}>Delete</button>
                    <button onClick={offEditGraph}>Edit Mode Off</button>
                </div>
            </div>
            <div className='edit-options-container'>
                <div className='edit-options-title-container'>
                    <label id="graph-title">Title: </label>
                    <input htmlFor="graph-title" defaultValue={chartConfig.description.options.plugins.title.text} />
                </div>
                <div className='edit-options-x-axis-container'>
                    <label id="x-axis">X Axis Title: </label>
                    <input htmlFor="x-axis" defaultValue={chartConfig.description.options.scales.xAxes.title.text} />
                </div>
                <div className='edit-options-y-axis-container'>
                    <label id="y-axis">Y Axis Title: </label>
                    <input htmlFor="y-axis" defaultValue={chartConfig.description.options.scales.yAxes.title.text} />
                </div>
                {/* <div className='edit-options-show-legend-container'>
                    <label id="show-legend">Show Legend </label>
                    <input type='checkbox' htmlFor="show-legend" defaultChecked />
                </div> */}
                <button onClick={onUpdateButton}>Update</button>
            </div>
        </div>
    )
}
export default EditModeChart;