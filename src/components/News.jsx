import {useState} from 'react'
import { newsOptions } from '../utils/fetchData'
import axios from 'axios'

export default function News() {
  const [dataNews, setDataNews] = useState([])

  const handleClick = async () => {
    axios.request(newsOptions).then(function (response) {
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
