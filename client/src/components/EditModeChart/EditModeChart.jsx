import { useEffect, useRef } from "react";
import Chartjs from 'chart.js/auto';

const EditModeChart = ({ deleteChartFromFavorites, text, offEditGraph, onUpdateTitleButton, chartConfig }) => {
    const chartRef = useRef(null)
    useEffect(() => {

        if (chartRef.current) {
            const newChartInstance = new Chartjs(chartRef.current, chartConfig.description);
            return () => newChartInstance.destroy();
        }
        
    }, []);
    
    return (

        <div>
            <div className="chart-container" id={chartConfig._id}>

                <canvas ref={chartRef}></canvas>
                <div className="favorite-buttons">
                    <button onClick={deleteChartFromFavorites}>Delete</button>
                    <button onClick={offEditGraph}>Set Edit Off</button>
                </div>
            </div>
            <div>
                <label id="x-axis">Title: </label>
                <input htmlFor="x-axis" defaultValue={text} />
                <button onClick={onUpdateTitleButton}>Update</button>

            </div>
        </div>
    )
}
export default EditModeChart;