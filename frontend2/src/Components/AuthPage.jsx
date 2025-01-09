import React, { useContext } from 'react';
import {useNavigate} from 'react-router-dom'
import { AppContext } from './Context';
import './auth.scss'

const AuthPage = () => {
    const navigate = useNavigate()
    const {setpop} = useContext(AppContext)
    const handleclick = (text)=>{
      navigate(text)
      setpop(false)
    }
  return (
    <div className='auth'>
        <div className='fade'></div>
        <div className='color'>
        <div onClick={()=> setpop(false)} className='close'>X</div>
        <div className='flex'>
        <div onClick={()=> handleclick('/Userauth')}>User</div>
        <div onClick={()=> handleclick('/Docauth')}>Doctor</div>
        </div>
        </div>
    </div>
  )
}

export default AuthPage