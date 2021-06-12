// import { useState } from 'react';
// import { useCookies } from 'react-cookie';
// import axios from 'axios';

// export default function UseUserData() {

//   const [cookies, setCookie, removeCookie] = useCookies(['user_id']);
//   const [alert, setAlert] = useState(null);
  
//   const handleAlert = (alert) => {
//     setAlert(alert)
//     setTimeout(() => {
//       setAlert(null);
//     }, 3000)
//   }
  
//   const handleLogin = (userData) => {
//     const { password, email } = userData;
//     axios
//     .post(`http://localhost:3001/api/users/login`, {password, email})
//     .then((res) => {
//       if (res.status === 200) {
//         setCookie('user_id', res.data, { path: '/' });
//       }
//     })
//     .catch((err) => {
//       if (err.response) {
//         handleAlert(err.response.data);
//       }
//     });
//   }
  
//   const handleLogout = () => {
//     removeCookie("user_id");
//   }
  
//   const handleRegister = (userData) => {
//     const { firstName, lastName, password, email } = userData;
//     axios
//     .post(`http://localhost:3001/api/users/register`, {firstName, lastName, password, email})
//     .then(res => {
//       if (res) {
//         return setCookie('user_id', res.data.id, { path: '/' });
//       }
//     })
//     .catch((err) => {
//       handleAlert(err.response.data)
//     });
//   }

//   return { handleLogin, handleLogout, handleAlert, handleRegister, cookies, alert } 

// }