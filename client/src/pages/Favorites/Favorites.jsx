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
        setEditGraphMode(true)

        setEditGraph(chart)
        setEditedGraphIndex(chart._id)
    }
    const offEditGraph = () => {
        setEditGraphMode(false)
        setEditGraph([])
        setEditedGraphIndex('')
    }
    const onUpdateButton = async (e) => {
        const inputs = [...e.target.parentElement.children]
            .filter((input) => input.tagName === 'DIV')
            .map((input) => {
                return {
                    label: input.children[0].id,
                    value: input.children[1].value
                }
            })
        const graphCopy = { ...editGraph }
        for (let input of inputs) {
            switch (input.label) {
                case 'graph-title':
                    if (graphCopy.description.options.plugins.title.text !== input.value) {
                        graphCopy.description.options.plugins.title.text = input.value
                    };
                    break;
                case 'x-axis':
                    if (graphCopy.description.options.scales.xAxes.title.text !== input.value) {
                        graphCopy.description.options.scales.xAxes.title.text = input.value
                    };
                    break;
                case 'y-axis':
                    if (graphCopy.description.options.scales.yAxes.title.text !== input.value) {
                        graphCopy.description.options.scales.yAxes.title.text = input.value
                    };
                    break;
                default:
                    return;
            }
            const editedGraphIndexInFavorites = (favorites.findIndex((graph) => graph._id === graphCopy._id))
            favorites[editedGraphIndexInFavorites] = graphCopy
            setFavorites(favorites)
            offEditGraph()
        }
    }
    const setCharts = () => {
        return favorites.map((chart, index) => {
            return chart._id === editedGraphIndex ? 
            <div key={chart._id}><EditModeChart deleteChartFromFavorites={deleteChartFromFavorites} offEditGraph={offEditGraph} onUpdateButton={onUpdateButton} chartConfig={favorites[index]} /></div> :
            <div key={chart._id}><Chart deleteChartFromFavorites={deleteChartFromFavorites} onEditGraph={() => onEditGraph(chart, index)} chartConfig={favorites[index]}/></div>
        })
    }
    const deleteChartFromFavorites = async (e) => {
        const token = localStorage.getItem('token');
        const graphID = e.target.parentElement.parentElement.id
        await api.delete(`/graph/${graphID}`, headersToken(token));
        let newFavorites = [...favorites];
        newFavorites.splice(e.target.parentElement.parentElement.id, 1);
        setFavorites(newFavorites)
        props.getUpdatedFavorites(newFavorites)
    }

    useEffect(() => {
        const getFavoriteGraphs = async () => {
            const token = localStorage.getItem('token');
            const { data } = await api.get("/graphs", headersToken(token));
            setFavorites(data)
        }
        getFavoriteGraphs()
    }, [])

    return (
        <>
            {props.sendFavorites ? <h1>My Favorites</h1> : <h2>You need to choose favorite graphs</h2>}
            <div className="favorites-container">
                {favorites.length > 0 && setCharts()}
            </div>
        </>
    )
}
export default Favorites;