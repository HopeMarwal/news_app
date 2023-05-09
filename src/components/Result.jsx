import { useEffect, useRef, useState } from 'react'
import { currencyOptions } from '../utils/fetchData'

export default function Result({value, toValue, fromValue}) {
  const [ result, setResult ] = useState(null)
  const [ error, setError ] = useState('')
  const [ isLoading, setIsLoading] = useState(false)
  
  const controller = useRef(null)

  //Handle cancel request
  useEffect(() => {
    setResult(null)
    if(controller.current && isLoading) {
      controller.current.abort()
      console.log('Download aborted')
    }
    setIsLoading(false)
  }, [toValue.code, fromValue.code, value])


  //handle convert Api request
  const handleConvert = async() => {
    try {
      setIsLoading(true)
      controller.current = new AbortController()
      const url = `https://currency-converter-pro1.p.rapidapi.com/convert?from=${fromValue.code}&to=${toValue.code}&amount=${value}`
      const opt = {...currencyOptions, signal: controller.current.signal}
      const result = await fetch(url, opt)
      const data = await result.json()

      //Check if valid value
      if(!data.success) {
        setError('Enter valid number')
        setResult(null)
        return
      }

      //Empty error field
      setError('')

      //Parse result field
      const res = data.result.toString()
      const index = res.indexOf('.')
      const leftRes = res.slice(0, index + 3)
      const rightRes = res.slice(index + 3,)

      //Construct final object
      const finalResObj = {
        from: data.meta.formated.from,
        to:  data.meta.formated.to,
        result: {
          left: leftRes,
          right: rightRes
        }
      }
      setIsLoading(false)
      setResult(finalResObj)

    } catch(err) {
      setIsLoading(false)
      console.error(`Download error: ${err.message}`)
      if(err.name === 'AbortError') {console.log('Aborted')}
    }
  
  }


  if(error.length > 0 ) {
    return <div className="error">{error}</div>
  }
  return (
    <div className="result">
      { isLoading&& <p>Calculating in progress...</p> }
      { result &&
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
