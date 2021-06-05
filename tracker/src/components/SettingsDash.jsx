import "./SettingsDash.scss"

export default function settingsDash(props) {
  const { setCurrency } = props

  const handleQuoteCurrency = (currency) => {
    let currencyObj = null;
    switch(currency) {
      case "USD":
        currencyObj = {uuid: "yhjMzLPhuIDl", ticker: "USD"};
        break;
      case "CAD":
        currencyObj = {uuid: "_4s0A3Uuu5ML", ticker: "CAD"};
        break;
      case "EUR":
        currencyObj = {uuid: "5k-_VTxqtCEI", ticker: "EUR"};
        break;
      case "GBP":
        currencyObj = {uuid: "Hokyui45Z38f", ticker: "GBP"};
        break;
      case "AUD":
        currencyObj = {uuid: "OEomm4hQzk_M", ticker: "AUD"};
        break;
      default:
        currencyObj = {uuid: "yhjMzLPhuIDl", ticker: "USD"};
        break;
    }
    setCurrency(currencyObj)
  }

  return (

    <div>
      <div>Quote Currency</div>
      <select onChange={(e) => handleQuoteCurrency(e.target.value)}>
        <option value={"USD"}>USD</option>
        <option value={"CAD"}>CAD</option>
        <option value={"EUR"}>EUR</option>
        <option value={"GBP"}>GBP</option>
        <option value={"AUD"}>AUD</option>
      </select>
    </div>

  )
}