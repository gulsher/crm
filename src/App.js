import React,{useState} from 'react';
import { Routes,Route,Link, useRoutes, NavLink, useLocation,useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import './App.css';
import Login from './Login/Login'
import NotFound from './NotFound';
import Welcome from './pages/Welcome';
import NoAccess from './pages/NoAccess';
import Create from './pages/Create';
import View from './pages/View';
function App() {
  let token = localStorage.getItem("token");
  const  history = useNavigate();
  const [isAuth,setAuth] = useState(false);
  useEffect(()=>{
    
    if(token && token.length){
      history('/home')
      setAuth(true)
    }else{
      history('/')
      setAuth(false)
    }
    console.log(isAuth)
  },[])
  return (
    <>
    <Routes>
      <Route path="/" element ={<Login setAuth={setAuth}/>} />
      <Route path="/home" element ={ isAuth? <Welcome setAuth={setAuth} isAuth={isAuth} />:<NoAccess/> } />
      <Route path="/create" element ={ isAuth? <Create setAuth={setAuth} isAuth={isAuth} />:<NoAccess/> } />
      <Route path="*" element={<NotFound/>} /> 
      <Route />

    </Routes>
    </>
  );
}

export default App;
