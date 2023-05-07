//Components
import LargeBanner from '../components/LargeBanner'
import NewsCard from '../components/NewsCard'
//Style
import '../assets/scss/home.scss'
//Router
import { Link } from 'react-router-dom'
//Context
import { useNews } from '../context/NewsContext'

export default function Main() {
  const {dataNews, bannerNews, sportNews} = useNews()

  return (
    <div className='main-page'>
      {/* Large Banner */}
      { dataNews && <LargeBanner data={dataNews[0]} heading='new today' /> }

      {/* 6 most relevance all news */}
      { dataNews && 
      <div className='container'>
        { dataNews.slice(1, 10).map((item) => {
          return <NewsCard data={item} key={item.id} />
        })}
      </div>
      }
      
      {/* 2 Large banner UK news */}
      { bannerNews && <LargeBanner data={bannerNews[0]} heading='UK News' /> }
      { bannerNews && <LargeBanner data={bannerNews[1]} heading='' /> }

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
  )
}
