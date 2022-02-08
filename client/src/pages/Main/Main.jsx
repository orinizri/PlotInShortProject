import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import About from '../About/About'
import Profile from '../Profile/Profile';
import Favorites from '../Favorites/Favorites';
import Header from '../../components/Header/Header'
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import Graph from '../../components/Graph/Graph';
import DragAndDrop from '../../components/DragAndDrop/DragAndDrop';
import Statistics from '../../components/Statistics/Statistics';
import PastedExcelInput from '../../components/PastedExcelInput/PastedExcelInput';
import './main.css'


const Main = () => {
    const [rawData, setRawData] = useState('');
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);


    const [organizedData, setOrganizedData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [presentWarning, setPresentWarning] = useState(false);


    const getWarning = (boolean) => setPresentWarning(boolean)

    const getFavorite = (favorite) => setFavorites([...favorites, favorite])

    const getDataFromTable = (arrangedData) => setOrganizedData(arrangedData)

    const getUpdatedFavorites = (newFavorites) => setFavorites(newFavorites)

    const getData = (data) => {
        setRawData(data)
        setPresentWarning(true)
    }

    // TODO: Set a new page for favorites -  save also in mongoose like 'task'
    return (
        <div className="main-container">
            <Routes>
                <Route path='/' element={<>
                    <Header />
                    <PastedExcelInput data={getData} />
                    <div className='graph-dnd-container'>
                        <Graph sendFavorite={getFavorite} />
                        <DragAndDrop data={rawData} getData={getDataFromTable} />
                    </div>
                    <Statistics yAxis={yAxis} xAxis={xAxis} />
                </>
                } />
                <Route path='/sign-up' element={<>
                    <Header />
                    <SignUp /> </>
                } />
                <Route path='/sign-in' element={<>
                    <Header />
                    <SignIn /> </>
                } />
                <Route path='/profile' element={<>
                    <Header />
                    <Profile /> </>
                } />
                <Route path='/about' element={<>
                    <Header />
                    <About /> </>
                } />
                <Route path='/favorites' element={<>
                    <Header />
                    <Favorites /> </>
                } />
            </Routes>
        </div>
    )
}
export default Main;