import { Link } from 'react-router-dom'
//Style
import '../assets/scss/newsCard.scss'

export default function NewsCard({ data }) {
  return (
    <Link to={`/${data.topic}/${data._id}`} className='news-card_wrapper'>
      <div className='news-card'>
        <div className='img'>
          <img src={data.media} alt={data.rights} />
        </div>
        
        <div className="news-card_info">
          <p className='category'>{data.topic}</p>
          <p className='title'>{data.title}</p>
        </div>
      </div>
    </Link>
   
  )
}
