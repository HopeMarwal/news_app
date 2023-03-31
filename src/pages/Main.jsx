import {useEffect, useState} from 'react'
import { newsOptions } from '../utils/fetchData'
import axios from 'axios'
import LargeBanner from '../components/LargeBanner'

export default function Main() {
  const [dataNews, setDataNews] = useState([])
  useEffect(() => {
    fetchAllNews()
  }, [])

  const fetchAllNews = async () => {
    axios.request(newsOptions).then(function (response) {
      setDataNews(response.data.articles)
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <div>
      <LargeBanner data={dataNews[0]} heading='new today' />
      {/* Large Banner */}
      {/* 6 most relevance all news */}
      {/* 2 Large banner UK news */}
      {/* 3 Sport news */}
      {/* 8 latest News */}
    </div>
  )
}
