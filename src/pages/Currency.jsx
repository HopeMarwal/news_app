import { useState, useEffect} from 'react'
import currencyData from '../utils/countryFlags.json'
//Icons
import { VscArrowSwap, VscChevronDown } from 'react-icons/vsc'
import { AiOutlineClose } from 'react-icons/ai'
//Style
import '../assets/scss/currency.scss'
//fetch
import { currencyOptions } from '../utils/fetchData'


export default function Currency() {
  //State
  const [ allCurrency, setAllCurrency ] = useState([])
  const [ exchangeFrom, setExchangeFrom ] = useState(null)
  const [ exchangeTo, setExchangeTo ] = useState(null)
  const [ inputValue, setInputValue ] = useState('')
  const [ isFromOpen, setIsFromOpen ] = useState(false)
  const [ isToOpen, setIsToOpen ] = useState(false)
  const [ result, setResult ] = useState(null)
  const [ error, setError ] = useState('')

  //Effect
  useEffect(() => {
    const handleCurrencyRequest = async () => {
      const currencyRequest = await fetch('https://currency-converter-pro1.p.rapidapi.com/currencies', currencyOptions)
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
  }, [])

  //Handlers
  const handleToggleModal = (flag) => {
    if(flag === 'from' ) {
      setIsToOpen(false)
      setIsFromOpen(!isFromOpen)
    } else {
      setIsFromOpen(false)
      setIsToOpen(!isToOpen)
    }
  }

  //Handle click li item
  const handleClick = (item, flag) => {
    setResult(null)
    if(flag === 'from') {
      setExchangeFrom(item)
    } else {
      setExchangeTo(item)
    }
  }

  // Handle from <=> to
  const handleSwap = () => {
    setResult(null)
    const newTo = exchangeFrom
    const newFrom = exchangeTo
    setExchangeFrom(newFrom)
    setExchangeTo(newTo)
  }

  //handle convert Api request
  const handleConvert = async() => {
    const currencyRequest = await fetch(`https://currency-converter-pro1.p.rapidapi.com/convert?from=${exchangeFrom.code}&to=${exchangeTo.code}&amount=${inputValue}`, currencyOptions)
    const jsonCurrencyRes = await currencyRequest.json()
    if(!jsonCurrencyRes.success) {
      setError('Enter valid number')
      setResult(null)
      return
    } 
    setError('')
    const res = jsonCurrencyRes.result.toString()
    const index = res.indexOf('.')
    const leftRes = res.slice(0, index + 3)
    const rightRes = res.slice(index + 3,)

    const finalResObj = {
      from: jsonCurrencyRes.meta.formated.from,
      to:  jsonCurrencyRes.meta.formated.to,
      result: {
        left: leftRes,
        right: rightRes
      }
    }
    setResult(finalResObj)
    console.log(finalResObj)
  }


  return (
    <div className='currency_page'>

      <div className="currency_container">

        <div className="amount">
          <span>{exchangeFrom?.symbol}</span>
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}  
          />
        </div>

        {/* From */}
        <div className="currency_block" onClick={() => handleToggleModal('from')}>
          <img src={`data:image/png;base64,${exchangeFrom?.flag}`} />
          <p> {exchangeFrom?.code} - <span>{exchangeFrom?.name}</span></p>
          {/* Make cond */}
          {isFromOpen ? <AiOutlineClose /> : <VscChevronDown />}
          

          {/* Dropdown menu */}
          <ul className={`list ${isFromOpen && 'show'}`}>
            {allCurrency.length > 0 &&

              allCurrency.map((item) => (

                <li key={item.code} onClick={() => handleClick(item, 'from')}>

                  <img src={`data:image/png;base64,${item.flag}`}  alt={item.name}/>
                  <p> {item.code} - <span>{item.name}</span></p>

                </li>
              ))
            }
          </ul>
        </div>

        <div className="change" onClick={handleSwap}>
          <VscArrowSwap />
        </div>

        {/* To */}
        <div className="currency_block" onClick={() => handleToggleModal('to')}>
          <img src={`data:image/png;base64,${exchangeTo?.flag}`} />
          <p> {exchangeTo?.code} - <span>{exchangeTo?.name}</span></p>
          {/* Make cond */}
          {isToOpen ? <AiOutlineClose /> : <VscChevronDown />}

          {/* Dropdown menu */}
          <ul className={`list ${isToOpen && 'show'}`}>
            {allCurrency.length > 0 &&
              allCurrency.map((item) => (

                <li key={item.code} onClick={() => handleClick(item, 'to')}>

                  <img src={`data:image/png;base64,${item.flag}`}  alt={item.name}/>
                  <p> {item.code} - <span>{item.name}</span></p>
                </li>

              ))
            }
          </ul>
        </div>
      </div>

          
      {error.length > 0 && <div className="error">{error}</div>}
      
        <div className="result">
          {result &&
          <div className="result_container">
            <p className='input_val'>{inputValue} {exchangeFrom?.name}s = </p>
            <p className='result_val'>{result?.result.left}<span style={{color: 'gray'}}>{result?.result.right} </span> {exchangeTo?.name}s</p>
            <p className='currency_detail'>{result?.from}</p>
            <p className='currency_detail'>{result?.to}</p>
          </div>
          }
          <button className="btn" onClick={handleConvert}> Convert </button>
        </div>
      
      

    </div>
  )
}
