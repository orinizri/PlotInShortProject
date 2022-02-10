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

    const onEditGraph = (chart, index) => {
        console.log(chart)
        setEditGraphMode(true)
        
        setEditGraph(chart)
        setEditedGraphIndex(chart._id)
    }
    const offEditGraph = () => {
        setEditGraphMode(false)
        setEditGraph([])
        setEditedGraphIndex('')
    }
    const onUpdateTitleButton = async (e) => {
        console.log(e.target.previousElementSibling.value)
        let updatedGraph = { ...editGraph }
        updatedGraph.description.options.plugins.title.text = e.target.previousElementSibling.value
        console.log(e.target.previousElementSibling.value)
        const token = localStorage.getItem('token');
            
        const { data } = await api.post(`/graph/${editedGraphIndex}`, {title : e.target.previousElementSibling.value } , headersToken(token));
        console.log(data)
        console.log(updatedGraph)
        const newFavorites = favorites.map((chart,index) => {
            if (chart._id === editedGraphIndex) {
                chart.description = data.description
            }
            return chart;
        })
        console.log("newFavs",newFavorites)
        setFavorites(newFavorites)
        setEditGraph(updatedGraph.description)
        props.getUpdatedFavorites(newFavorites)
        offEditGraph()
    }
    const setCharts = () => {
            return favorites.map((chart, index) => {
                return chart._id === editedGraphIndex ? <EditModeChart deleteChartFromFavorites={deleteChartFromFavorites} offEditGraph={offEditGraph} onUpdateTitleButton={onUpdateTitleButton} chartConfig={favorites[index]} />
                    : <Chart deleteChartFromFavorites={deleteChartFromFavorites} onEditGraph={() => onEditGraph(chart, index)} chartConfig={favorites[index]} />
            })
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
        props.getUpdatedFavorites(newFavorites)
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
                {favorites && setCharts()}
            </div>
        </>
    )
}
export default Favorites;
                // if (chart.description.data.options.animation) chart.description.data.options.animation.duration = 0