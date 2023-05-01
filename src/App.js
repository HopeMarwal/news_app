import { Routes, Route } from "react-router-dom";
//React
import { useState, useEffect } from "react";
//Components
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Nav from "./components/Nav";
//Routes
import Main from "./pages/Main";
import NewsDetail from './pages/NewsDetail'
import NewsCategory from "./pages/NewsCategory";
//Style
import './assets/scss/main.scss';

const ipToken = 'a532296877f3d8'

function App() {
  const [apiData, setApiData] = useState(null)

  useEffect(() => {
    const fetchAPI = async () => {
      //Request API coord
      const ipRequest = await fetch(`https://ipinfo.io/json?token=${ipToken}`)
      const jsonIpResponse = await ipRequest.json()
      setApiData(jsonIpResponse)
    }
    fetchAPI()

  }, [])

  return (
    <div className="app">
      { apiData && <Heading city={apiData.city} location={apiData.loc} />}
      <Nav />
      <Routes>
        <Route path='/' element={ <Main />} />
        <Route path='/:category' element={ <NewsCategory  /> } />
        <Route path='/:category/:id' element={ <NewsDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
