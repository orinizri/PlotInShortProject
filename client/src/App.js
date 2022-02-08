import './App.css';
import { GraphProvider } from './context/graph.context';
import { Routes, Route } from "react-router-dom";
import Main from './pages/Main/Main';



function App() {
  return (
    <main className="main">
      <GraphProvider>
        
          <Main/>
        
      </GraphProvider>
    </main>
  );
}

export default App;
