import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

export default function UseUserData() {

  const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
  const [alert, setAlert] = useState(null);
  
  const handleAlert = (alert) => {
    setAlert(alert)
    setTimeout(() => {
      setAlert(null);
    }, 3000)
  }
  
  const handleLogin = async (userData) => {
    const { password, email } = userData;
    if (!password || !email) {
      handleAlert('please enter a valid password and email')
    }
    const res = await axios.post(`http://localhost:3004/api/users/login`, {password, email})
    if (res.data.alert) {
      return handleAlert(res.data.alert)
    }
    if (res.status === 200) {
      setCookie('user_id', res.data.user_id, { path: '/' });
    }
  }

  const handleLogout = () => {
    removeCookie("user_id");
  }
  
  const handleRegister = async (userData) => {
    const { firstName, lastName, password, email } = userData;
    if (!firstName || !lastName || !email || !password) {
      return handleAlert("Please enter a valid email and password")
    }
    const res = await axios.post(`http://localhost:3004/api/users/register`, {firstName, lastName, password, email})
    if (res.data.alert) {
      return handleAlert(res.data.alert)
    }
    if (res) {
      setCookie('user_id', res.data.id, { path: '/' });
    }
  }

  return { 
    handleLogin, 
    handleLogout, 
    handleAlert, 
    handleRegister, 
    cookies, 
    alert, 
  } 
}