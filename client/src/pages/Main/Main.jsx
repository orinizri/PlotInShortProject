import React, { useState } from 'react';
import { Routes, Route, Link } from "react-router-dom";
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
import api from '../../api/api';
import { UserState } from '../../context/user.context';
import { headersToken } from '../../utils/utils';
import Table from '../Table/Table';


const Main = () => {
    const [user, setUser] = UserState();
    const [rawData, setRawData] = useState('');
    const [xAxis, setXAxis] = useState([]);
    const [yAxis, setYAxis] = useState([]);


    const [organizedDataToTable, setOrganizedDataToTable] = useState([]);
    const [organizedData, setOrganizedData] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [presentWarning, setPresentWarning] = useState(false);


    const getWarning = (boolean) => setPresentWarning(boolean)

    const getFavorite = async (favorite) => {
        setFavorites([...favorites, favorite])
        try {
            const token = localStorage.getItem('token');
            console.log("token",token)
            const { data } = await api.post('/graph', {'description' : favorite, 'owner' : user._id }, headersToken(token));
            console.log("data",data)
        } catch (e) {
            console.log(e)
        }
    }

    const getDataFromDnd = (arrangedData) => setOrganizedData(arrangedData)

    const getUpdatedFavorites = (newFavorites) => setFavorites(newFavorites)

    const getData = (data) => {
        setRawData(data)
        console.log(data)
        localStorage.setItem('raw-data', data);

        setPresentWarning(true)
    }
    const dataToTable = (datafromGraph) => {
        setOrganizedDataToTable(datafromGraph)
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
                        <DragAndDrop data={rawData} getData={getDataFromDnd} dataToTable={dataToTable} />
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
                <Route path='/table' element={<>
                    <Header />
                    <button><Link to='/'>Back</Link></button>
                    <Table data={organizedDataToTable}/> </>
                } />
                <Route path='/about' element={<>
                    <Header />
                    <About /> </>
                } />
                <Route path='/favorites' element={<>
                    <Header />
                    <Favorites sendFavorites={favorites} getUpdatedFavorites={getUpdatedFavorites} /> </>
                } />
            </Routes>
        </div>
    )
}
export default Main;