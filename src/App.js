import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Navbar from './components/AccernityComponent/Navbar';
import Footer from './components/AccernityComponent/Footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set, get } from 'firebase/database';
import  User from './components/Global';
import app from './Firebase';
import ProductView from './components/ProductView';
import Dashboard from './components/Dashboard';
import ItemView from './components/ItemView';


const auth = getAuth();
function App() {
  const[user,setUser]=useState({login:false});
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = ref(getDatabase(), `users/${user.uid}/profileData`);
        get(userRef)
          .then((snapshot) => {
            const profileData = snapshot.val();
            if (profileData && profileData.name) {
              setUser({ login: true,  name: profileData.name, id:profileData.userId});

            }
          })
          .catch((error) => {
            console.error('Error fetching user profile data:', error.message);
          });
      } else {
        setUser({ login: false });
      }
    });


    return () => unsubscribe();
  }, [auth]);
  return (
    <User.Provider value={[user, setUser]}>
    <Router>
      <div>
       
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/*" element={<ItemView />} />
          <Route path="/dashboard/*" element={<Dashboard/>} />
        </Routes>
        
        <ToastContainer />
      </div>
    </Router></User.Provider>
  );
}

export default App;
