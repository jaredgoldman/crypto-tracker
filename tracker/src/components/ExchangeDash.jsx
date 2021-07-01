import { useState } from 'react'
import AddExchangeForm from './AddExchangeForm';

export default function ExchangeDash(props) {
  const { addExchange, exchanges, alert } = props; 

  const [exchangeName, setExchangeName] = useState('aax');
  const [accountName, setAccountName] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);
  const [sandboxMode, setSandboxMode] = useState(false)

  const handleAddExchange = () => {
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

  return (
    <div className="exchange-wrapper">
      <div>
        <h2>Your Exchanges</h2>
      </div>
      <AddExchangeForm
        handleSelectExchangeName={handleSelectExchangeName}
        handleSetAccountName={handleSetAccountName}
        handleAddExchange={handleAddExchange}
        handleApiKey={handleApiKey} 
        handleSecretKey={handleSecretKey} 
        handleSandboxMode={handleSandboxMode}
        alert={alert}
        displayExchangeOptions={displayExchangeOptions}
      />
    </div>
  )
}