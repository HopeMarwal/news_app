import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//API
import axios from 'axios';
import { newsOptions } from '../utils/fetchData';
//Components
import LargeBanner from '../components/LargeBanner';
import NewsCard from '../components/NewsCard';
//Style
import '../assets/scss/category.scss'


export default function NewsCategory() {
  const { category } = useParams()
  const [dataNews, setDataNews] = useState(null)
  useEffect(() => {
    const fetchNews = async () => {
      axios.request({...newsOptions, params: {...newsOptions.params, 'page-size': 31, section: category }}).then(function (response) {
        setDataNews(response.data.response.results)
        
      }).catch(function (error) {
        console.error(error);
      });
    }
    fetchNews()
  }, [category])
  return (
    <div className='category'>
      {dataNews && <LargeBanner data={dataNews[0]} heading={category}/>}
      <div className="container">
        {dataNews &&
          dataNews.slice(1,).map((item) => (
            <NewsCard data={item} key={item.id} />
          ))
        }
      </div>
    </div>
  )
}
