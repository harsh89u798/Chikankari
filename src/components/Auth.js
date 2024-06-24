import React, { useContext, useState } from 'react'
import Login from './Login'
import Signup from './Signup'
import User from './Global';

export default function Auth() {
  const[login,setLogin]=useState(true);
  const[signupPage,setSignupPage]=useState(true);
  const[user,setUser]=useContext(User);
  return (
    <div>
      <>
      {!user.login && <>
      
        <section id='auth' className="py-14 px-32 ">
            <div className="w-full mx-auto md:px-8  rounded-3xl bg-white py-5">
                <div className="items-center space-x-7 justify-center  lg:flex">
                    <div className="">
                        <img src="https://adachikan.com/assets/img/homebanner/banner1.png" className="w-full h-full  rounded-3xl" alt="" />
                    </div>
                  
                   
      {login ? <Login setLogin={setLogin} setSignupPage={setSignupPage}/> : <Signup setLogin={setLogin} />}
                
                </div>
            </div>
        </section>
      </>}
    
    

      </>
       
    </div>
  )
}
