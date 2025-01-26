import React from 'react';
import "./Login.scss"

const Sign = () => {
  return (
    <div className='sign'>
         <form action="">
         <label htmlFor="">Name: <input type="text" /></label><br />
            <label htmlFor="">Email: <input type="email" name="" id="" /></label><br/>
            <label htmlFor="">Password: <input type="password" /></label><br />
            <label htmlFor="">Confirm Password: <input type="password" /></label><br />
            <button type='submit'>Sign Up</button>
        </form>
        <p>Already have an account? <span>Log In</span></p>
    </div>
  )
}

export default Sign