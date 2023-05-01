import '../assets/scss/largeBanner.scss'

export default function LargeBanner({ data, heading }) {

  return (
    <div className='large_banner'>
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
    </div>
  )
}
