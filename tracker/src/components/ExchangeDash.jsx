import { useState, useEffect } from 'react'
import axios from 'axios'
import AddExchangeForm from './AddExchangeForm';
import UserExchanges from './UserExchanges';
import "./ExchangeDash.scss"

import useUserData from '../hooks/useUserData.js'

export default function ExchangeDash() {

  const [exchangeName, setExchangeName] = useState('aax');
  const [accountName, setAccountName] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [sandboxMode, setSandboxMode] = useState(false)
  const [exchanges, setExchanges] = useState(null);
  const [alert, setAlert] = useState("")
  const { cookies } = useUserData();
  const [exchangeAddDelete, setExchangeAddDelete] = useState(false);
  

  useEffect(() => {
    if (cookies.user_id) {
      getExchangeData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.user_id])

  const addExchange = async (exchangeData) => {
    if (!exchangeData.exchangeName || !exchangeData.apiKey || !exchangeData.secretKey) {
      return handleAlert(`please enter valid credentials`)
    }
    const URL = `http://localhost:3004/api/exchange/new`
    try {
      const res = await axios.post(URL, {userId: cookies.user_id, ...exchangeData})
      const {account, errorMessage} = res.data
      if (errorMessage) handleAlert(errorMessage)
      if (account) {
        handleAlert('Exchange added!')
        setExchangeAddDelete(true);
        setExchangeAddDelete(false);
      }
        
    } catch(error) {
      console.log(error)
    }
  }

  const getExchanges = async () => {
    const URL = `http://localhost:3004/api/exchange`
    const resExchanges = await axios.get(URL);
    return resExchanges.data;
  }

  const getExchangeData = async () => {
    try {
      const ccxtExchanges = await getExchanges();
      setExchanges(ccxtExchanges)
    } catch(error) {
      console.log(error)
    }
  }
  
//--------AddExchangeForm Functions/Handlers--------//

  const handleAddExchange = () => {
    handleAlert("Exchange adding, this may take a few seconds") 
    addExchange({
      exchangeName,
      accountName,
      apiKey,
      secretKey,
      sandboxMode
    });
  }

  const handleSetAccountName = (e) => {
    setAccountName(e.target.value);
  }

  const handleApiKey = (e) => {
    setApiKey(e.target.value);
  }

  const handleSecretKey = (e) => {
    setSecretKey(e.target.value);
  }

  const handleSelectExchangeName = (e) => {
    setExchangeName(e.target.value)
  }

  const handleSandboxMode = () => {
    if (!sandboxMode) {
      setSandboxMode(true);
    } else {
      setSandboxMode(false);
    }
  }

  const displayExchangeOptions = () => {
    if (exchanges) {
      return exchanges.map((exchange, i) => {
        return <option value={exchange} key ={i}>{exchange}</option>
      })
    }
    return <option>Loading...</option>
  }

  const handleAlert = (value) => {
    setAlert(value)
    setTimeout(() => {
      setAlert("")
    }, 5000)
  }

//-------------------------------------------------//

  return (
    <div className="exchange-wrapper">
      {alert && <div>{alert}</div>}
      <div className="exchange-info">
        <UserExchanges
          handleAlert={handleAlert}
          exchangeAddDelete={exchangeAddDelete} 
          setExchangeAddDelete={setExchangeAddDelete}
      />
      </div>
      <AddExchangeForm
        handleSelectExchangeName={handleSelectExchangeName}
        handleSetAccountName={handleSetAccountName}
        handleAddExchange={handleAddExchange}
        handleApiKey={handleApiKey} 
        handleSecretKey={handleSecretKey} 
        handleSandboxMode={handleSandboxMode}
        displayExchangeOptions={displayExchangeOptions}
        setExchangeAddDelete={setExchangeAddDelete}
      />
    </div>
  )
}