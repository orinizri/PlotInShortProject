import Chartjs from 'chart.js/auto';
import { React, useEffect, useState, useRef } from 'react';
import api from '../../api/api';
import Chart from '../../components/Chart/Chart';
import EditModeChart from '../../components/EditModeChart/EditModeChart';
import { UserState } from '../../context/user.context';
import { headersToken } from '../../utils/utils';
import './favorites.css'


const Favorites = (props) => {
    const chartContainer = useRef([]);
    const [favorites, setFavorites] = useState([]);
    const [editGraphMode, setEditGraphMode] = useState(false);
    const [editGraph, setEditGraph] = useState([]);
    const [editedGraphIndex, setEditedGraphIndex] = useState('');

    const onEditGraph = (graph, index) => {
        console.log(graph)
        setEditGraphMode(true)
        setEditGraph(graph.description)
        setEditedGraphIndex(graph._id)
    }
    const offEditGraph = () => {
        setEditGraphMode(false)
        setEditGraph([])
        setEditedGraphIndex('')
    }
    const onUpdateTitleButton = (e) => {
        let updatedGraph = { ...editGraph }
        updatedGraph.options.title.text = e.target.previousElementSibling.value
        setEditGraph(updatedGraph)

    }
    const setCharts = () => {
        if (favorites) {
            return favorites.map((chart, index) => {
                console.log(chart)
                console.log(editedGraphIndex)
                console.log(chart._id)

                // if (chart.description.data.options.animation) chart.description.data.options.animation.duration = 0
                return chart._id === editedGraphIndex ? <EditModeChart deleteChartFromFavorites={deleteChartFromFavorites} text={editGraph.options.title.text} offEditGraph={offEditGraph} onUpdateTitleButton={onUpdateTitleButton} chartConfig={favorites[index]} />
                    : <Chart deleteChartFromFavorites={deleteChartFromFavorites} onEditGraph={() => onEditGraph(chart, index)} chartConfig={favorites[index]} />
                
            })
        }
        return <div></div>
    }
    const deleteChartFromFavorites = async (e) => {
        console.log(favorites)
        const token = localStorage.getItem('token');
        const graphID = e.target.parentElement.parentElement.id
        await api.delete(`/graph/${graphID}`, headersToken(token));
        let newFavorites = [...favorites];
        newFavorites.splice(e.target.parentElement.parentElement.id, 1);
        console.log(newFavorites)
        setFavorites(newFavorites)
    }

    useEffect(() => {
        const getFavoriteGraphs = async () => {
            const token = localStorage.getItem('token');
            
            const { data } = await api.get("/graphs", headersToken(token));
            console.log(data)
            setFavorites(data)
        }
        getFavoriteGraphs()

    }, [])
    return (
        <>
            {props.sendFavorites ? <h1>My Favorites</h1> : <h2>You need to choose favorite graphs</h2>}
            <div className="favorites-container">
                {setCharts()}
            </div>
        </>
    )
}
export default Favorites;