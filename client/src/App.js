import { GraphProvider } from './context/graph.context';
import Main from './pages/Main/Main';
import { UserProvider } from './context/user.context';



function App() {
  return (
    <main className="main">
      <GraphProvider>
        <UserProvider>
          <Main/>
        </UserProvider>
      </GraphProvider>
    </main>
  );
}

export default App;
