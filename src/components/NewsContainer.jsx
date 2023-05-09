import React from 'react';
import NewsCard from './NewsCard';


export default function NewsContainer({data, title}) {
  return (
    <div className="container">
      { title&& <h3 style={{width: '100%'}}>{title}</h3> }
      { data && data.map((item) => ( <NewsCard data={item} key={item.id} /> )) }
    </div>
  )
}
