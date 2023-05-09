import { useState, useEffect} from 'react'
//Icons
import { VscArrowSwap } from 'react-icons/vsc'
import { BsCurrencyExchange } from 'react-icons/bs'
//Style
import '../assets/scss/currency.scss'
//fetch
import { currencyOptions, newsOptions } from '../utils/fetchData'
import currencyData from '../utils/countryFlags.json'
import axios from 'axios'
//Components
import ExchangeCard from '../components/ExchangeCard'
import Result from '../components/Result'
import NewsContainer from '../components/NewsContainer'

export default function Currency() {
  //State
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ exchangeFrom, setExchangeFrom ] = useState(null)
  const [ exchangeTo, setExchangeTo ] = useState(null)
  const [ inputValue, setInputValue ] = useState('')
  const [isOpen, setIsOpen] = useState({from: false, to: false})
  const [dataNews, setDataNews] = useState(null)

  //Effect
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const source = axios.CancelToken.source()

    //Fetch currency data
    const handleCurrencyRequest = async () => {
      const currencyRequest = await fetch('https://currency-converter-pro1.p.rapidapi.com/currencies', currencyOptions, {signal: signal})
      const jsonCurrencyRes = await currencyRequest.json()
      let allCurrencyData = []

      //Loop over all data currency from API
      for (const property in jsonCurrencyRes.result) {

        let currencyDataItem = currencyData.find(el => el.currency.code === property)
        //Create currency obj for each currency
        if(currencyDataItem) {
          let currencyItemObject = {
            code: property,
            flag: currencyDataItem.flag,
            symbol: currencyDataItem.currency.symbol,
            name: currencyDataItem.currency.name
          }
          //Set from value when first loaded
          if(property === 'USD') {
            setExchangeFrom(currencyItemObject)
          }
          //Set to value when first loaded
          if(property === 'EUR') {
            setExchangeTo(currencyItemObject)
          }
          //Push obj to array
          allCurrencyData.push(currencyItemObject)
        }
      }
      setAllCurrency(allCurrencyData)
    }
    
    //Fetch data news
    const fetchNews = async () => {
      await axios.request({...newsOptions, params: {...newsOptions.params, 'page-size': 6, section: 'money' }}, {CancelToken: source.token}).then(function (response) {
        setDataNews(response.data.response.results)
        
      }).catch(function (error) {
        console.error(error);
      });
    }

    fetchNews()
    handleCurrencyRequest()
    return () => {
      controller.abort()
      source.cancel()
    }
  }, [])


  //Handlers
  const handleToggleModal = (flag) => {
    if(flag === 'from' ) {
      setIsOpen({ to: false, from: !isOpen.from})
    } else {
      setIsOpen({ to: !isOpen.to, from: false})
    }
  }

  //Handle click li item
  const handleClick = (item, flag) => {
    flag === 'from' ?  setExchangeFrom(item) : setExchangeTo(item)
  }

  // Handle from <=> to
  const handleSwap = () => {
    const newTo = exchangeFrom
    const newFrom = exchangeTo
    setExchangeFrom(newFrom)
    setExchangeTo(newTo)
  }

  return (
    <div className='currency_page_wrapper'>
      <div className='currency_page'>
      
        <h1><BsCurrencyExchange /> Currency converter</h1>

        <div className="currency_container">

          <div className="amount">
            <span>{exchangeFrom?.symbol}</span>
            <input
              type='text'
              value={inputValue}
              placeholder='Convert value...'
              onChange={(e) => setInputValue(e.target.value)}  
            />
          </div>

          {/* From */}
          <ExchangeCard
            handleToggleModal={handleToggleModal} 
            exchange={exchangeFrom}
            isOpen={isOpen.from}
            allCurrency={allCurrency}
            handleClick={handleClick}
            flag='from'
          />

          <div className="change" onClick={handleSwap}>
            <VscArrowSwap />
          </div>

          {/* To */}
          <ExchangeCard
            handleToggleModal={handleToggleModal} 
            exchange={exchangeTo}
            isOpen={isOpen.to}
            allCurrency={allCurrency}
            handleClick={handleClick}
            flag='to'
          />
        </div>
        
        {exchangeFrom &&
          <Result
            value={inputValue}
            toValue={exchangeTo}
            fromValue={exchangeFrom}
          />
        }
      </div>
      {dataNews&& <NewsContainer data={dataNews} /> }
    </div>
  )
}
