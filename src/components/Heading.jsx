import GB from '../assets/img/flags/GB.svg';
import US from '../assets/img/flags/US.svg';
//Style
import '../assets/scss/heading.scss'
//React
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
//Axios
import { currencyOptions } from '../utils/fetchData';


export default function Heading() {

  const [currencyData, setCurrencyData] = useState(null)

  useEffect(() => {

    const handleCurrencyRequest = async () => {
      const currencyRequest = await fetch('https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=GBP', currencyOptions)
      const jsonCurrencyRes = await currencyRequest.json()
      setCurrencyData(jsonCurrencyRes.result)
    }

    handleCurrencyRequest()
  }, [])



  return (
    <header>
      <div className='header_content'>

        <Link to='/' className='logo'>ne<span>w</span>s</Link>

        <Link to='/currency' className='widget'>
          <img src={GB} alt='GB_flag' />
          <span>1 GBP = {currencyData?.USD.toFixed(2)} USD</span>
          <img src={US} alt='US_flag' />
        </Link>
      </div>
      
    </header>
  )
}
