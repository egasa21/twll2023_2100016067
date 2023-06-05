import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Lists from './pages/Lists/Lists';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={<Home />} />
            {/* <Route path='users' element={login}/> */}
            <Route path='doctors'>
              <Route index element={<Lists />} />
            </Route>
            <Route path='appointments'>
              <Route index element={<Lists />} />
            </Route>
            <Route path='departements'>
              <Route index element={<Lists />} />
            </Route>
            <Route path='medicine-store'>
              <Route index element={<Lists />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
