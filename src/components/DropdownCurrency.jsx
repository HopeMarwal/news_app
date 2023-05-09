import React from 'react'

export default function DropdownCurrency({isOpen, data, handleClick, flag}) {
  return (
    <ul className={`list ${isOpen && 'show'}`}>
            {data.length > 0 &&

              data.map((item) => (

                <li key={item.code} onClick={() => handleClick(item, flag)}>

                  <img src={`data:image/png;base64,${item.flag}`}  alt={item.name}/>
                  <p> {item.code} - <span>{item.name}</span></p>

                </li>
              ))
            }
          </ul>
  )
}
