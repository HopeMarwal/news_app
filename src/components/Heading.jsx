import GB from '../assets/img/flags/GB.svg';
import US from '../assets/img/flags/US.svg';
//Style
import '../assets/scss/heading.scss'
//React
import { useEffect, useState } from "react";
//Icons
import { weatherIcons } from '../assets/img/icons/weatherIcons';
import { Link } from 'react-router-dom';
//Axios
import { currencyOptions } from '../utils/fetchData';

//TODO:
//Currency link

export default function Heading() {
  const ipToken = 'a532296877f3d8'
  const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

  const [forecastData, setForecastData] = useState({})
  const [currencyData, setCurrencyData] = useState(null)
  const [weatherLink, setWeatherLink] = useState('')
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const handleWeatherRequest = async () => {
      //Request API coord
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      const queryCoord = jsonIpResponse.loc
      const city = jsonIpResponse.city

      //Request location
      const locationKeyRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherToken}&q=${queryCoord}`)
      const jsonKeyResponse = await locationKeyRequest.json()
      const key = jsonKeyResponse.Key
      
      //Request forecast
      const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherToken}&metric=true`)
      const jsonForecastRes = await forecastRequest.json()
      setWeatherLink(jsonForecastRes.Headline.Link)

      // eslint-disable-next-line
      createForecastObject(jsonForecastRes.DailyForecasts[0], city)
    }

    const handleCurrencyRequest = async () => {
      const currencyRequest = await fetch('https://currency-converter-pro1.p.rapidapi.com/latest-rates?base=GBP', currencyOptions)
      const jsonCurrencyRes = await currencyRequest.json()
      setCurrencyData(jsonCurrencyRes.result)
    }

    handleWeatherRequest()
    handleCurrencyRequest()
  }, [])

  const createForecastObject = (data, city) => {
    const date = new Date(data.Date)
    const today = new Date()
    const hour = today.getHours()

    let iconId = hour > 18 || hour < 4 ? data.Night.Icon : data.Day.Icon
    let icon;

    for(let i = 1; i < weatherIcons.length; i++) {
      if(weatherIcons[i].id === iconId) {
        icon = weatherIcons[i].value
      }
    }

    const forecast = {
      temperature: Math.round((data.Temperature.Minimum.Value + data.Temperature.Maximum.Value)/2),
      day: date.getDate(),
      month: months[date.getMonth()],
      icon: icon,
      city: city
    }

    setForecastData(forecast)
  }


  return (
    <header>
      <div className='header_content'>

        <p className='logo'>ne<span>w</span>s</p>

        <Link className='widget currency'>
          <img src={GB} alt='GB_flag' />
          <span>1 GBP = {currencyData?.USD.toFixed(2)} USD</span>
          <img src={US} alt='US_flag' />
        </Link>

        <Link to={weatherLink} target='_blank'  className='widget weather'>
          <p className="city">{forecastData?.city}</p>
          <span>{forecastData?.day} {forecastData?.month}</span>
          <img src={forecastData?.icon} alt='weather_news' />
          <span>{forecastData?.temperature}°</span>
        </Link>
      </div>
      
    </header>
  )
}
