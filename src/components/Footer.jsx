import React from 'react';
import '../assets/scss/footer.scss';
//Icons
import { BsFacebook, BsTwitter, BsYoutube } from 'react-icons/bs'

const social_media = [
  {
    title: 'Facebook',
    icon: <BsFacebook />,
    link: 'https://www.facebook.com/theguardian'
  },
  {
    title: 'Twitter',
    icon: <BsTwitter />,
    link: 'https://twitter.com/guardian'
  },
  {
    title: 'Youtube',
    icon: <BsYoutube />,
    link: 'https://www.youtube.com/@guardiannews'
  },
]

export default function Footer() {
  return (
    <div className="footer_wrapper">
      <footer>
        <div className="social_media">
          {
            social_media.map((item) => (
              <a href={item.link} key={item.title}>
                {item.icon}
                <span>{item.title}</span>
              </a>
            ))
          }
        </div>
      </footer>
    </div>
  )
}
