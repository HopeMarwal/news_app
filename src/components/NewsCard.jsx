import { Link } from 'react-router-dom'
//Style
import '../assets/scss/newsCard.scss'

export default function NewsCard({ data }) {
  const id = data.id.replaceAll('/', '_')
  return (
    <Link to={`/${data.sectionId}/${id}`} className='news-card_wrapper'>
      <div className='news-card'>
        <div className='img'>
          <img src={data.fields.thumbnail} alt={data.webTitle} />
        </div>
        
        <div className="news-card_info">
          <p className='category'>{data.sectionName}</p>
          <p className='title'>{data.webTitle.slice(0,80)}...</p>
        </div>
      </div>
    </Link>
   
  )
}
