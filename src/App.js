import { useEffect, useState } from "react";
import News from "./components/News";

function App() {
  const ipToken = 'a532296877f3d8'
  const accuWeatherToken = 'slIlACVHV0hMvoQA15SWVvGjN2B2yCEy'

  const [forecastData, setForecastData] = useState([])

  useEffect(() => {
    const handleIpRequest = async () => {
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      const queryCoord = jsonIpResponse.loc

      const locationKeyRequest = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${accuWeatherToken}&q=${queryCoord}`)
      const jsonKeyResponse = await locationKeyRequest.json()
      const key = jsonKeyResponse.Key

      const forecastRequest = await fetch(`http://dataservice.accuweather.com/forecasts/v1/daily/1day/${key}?apikey=${accuWeatherToken}`)
      const jsonForecastRes = await forecastRequest.json()
      setForecastData(jsonForecastRes.DailyForecasts[0])

    }
    handleIpRequest()
  }, [])

  return (
    <div className="App">
      App
      <News />

    </div>
  );
}

export default App;
