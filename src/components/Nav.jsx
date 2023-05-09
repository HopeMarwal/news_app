//React
import { useEffect, useState } from 'react';
//Style
import '../assets/scss/nav.scss';
//Router
import { NavLink} from 'react-router-dom';
//Context
import { useNews } from '../context/NewsContext';
//Icon
import { Icon } from './Icon.tsx';


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
          { isMenuOpen ? <Icon nameIcon='AiOutlineClose' /> : <Icon nameIcon='RxHamburgerMenu' /> }
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
          More <Icon nameIcon='VscChevronDown' className={isMoreOpen ? 'open' : 'close'}/>
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
