import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from './Context';
import './auth.scss';

const AuthPage = () => {
  const navigate = useNavigate();
  const { setpop } = useContext(AppContext);

  const handleclick = (text) => {
    navigate(text);
    setpop(false);
  };

  return (
    <div className='auth'>
      <div className='fade'></div>
      <div className='color'>
        <div onClick={() => setpop(false)} className='close'>
          X
        </div>
        <div className='flex'>
          <p>Are you a</p>
          <div className='options'>
            <div onClick={() => handleclick('/Userauth')}>Patient</div>
            <div onClick={() => handleclick('/Docauth')}>Doctor</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;