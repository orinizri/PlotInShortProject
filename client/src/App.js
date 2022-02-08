import './App.css';
import { GraphProvider } from './context/graph.context';
import { Routes, Route } from "react-router-dom";
import About from "./pages/About/About";



function App() {
  return (
    <div className="App">
      <GraphProvider>
        <Routes>
          <Route path='/' element={<About/>}/>
        </Routes>
      </GraphProvider>
    </div>
  );
}

export default App;
