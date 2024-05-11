import { Outlet } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";

import { LoadingScreen } from './components';
import { login } from "./store/authSlice";

import './App.css'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth();

    const listener = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          uid: user.uid
      }
      dispatch(login(userData));
      }
      setLoading(false);
    });

    return () => {
      listener();
    };

  }, [])

  return !loading ? <Outlet /> : <LoadingScreen />

}

export default App;