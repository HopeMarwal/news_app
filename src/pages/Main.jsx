import {lazy, Suspense } from 'react';
//Style
import '../assets/scss/home.scss'
//Router
import { Link } from 'react-router-dom'
//Context
import { useNews } from '../context/NewsContext'

//Components
const LargeBanner = lazy(() => import('../components/LargeBanner')) 
const NewsContainer = lazy(() => import('../components/NewsContainer')) 



export default function Main() {
  const {dataNews, bannerNews, sportNews} = useNews()
  const loader = () => <p style={{maxWidth: '750px', margin: '20px auto'}}>Loading data...</p>
  return (
    <Suspense fallback={loader()}>
      <div className='main-page'>
        {/* Large Banner */}
        { dataNews && <LargeBanner data={dataNews[0]} heading='new today' /> }

        {/* 9 most relevance all news */}
        { dataNews &&  <NewsContainer data={dataNews.slice(1, 10)} /> }
        
        
        {/* 2 Large banner UK news */}
        { bannerNews && <LargeBanner data={bannerNews[0]} heading='UK News' /> }
        { bannerNews && <LargeBanner data={bannerNews[1]} heading='' /> }

        {/* 3 Sport news */}
        {sportNews&& <NewsContainer data={sportNews} title='Sport' />}
        <div className='btn_container'>
          <Link className='btn' to='/sport'>
            Read more
          </Link>
        </div>

        {/* 8 latest News */}
        <h3 style={{width: '100%'}}>Latest news</h3>
        <div className="container latest">
          {dataNews &&
            dataNews.slice(10, 20).map((item, index) => (
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
    </Suspense>
    
  )
}
