import { useState, useEffect} from 'react'
//Lazy load
import loadable from '@loadable/component'
//Icons
import BsCurrencyExchange from '../assets/img/icons/BsCurrencyExchange.svg'
import VscArrowSwap from '../assets/img/icons/VscArrowSwap.svg'
//Style
import '../assets/scss/currency.scss'
//fetch
import { currencyOptions, newsOptions } from '../utils/fetchData'
import currencyData from '../utils/countryFlags.json'
import axios from 'axios'
//Spinner
import LoadingSpinner from '../components/Spinner.jsx'


const loader = <LoadingSpinner />

//Components
const ExchangeCard = loadable(() => import('../components/ExchangeCard')) 
const Result = loadable(() => import('../components/Result'))
const NewsContainer = loadable(() => import('../components/NewsContainer'), { fallback: loader})

export default function Currency() {
  //State
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ dataNews, setDataNews ] = useState(null)

  const [ exchangeFrom, setExchangeFrom ] = useState(null)
  const [ exchangeTo, setExchangeTo ] = useState(null)
  const [ inputValue, setInputValue ] = useState('')

  const [isOpen, setIsOpen] = useState({from: false, to: false})
  

  //Effect
  useEffect(() => {
    
    const source = axios.CancelToken.source()

    //Fetch data news
    const fetchNews = async () => {
      await axios.request({...newsOptions, cancelToken: source.token, params: {...newsOptions.params, 'page-size': 6, section: 'money' }}).then(function (response) {
        setDataNews(response.data.response.results)
      }).catch(function (error) {
        if(error.name === 'CanceledError') {
          console.log(error.message)
        }
      });
    }

    fetchNews()
    return () => {
      source.cancel()
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    //Fetch currency data
    const handleCurrencyRequest = async () => {
      const currencyRequest = await fetch('https://currency-converter-pro1.p.rapidapi.com/currencies', {...currencyOptions, signal: signal})
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

    handleCurrencyRequest()
    return () => {
      controller.abort()
    }
  }, [])

  //Handlers
  const regexp = /^[0-9]*\.?[0-9]*$/
  const handleChange = (e) => {
    const target = e.target.value
    if(target.match(regexp)) {
      setInputValue(e.target.value)
    }
    
  }
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
        
          <h1><img src={BsCurrencyExchange} alt='BsCurrencyExchange' /> Currency converter</h1>

          {allCurrency.length > 0 ? 
          <div className="currency_container">

            <div className="amount">
              <span>{exchangeFrom?.symbol}</span>
              <input
                type='text'
                value={inputValue}
                placeholder='Convert value...'
                onChange={handleChange}  
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
              <img src={VscArrowSwap} alt='VscArrowSwap' />
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
          : <LoadingSpinner />}
          
          {exchangeFrom &&
            <Result
              value={inputValue}
              toValue={exchangeTo}
              fromValue={exchangeFrom}
            />
          }
        </div>
        {dataNews && <NewsContainer data={dataNews} />}
      </div>

  )
}
