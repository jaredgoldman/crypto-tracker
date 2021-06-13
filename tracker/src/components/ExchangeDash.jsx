import { useState } from 'react'

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

  // temporary fix to stop site from crashing when loading exchanges
  const displayExchangeOptions = () => {
    if (exchanges) {
      return exchanges.map((exchange, i) => {
        return <option value={exchange} key ={i}>{exchange}</option>
      })
    }
    return <option>Loading...</option>
  }

  return (
    <div>
      <div className="form-container">
        {alert && <div>{alert}</div>}
        <p>Add Exchange</p>
        
        <select onChange={(e) => handleSelectExchangeName(e)}>
          {displayExchangeOptions()}
        </select>

        <form 
          action="" 
          method="POST" 
          onSubmit={(e) => {
            e.preventDefault();
            handleAddExchange();
          }
        }>
          <label>Account Name</label>
          <input 
            className="input-field" 
            type="text" 
            placeholder="enter a name for this account"
            onChange={(e) => {handleSetAccountName(e)}}
          >
          </input>
          <label>API Key</label>
          <input 
            className="input-field" 
            type="text" 
            placeholder="enter your api key"
            onChange={(e) => {handleApiKey(e)}}
          >
          </input>
          <label>Secret Key</label>
          <input 
            className="input-field" 
            type="password" 
            placeholder="enter your secret key"
            onChange={(e) => {handleSecretKey(e)}}
          >
          </input>
          <div>
            <label>sandbox mode?</label>
              <input
                type='checkbox'
                onChange={() => {handleSandboxMode()}}
              />
          </div>
          <div>
            <input type="submit" className="button"/>
          </div>
        </form>


      </div>
   

    </div>
  )
}