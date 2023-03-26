import {useState} from 'react'
import { options, fetchData } from '../utils/fetchData'
import axios from 'axios'

export default function News() {
  const [dataNews, setDataNews] = useState([])
  const url = 'https://api.newscatcherapi.com/v2/latest_headlines'

  const handleClick = async () => {
    axios.request(options).then(function (response) {
      setDataNews(response.data.articles)
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div>
      <button onClick={handleClick}>Fetch</button>
      News
    </div>
  )
}
