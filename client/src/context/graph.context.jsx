import React, { useState, useContext } from "react"

const XaxisContext = React.createContext(null)
const YaxisContext = React.createContext(null)
const GraphRawDataContext = React.createContext(null)



export const useXaxisState = () => useContext(XaxisContext)
export const useYaxisState = () => useContext(YaxisContext)
export const useGraphState = () => useContext(GraphRawDataContext)


const AxesProvider = ({ children }) => {
    const [Xaxis, setAxisX] = useState({})
    const [Yaxis, setAxisY] = useState({})


    return (
        <XaxisContext.Provider value={[Xaxis, setAxisX]} >
            <YaxisContext.Provider value={[Yaxis, setAxisY]}>
                {children}
            </YaxisContext.Provider>
        </XaxisContext.Provider >
    )

}

export const GraphProvider = ({ children }) => {
    const [graphRawData, setGraphRawData] = useState('');

    return (
        <GraphRawDataContext.Provider value={[graphRawData, setGraphRawData]}>
            <AxesProvider>
                {children}
            </AxesProvider>
        </GraphRawDataContext.Provider>
    )
}