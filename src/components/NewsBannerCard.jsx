import '../assets/scss/largeBanner.scss';
import '../assets/scss/newsCard.scss'
//Router
import { Link } from 'react-router-dom';
//React
import { useState, useEffect } from 'react';
//Spinner
import LoadingSpinner from './Spinner';
//Img lazy load
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import img_placeholder from '../assets/img/img_placeholder.png'

export default function NewsBannerCard({ data, heading, isBanner }) {
  const id = data.id.replaceAll('/', '_')
  const isImgField = data?.hasOwnProperty('fields')
  const [ isLoading, setIsLoading ] = useState(true)

  useEffect(() => {
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

    if(isImgField) {
      cashImg(data?.fields.thumbnail)
    }
    
  },[])

  if(isLoading) {
    return <LoadingSpinner />
  } 
  return (
    <Link to={`/${data.sectionId}/${id}`} className={isBanner ? 'large_banner' : 'news-card_wrapper'}>
      <h3>{heading}</h3>
      <div className='card-body'>
        <div className="img">
          <LazyLoadImage
            src={isImgField ? data?.fields.thumbnail : img_placeholder}
            height={'100%'}
            alt={data.webTitle}
            width={'100%'}
            effect='blur'   
          />
        </div>
        

        <div className='card-body-info'>
          <div className='category'>
            <span>{data?.sectionName}</span>
          </div>
          <p className='title'>{data?.webTitle.slice(0, 60)}...</p>
        </div>

      </div>
    </Link>
  )
}
