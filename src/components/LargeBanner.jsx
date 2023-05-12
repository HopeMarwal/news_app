import '../assets/scss/largeBanner.scss';
//Router
import { Link } from 'react-router-dom';
//React
import { useState, useEffect } from 'react';
//Spinner
import LoadingSpinner from './Spinner';

export default function LargeBanner({ data, heading }) {
  const [ isLoading, setIsLoading ] = useState(true)

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
  },[])

  const id = data.id.replaceAll('/', '_')

  if(isLoading) {
    return <LoadingSpinner />
  }

  return (
    <Link to={`/${data.sectionId}/${id}`} className='large_banner'>
      <h3>{heading}</h3>
      <div className='large_banner-body'>
        <img src={data?.fields.thumbnail} alt={data?.webTitle} loading='lazy'/>

        <div className='large_banner-body-info'>
          <div className='news_category'>
            <span>{data?.sectionName}</span>
          </div>
          <p>{data?.webTitle}</p>
        </div>

      </div>
    </Link>
  )
}
