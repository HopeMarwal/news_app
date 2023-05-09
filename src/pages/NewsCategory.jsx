import { useState, useEffect, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
//API
import axios from 'axios';
import { newsOptions } from '../utils/fetchData';
//Components
//import LargeBanner from '../components/LargeBanner';
//import NewsContainer from '../components/NewsContainer';
//Style
import '../assets/scss/category.scss'

const LargeBanner = lazy(() => import('../components/LargeBanner')) 
const NewsContainer = lazy(() => import('../components/NewsContainer')) 

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
      <Suspense fallback={loader()}>
        {dataNews && <LargeBanner data={dataNews[0]} heading={category}/>}
        {dataNews && <NewsContainer data={dataNews.slice(1,)} /> }
      </Suspense>
    </div>
  )
}
