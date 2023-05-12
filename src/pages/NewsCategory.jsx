import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
//API
import axios from 'axios';
import { newsOptions } from '../utils/fetchData';
//Style
import '../assets/scss/category.scss'
//Lazy load
import loadable from '@loadable/component'
//Spinner
import LoadingSpinner from '../components/Spinner.jsx'
//Components
const LargeBanner = loadable(() => import('../components/LargeBanner'), { fallback: <LoadingSpinner /> }) 
const NewsContainer = loadable(() => import('../components/NewsContainer'), { fallback: <LoadingSpinner /> }) 

export default function NewsCategory() {
  const { category } = useParams()
  const [dataNews, setDataNews] = useState(null)
  const [ isLoading , setIsLoading] = useState(false)

  //Fetch data news
  useEffect(() => {
    const source = axios.CancelToken.source()
    setIsLoading(true)
    const fetchNews = async () => {
      axios.request({...newsOptions, cancelToken: source.token, params: {...newsOptions.params, 'page-size': 31, section: category }}).then(function (response) {
        setDataNews(response.data.response.results)
        setIsLoading(false)
      }).catch(function (error) {
        if(error.name === 'CanceledError') {
          console.log('User aborted request')
        } else {
          console.error(error);
        }
      });
    }
    fetchNews()

    return () => {
      source.cancel()
    }
  }, [category])

  const loader = () => <p style={{maxWidth: '750px', margin: '20px auto'}}>Loading data...</p>
  return (
    <div className='category_page'>
      {dataNews && <LargeBanner data={dataNews[0]} heading={category}/>}
      {dataNews && <NewsContainer data={dataNews.slice(1,)} /> }
    </div>
  )
}
