import '../assets/scss/largeBanner.scss'

export default function LargeBanner({ data, heading }) {

  return (
    <div className='large_banner'>
      <h3>{heading}</h3>
      <div className='large_banner-body'>
        <img src={data?.media} />

        <div className='large_banner-body-info'>
          <div className='news_category'>
            <span>{data?.topic}</span>
          </div>
          <p>{data?.title}</p>
        </div>

      </div>
    </div>
  )
}
