//React
import { useEffect, useState } from 'react';
//Style
import '../assets/scss/nav.scss';
//Router
import { NavLink} from 'react-router-dom';
//Icon
import { VscChevronDown } from 'react-icons/vsc';
import { RxHamburgerMenu } from 'react-icons/rx'
import { AiOutlineClose } from 'react-icons/ai'

const topics = ['world', 'politics', 'finance', 'science', 'business', 'travel', 'tech', 'economics', 'entertainment', 'beauty', 'food', 'gaming', 'energy']

export default function Nav() {
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

  const itemsToMap = windowWidth > 560 ? topics.slice(0, 5) : topics

  return (
    <nav>
      {
        windowWidth < 560 && 
        <button
          onClick={() => {setIsMenuOpen(!isMenuOpen)}}
          className='btn_burger'
          >
            { isMenuOpen ? <AiOutlineClose /> : <RxHamburgerMenu /> }
          </button>
      }
      <div className={`nav_menu ${isMenuOpen && 'show'}`}>
        <NavLink to='./' className={ windowWidth < 560 && 'expand'}>Home</NavLink>
        {
          itemsToMap.map((item) => (
            <NavLink 
              to={{ pathname: `./${item}` }} 
              onClick={() => setIsMoreOpen(false)} 
              key={item}
              className={ windowWidth < 560 && 'expand'}
            >
              {item}
            </NavLink>
          ))
        }
        { windowWidth > 560 && 
        <button 
          className='btn_nav'
          onClick={() => setIsMoreOpen(!isMoreOpen)}
        >
          More <VscChevronDown className={isMoreOpen ? 'open' : 'close'}/>
        </button>}

        { windowWidth > 560 && 
        <div className={`nav_menu_more ${isMoreOpen ? 'show' : ''}`}>
          {
            topics.slice(5, 13).map((item) => (
              <NavLink 
                to={{ pathname: `./${item}` }}
                onClick={() => setIsMoreOpen(false)}
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
