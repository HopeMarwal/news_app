import icon from '../assets/img/icons/could_icon.svg'
import GB from '../assets/img/flags/GB.svg';
import US from '../assets/img/flags/US.svg';
//Style
import '../assets/scss/heading.scss'
//React
import { useEffect, useState } from "react";
//Icons
import { weatherIcons } from '../assets/img/icons/weatherIcons';

export default function Heading() {

  // TO DO: 
  // 1) Currency flags object
  // 2) Fetch data currency/weather
  // 3) Make Link(s) container from widgets
  const ipToken = 'a532296877f3d8'
  const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

  const [forecastData, setForecastData] = useState({})

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];

  useEffect(() => {
    const handleIpRequest = async () => {
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      const queryCoord = jsonIpResponse.loc

      const locationKeyRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherToken}&q=${queryCoord}`)
      const jsonKeyResponse = await locationKeyRequest.json()
      const key = jsonKeyResponse.Key

      const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherToken}&metric=true`)
      const jsonForecastRes = await forecastRequest.json()

      const date = new Date(jsonForecastRes.DailyForecasts[0].Date)
      const today = new Date()
      const hour = today.getHours()
    
      const forecast = {
        temperature: Math.round(jsonForecastRes.DailyForecasts[0].Temperature.Minimum.Value),
        day: date.getDate(),
        month: months[date.getMonth()],
        icon: hour > 16 || hour < 4 ? jsonForecastRes.DailyForecasts[0].Night.Icon : jsonForecastRes.DailyForecasts[0].Day.Icon
      }
      setForecastData(forecast)
    }
    handleIpRequest()
  }, [])

  const icon = () => {
    for(let i = 1; i < weatherIcons.length; i++) {
      if(weatherIcons[i].id === forecastData?.icon) {
        return weatherIcons[i].value
      }
    }
  }
  return (
    <header>
      <div className='header_content'>

        <p className='logo'>ne<span>w</span>s</p>

        <div className='widget'>
          <img src={GB} alt='GB_flag' />
          <span className='currency_symbol'>£</span>
          <span className='value'> = 1.22</span>
          <img src={US} alt='US_flag' />
          <span className='currency_symbol'>$</span>
        </div>

        <div className='widget'>
          <span>{forecastData?.day} {forecastData?.month}</span>
          <img src={icon()} alt='weather' />
          <span>{forecastData?.temperature}°</span>
        </div>
      </div>
      
    </header>
  )
}
