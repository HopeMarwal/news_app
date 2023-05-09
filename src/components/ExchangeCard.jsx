import DropdownCurrency from './DropdownCurrency'
//Icons
import { VscChevronDown } from 'react-icons/vsc'
import { AiOutlineClose } from 'react-icons/ai'

export default function ExchangeCard({handleToggleModal, exchange, isOpen, allCurrency, handleClick, flag}) {
  return (
    <div className="currency_block" onClick={() => handleToggleModal(flag)}>
          <img src={`data:image/png;base64,${exchange?.flag}`} />
          <p> {exchange?.code} - <span>{exchange?.name}</span></p>
          {/* Make cond */}
          {isOpen ? <AiOutlineClose /> : <VscChevronDown />}
          
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
