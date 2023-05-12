import { Link } from 'react-router-dom'
//Style
import '../assets/scss/newsCard.scss'
//React
import { useState, useEffect } from 'react';
//Spinner
import LoadingSpinner from './Spinner';
//Img lazy load
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';


export default function NewsCard({ data }) {
  const id = data.id.replaceAll('/', '_')
  const [ isLoading, setIsLoading ] = useState(true)
  // const headers = {
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true'
  // }

  useEffect(() => {
    const imgSrc = data?.fields.thumbnail
    const cashImg = async(src) => {
      const promise = await new Promise((resolve, reject) => {
          const img = new Image()
          img.src = src
          img.onload = resolve()
          img.onerror = reject()
        })
      
      await promise
      setIsLoading(false)
    }
    cashImg(imgSrc)

    // const imgFile = async (url) => {
    //   const res = await fetch(url, {headers});
    //   const blob = await res.blob(url);
    //   console.log(blob)

    // }

    // imgFile(img)
    
    
  },[])

  if(isLoading) {
    return <LoadingSpinner />
  }
  return (
    <Link to={`/${data.sectionId}/${id}`} className='news-card_wrapper'>
      <div className='news-card'>
        <div className='img'>
          
          <LazyLoadImage
            src={data?.fields.thumbnail}
            height={150}
            alt={data.webTitle}
            width={'100%'}
            effect='blur'
            
          />
        </div>
        
        <div className="news-card_info">
          <p className='category'>{data.sectionName}</p>
          <p className='title'>{data.webTitle.slice(0,60)}...</p>
        </div>
      </div>
    </Link>
   
  )
}
