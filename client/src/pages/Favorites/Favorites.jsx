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
    const onUpdateButton = async (e) => {
        // const title = (e.target.previousElementSibling.value)
        const inputs = [...e.target.parentElement.children]
            .filter((input) => input.tagName === 'DIV')
            .map((input) => {
                return {
                    label: input.children[0].id,
                    value: input.children[1].value
                }
            })
        console.log(inputs)
        const graphCopy = { ...editGraph }
        for (let input of inputs) {
            // console.log(input)
            switch (input.label) {
                case 'graph-title':
                    console.log(graphCopy.description.options.plugins.title.text)
                    console.log(input.value);
                    if (graphCopy.description.options.plugins.title.text !== input.value) {
                        graphCopy.description.options.plugins.title.text = input.value
                    };
                    break;
                case 'x-axis':
                    console.log(graphCopy.description.options.scales.xAxes.title.text)
                    console.log(input.value);
                    if (graphCopy.description.options.scales.xAxes.title.text !== input.value) {
                        graphCopy.description.options.scales.xAxes.title.text = input.value
                    };
                    break;
                case 'y-axis':
                    console.log(graphCopy.description.options.scales.yAxes.title.text)
                    console.log(input.value);
                    if (graphCopy.description.options.scales.yAxes.title.text !== input.value) {
                        graphCopy.description.options.scales.yAxes.title.text = input.value
                    };
                    break;
                default:
                    return;
            }
            console.log(graphCopy)
            const editedGraphIndexInFavorites = (favorites.findIndex((graph) => graph._id === graphCopy._id))
            console.log(editedGraphIndexInFavorites)
            favorites[editedGraphIndexInFavorites] = graphCopy
            setFavorites(favorites)
            offEditGraph()
        }
    }
    const setCharts = () => {
        console.log(favorites)
        return favorites.map((chart, index) => {
            return chart._id === editedGraphIndex ? 
            <EditModeChart deleteChartFromFavorites={deleteChartFromFavorites} offEditGraph={offEditGraph} onUpdateButton={onUpdateButton} chartConfig={favorites[index]} /> :
            <Chart deleteChartFromFavorites={deleteChartFromFavorites} onEditGraph={() => onEditGraph(chart, index)} chartConfig={favorites[index]} />
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
                {favorites && setCharts()}
            </div>
        </>
    )
}
export default Favorites;
                // if (chart.description.data.options.animation) chart.description.data.options.animation.duration = 0