import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes  } from 'react-router-dom';
import Dashboard from './Components/user/Dashboard';
import { Context } from './Components/Context';
import Login from './Components/user/Login';
import Doclogin from './Components/Doctor/Doclogin'
import Reminder from './Components/user/Reminder';

function App() {
  return (
    <div className="App">
      <Context>
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={  <Dashboard />}/>
          <Route path='/Userauth' element={  <Login />}/>
          <Route path='/Docauth' element={  <Doclogin />}/>
          <Route path='/medication-reminder' element={  <Reminder />}/>
        </Routes>
    
      </BrowserRouter>
      </Context>
    </div>
  );
}

export default App;
