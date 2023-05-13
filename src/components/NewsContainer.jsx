import React from 'react';
//Lazy load
import loadable from '@loadable/component'

const NewsBannerCard = loadable(() => import('../components/NewsBannerCard')) 

export default function NewsContainer({data, title}) {
  return (
    <div className="container">
      { title&& <h3 style={{width: '100%'}}>{title}</h3> }
      { data && data.map((item) => ( <NewsBannerCard data={item} key={item.id} /> )) }
    </div>
  )
}
