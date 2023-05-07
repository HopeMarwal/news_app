import '../assets/scss/largeBanner.scss';
//Router
import { Link } from 'react-router-dom';

export default function LargeBanner({ data, heading }) {

  const id = data.id.replaceAll('/', '_')

  return (
    <Link to={`/${data.sectionId}/${id}`} className='large_banner'>
      <h3>{heading}</h3>
      <div className='large_banner-body'>
        <img src={data?.fields.thumbnail} />

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
