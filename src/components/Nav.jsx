//React
import { useEffect, useState } from 'react';
//Style
import '../assets/scss/nav.scss';
//Router
import { NavLink} from 'react-router-dom';
//Context
import { useNews } from '../context/NewsContext';
//Icon
import VscChevronDown from '../assets/img/icons/VscChevronDown.svg'
import RxHamburgerMenu from '../assets/img/icons/RxHamburgerMenu.svg'
import AiOutlineClose from '../assets/img/icons/AiOutlineClose.svg'

const topics = ['world', 'politics', 'science', 'business', 'travel', 'technology', 'uk-news', 'education', 'money', 'music', 'sport', 'fashion', 'society', 'weather', 'food', 'games', 'environment']

export default function Nav() {
  const { setCategory } = useNews()
  const [isMoreOpen, setIsMoreOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCloseMenu = (item) => {
    setCategory(item)
    setIsMoreOpen(false)
    setIsMenuOpen(false)
  }

  const handleCloseMoreMenu = (item) => {
    setCategory(item)
    setIsMoreOpen(false)
  }

  const itemsToMap = windowWidth > 550 ? topics.slice(0, 5) : topics

  return (
    <nav>
      {/* Burger menu btn */}
      { windowWidth < 550 && 
        <button
          onClick={() => {setIsMenuOpen(!isMenuOpen)}}
          className='btn_burger'
          aria-label="Close and Open menu Button"
        >
          { isMenuOpen 
            ? <img src={AiOutlineClose} alt='AiOutlineClose' /> 
            : <img src={RxHamburgerMenu} alt='RxHamburgerMenu' /> }
        </button>
      }
      
      {/* MENU */}
      <div className={`nav_menu ${isMenuOpen && 'show'}`}>
        {/* Home link */}
        <NavLink 
          to='./' 
          className={ windowWidth < 550 && 'expand'}
          onClick={() => handleCloseMenu('all')}
        >
          Home
        </NavLink>

        {/* Nav links */}
        {
          itemsToMap.map((item) => (
            <NavLink 
              to={{ pathname: `./${item}` }} 
              onClick={() => handleCloseMenu(item)} 
              key={item}
              className={ windowWidth < 550 && 'expand'}
            >
              {item}
            </NavLink>
          ))
        }
       
        {/* Expand btn */}
        { windowWidth > 550 && 
        <button 
          className='btn_nav'
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          More <img src={VscChevronDown} alt='VscChevronDown' className={isMoreOpen ? 'open' : 'close'}/>
        </button>}

         {/* Large screen nav links */}
        { windowWidth > 550 && 
        <div className={`nav_menu_more ${isMoreOpen ? 'show' : ''}`}>
          {
            topics.slice(5,).map((item) => (
              <NavLink 
                to={{ pathname: `./${item}` }}
                onClick={() => handleCloseMoreMenu(item)}
                key={item}
                className='expand'
              >
                {item}
              </NavLink>
            ))
          }
        </div>}
      </div>
    </nav>
  )
}
