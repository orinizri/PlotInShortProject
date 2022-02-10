import { useEffect, useRef } from "react";
import Chartjs from 'chart.js/auto';

const Chart = ({ deleteChartFromFavorites, onEditGraph, chartConfig }) => {
    const chartRef = useRef(null)

    console.log(chartConfig)

    useEffect(() => {
        if (chartRef.current) {
            const newChartInstance = new Chartjs(chartRef.current, chartConfig.description)
            return () => newChartInstance.destroy();
        }

    }, []);


    return (
            <div className="chart-container" id={chartConfig._id}>

                <canvas ref={chartRef}></canvas>
                <div className="favorite-buttons">
                    <button onClick={deleteChartFromFavorites}>Delete</button>
                    <button onClick={onEditGraph}>Edit Graph </button>
                </div>
            </div>
    )

}
export default Chart;