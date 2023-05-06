import {useEffect, useState} from 'react'
import { newsOptions } from '../utils/fetchData'
import axios from 'axios'
import LargeBanner from '../components/LargeBanner'
import NewsCard from '../components/NewsCard'
//Style
import '../assets/scss/home.scss'
import { Link } from 'react-router-dom'

export default function Main() {
  const [dataNews, setDataNews] = useState(null)
  const [ukNews, setUkNews] = useState(null)
  const [sportNews, setSportNews] = useState(null)
  const [latestNews, setLatestNews] = useState(null)

  useEffect(() => {
    fetchNews('all')
    fetchUkNews()
    fetchSportNews()
  }, [])

  // Fetch all news
  const fetchNews = async () => {
    axios.request({...newsOptions, params: {...newsOptions.params, 'page-size': 20}}).then(function (response) {
      setDataNews(response.data.response.results.slice(0,10))
      setLatestNews(response.data.response.results.slice(10,))
    }).catch(function (error) {
      console.error(error);
    });
  }

  // Fetch UK news for banners
  const fetchUkNews = async () => {
    axios.request({...newsOptions, params: {...newsOptions.params, q: 'uk', 'page-size': 2}}).then(function (response) {
      setUkNews(response.data.response.results)
    }).catch(function (error) {
      console.error(error);
    });
  }

    // Fetch Sport news for sport card news
    const fetchSportNews = async () => {
      axios.request({...newsOptions, params: {...newsOptions.params, section: 'sport', 'page-size': 3}}).then(function (response) {
        setSportNews(response.data.response.results)
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
        { dataNews.slice(1, ).map((item) => {
          return <NewsCard data={item} key={item.id} />
        })}
      </div>
      }
      
      {/* 2 Large banner UK news */}
      { ukNews && <LargeBanner data={ukNews[0]} heading='UK News' /> }
      { ukNews && <LargeBanner data={ukNews[1]} heading='' /> }

      {/* 3 Sport news */}
      
      <div className="container">
        <h3 style={{width: '100%'}}>Sport</h3>
        {sportNews&&
          sportNews.map((item) => (
            <NewsCard data={item} key={item.id} />
          ))
        }
        <div className='btn_container'>
          <Link className='btn' to='/sport'>
            Read more
          </Link>
        </div>
        
      </div>
      
      {/* 8 latest News */}
      <h3 style={{width: '100%'}}>Latest news</h3>
      <div className="container latest">
        {latestNews&&
          latestNews.map((item, index) => (
            <Link to={`/${item.sectionId}/${item.id.replaceAll('/', '_')}`} key={item.id}>
              <div className='container_item'>
                <span>{index + 1}</span>
                <p>{item.webTitle}</p>
              </div>
              
            </Link>
          ))

        }
      </div>
    </div>
  )
}
