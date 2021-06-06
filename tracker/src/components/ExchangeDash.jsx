export default function ExchangeDash(props) {
  const { getExchanges } = props; 

  const handlegetExchanges = () => {
    getExchanges()
  }

  return (
    <button onClick={() => handlegetExchanges()}>See exchanges</button>
  )
}