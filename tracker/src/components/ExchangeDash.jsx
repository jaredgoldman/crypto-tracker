import { useState } from 'react'

export default function ExchangeDash(props) {
  const { addExchange, exchanges } = props; 

  const [exchangeName, setExchangeName] = useState('aax');
  const [accountName, setAccountName] = useState(null);
  const [apiKey, setApiKey] = useState(null);
  const [secretKey, setSecretKey] = useState(null);

  const handleAddExchange = () => {
    addExchange({
      exchangeName,
      accountName,
      apiKey,
      secretKey
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

  const exchangeOptions = exchanges.map((exchange, i) => {
    return <option value={exchange} key ={i}>{exchange}</option>
  })

  return (
    <div className="form-container">
      {props.alert && <div>{props.alert}</div>}
      <p>Add Exchange</p>
      
      <select onChange={(e) => handleSelectExchangeName(e)}>
        {exchangeOptions}
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
          <input type="submit" className="button"/>
        </div>
      </form>

    </div>
  )
}