import DropdownCurrency from './DropdownCurrency'
//Icons
import VscChevronDown from '../assets/img/icons/VscChevronDown.svg'
import AiOutlineClose from '../assets/img/icons/AiOutlineClose.svg'

export default function ExchangeCard({handleToggleModal, exchange, isOpen, allCurrency, handleClick, flag}) {
  return (
    <div className="currency_block" onClick={() => handleToggleModal(flag)}>
          <img src={`data:image/png;base64,${exchange?.flag}`}  alt={exchange?.name}/>
          <p> {exchange?.code} - <span>{exchange?.name}</span></p>
          {/* Make cond */}
          {isOpen 
            ? <img src={AiOutlineClose} alt='close_dropdown' /> 
            : <img src={VscChevronDown} alt='open_dropdown' />
          }
          
          {/* Dropdown menu */}
          <DropdownCurrency
            flag={flag}
            isOpen={isOpen}
            data={allCurrency}
            handleClick={handleClick}
          />
        </div>
  )
}
