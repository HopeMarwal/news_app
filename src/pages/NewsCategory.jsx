import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
//API
import axios from 'axios';
import { newsOptions } from '../utils/fetchData';
//Components
import LargeBanner from '../components/LargeBanner';
import NewsCard from '../components/NewsCard';


export default function NewsCategory() {
  const { category } = useParams()
  const [dataNews, setDataNews] = useState(null)
  useEffect(() => {
    const fetchNews = async () => {
      axios.request({...newsOptions, params: {...newsOptions.params, 'page-size': 20, section: category }}).then(function (response) {
        setDataNews(response.data.response.results)
        
      }).catch(function (error) {
        console.error(error);
      });
    }
    fetchNews()
  }, [category])
  return (
    <div className='news_category'>
      {dataNews&& <LargeBanner data={dataNews[0]} heading={category}/>}
    </div>
  )
}
