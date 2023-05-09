import { useEffect, useState } from 'react'
import { currencyOptions } from '../utils/fetchData'

export default function Result({value, toValue, fromValue}) {
  const [ result, setResult ] = useState(null)
  const [ error, setError ] = useState('')

  useEffect(() => {
    setResult(null)
  }, [toValue.code, fromValue.code])

   //handle convert Api request
   const handleConvert = async() => {
    const currencyRequest = await fetch(`https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromValue.code}&to=${toValue.code}&amount=${value}`, currencyOptions)
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
  }

  if(error.length > 0 ) {
    return <div className="error">{error}</div>
  }
  return (
    <div className="result">
          {result &&
          <div className="result_container">
            <p className='input_val'>{value} {fromValue?.name}s = </p>
            <p className='result_val'>{result?.result.left}<span style={{color: 'gray'}}>{result?.result.right} </span> {toValue?.name}s</p>
            <p className='currency_detail'>{result?.from}</p>
            <p className='currency_detail'>{result?.to}</p>
          </div>
          }
          <button className="btn" onClick={handleConvert}> Convert </button>
        </div>
  )
}
