import DropdownCurrency from './DropdownCurrency'
//Icons
import { Icon } from './Icon.tsx'

export default function ExchangeCard({handleToggleModal, exchange, isOpen, allCurrency, handleClick, flag}) {
  return (
    <div className="currency_block" onClick={() => handleToggleModal(flag)}>
          <img src={`data:image/png;base64,${exchange?.flag}`}  alt={exchange?.name}/>
          <p> {exchange?.code} - <span>{exchange?.name}</span></p>
          {/* Make cond */}
          {isOpen ? <Icon nameIcon='AiOutlineClose' /> : <Icon nameIcon='VscChevronDown' />}
          
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
