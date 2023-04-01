import {useEffect, useState} from 'react'
import { newsOptions } from '../utils/fetchData'
import axios from 'axios'
import LargeBanner from '../components/LargeBanner'
import NewsCard from '../components/NewsCard'
//Style
import '../assets/scss/home.scss'

export default function Main() {
  const [dataNews, setDataNews] = useState(null)
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
    <div className='main-page'>
      {/* Large Banner */}
      { dataNews && <LargeBanner data={dataNews[0]} heading='new today' /> }

      {/* 6 most relevance all news */}
      { dataNews && 
      <div className='container'>
        { dataNews.slice(1, 7).map((item) => {
          return <NewsCard data={item} key={item._id} />
        })}
      </div>
      }
      
      {/* 2 Large banner UK news */}
      {/* 3 Sport news */}
      {/* 8 latest News */}
    </div>
  )
}
