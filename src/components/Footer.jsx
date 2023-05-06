import React from 'react';
import '../assets/scss/footer.scss';
//Icons
import { BsFacebook, BsTwitter, BsYoutube } from 'react-icons/bs'

const social_media = [
  {
    title: 'Facebook',
    icon: <BsFacebook className='icon fb'/>,
    link: 'https://www.facebook.com/theguardian'
  },
  {
    title: 'Twitter',
    icon: <BsTwitter className='icon tw'/>,
    link: 'https://twitter.com/guardian'
  },
  {
    title: 'Youtube',
    icon: <BsYoutube className='icon ytb'/>,
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

        <div className="footer_menu">
          <p>Terms & conditions</p>
          <p>Privacy & cookies</p>
          <p>Accessibility</p>
          <p>Contact us</p>
        </div>

        <div className="copyright">
          <p className='logo'>ne<span>w</span>s</p>
          <span> &copy; 2023 News </span>
        </div>

      </footer>
    </div>
  )
}
