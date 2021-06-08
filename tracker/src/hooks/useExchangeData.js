import useApplicationData from "./useApplicationData"

export default function useExchangeData() {
  
  const { cookies } = useApplicationData();

  const exchangeDataTest = () => {
    // console.log(cookies)
  }

  return { exchangeDataTest } 
}
