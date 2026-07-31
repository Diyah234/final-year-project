import {  } from 'react'

import './App.css';
import Dashboard from './Components/user/Dashboard'
import {Context}  from './Components/Context';
import Login from './Components/user/Login';
import Doclogin from './Components/Doctor/Doclogin'
import Reminder from './Components/user/Reminder';
import Consult from './Components/user/Consult';
import DashboardDoc from './Components/Doctor/DashboardDoc';
import MailDoctor from './Components/user/MailDoctor';
import Success from './Components/user/Success';
import Reply from './Components/Doctor/Reply';
import Sign from './Components/user/Sign';
import "@fontsource/kanit";
import { BrowserRouter, Route, Routes  } from 'react-router-dom';

function App() {
 

  return (
    <>
    <Context>
      <BrowserRouter>
      
      <Routes>
        <Route path='/' element={  <Dashboard />}/>
        <Route path='/Userauth' element={  <Login />}/>
        <Route path='/Signup' element={  <Sign />}/>
        <Route path='/Docauth' element={  <Doclogin />}/>
        <Route path='/medication-reminder' element={  <Reminder />}/>
        <Route path='/consult' element={  <Consult />}/>
        <Route path='/consult/:id' element={  <MailDoctor />}/>
        <Route path='/reply/:id' element={  <Reply />}/>
        <Route path='/Doctor' element={  <DashboardDoc />}/>
        <Route path='/success' element={  <Success />}/>
      </Routes>
      
    </BrowserRouter>
    </Context>
    </>
  )
}

export default App