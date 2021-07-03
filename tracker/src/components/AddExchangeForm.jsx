import "./Form.scss"

export default function AddExchangeForm(props) {
  const {  
    handleSelectExchangeName,
    displayExchangeOptions,
    handleAddExchange,
    handleSetAccountName,
    handleApiKey, 
    handleSecretKey, 
    handleSandboxMode,
    alert
  } = props;

  return (
    <div className="form-container">
      <p className="form-heading">Add Exchange</p>
      {alert && <div>{alert}</div>}
      <div className="form-select">
        <select onChange={(e) => handleSelectExchangeName(e)}>
          {displayExchangeOptions()}
        </select>
      </div>

      <form 
        action="" 
        method="POST" 
        onSubmit={(e) => {
          e.preventDefault();
          handleAddExchange();
        }
      }>
        <div className="inputs-wrapper">
          <div className="input-wrapper">
            <p>Account Name</p>
            <input 
              className="input-field" 
              type="text" 
              placeholder="enter a name for this account"
              onChange={(e) => {handleSetAccountName(e)}}
            >
            </input>
          </div>
          <div className="input-wrapper">
            <p>API Key</p>
            <input 
              className="input-field" 
              type="text" 
              placeholder="enter your api key"
              onChange={(e) => {handleApiKey(e)}}
            >
            </input>
          </div>
          <div className="input-wrapper">
          <p>Secret Key</p>
            <input 
              className="input-field" 
              type="password" 
              placeholder="enter your secret key"
              onChange={(e) => {handleSecretKey(e)}}
            >
            </input>
          </div>   
          <div className="checkbox-wrapper">
            <p>Sandbox mode</p>
              <input
                type='checkbox'
                onChange={() => {handleSandboxMode()}}
              />
          </div>
        </div>
        <div className="button-wrapper">
          <input type="submit" className="button"/>
        </div>
      </form>
    </div>
  )

}