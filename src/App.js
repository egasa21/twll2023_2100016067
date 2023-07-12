import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home/Home';
import Lists from './pages/Lists/Lists';
import New from './pages/New/New';
import './index.css';
import PrivateRoute from './PrivateRoute';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Edit from './pages/Edit/Edit';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={<PrivateRoute />}>
            <Route index element={<Home />} />
            <Route path='doctors'>
              <Route index element={<Lists />} />
              <Route
                path='new'
                element={<New />} />
              <Route path='edit/:id' element={<Edit />}/>
            </Route>
            <Route path='appointments'>
              <Route index element={<Lists />} />
            </Route>
            <Route path='departments'>
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
