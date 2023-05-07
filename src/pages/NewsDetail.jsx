import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
//Context
import parse, { attributesToProps } from 'html-react-parser';
//style
import '../assets/scss/detail.scss'
//Router
import { Link } from 'react-router-dom';
import axios from 'axios';
import { newsOptions } from '../utils/fetchData';

export default function NewsDetail() {
  //State
  const [ newsDetail, setNewsDetail ] = useState(null)
  const {category, id} = useParams()
   //Local vars
  const idToFind = id.replaceAll('_', '/')
 
  const newsDetailOption = {
    ...newsOptions,
    url: `https://content.guardianapis.com/${idToFind}`,
    params: {
      ...newsOptions.params,
      'show-fields': 'thumbnail,body,headline,standfirst,trailText,byline,publication'
    }
  }
  const date = (new Date(newsDetail?.webPublicationDate)).toLocaleDateString().replaceAll('/', '.')
  //Effect
  useEffect(() => {
    fetchDetails()
  }, [id])

  //Func
  const fetchDetails = async () => {
    await axios.request(newsDetailOption).then(function(response) {
      setNewsDetail(response.data.response.content)
    })
  }

  const options = {
    replace: domNode => {
      if(domNode.name && domNode.name === 'a' && domNode.parent.name === 'figure') {
        console.dir(domNode)
        const domProps = domNode.attribs.href
        return <iframe src={domProps} />
      }
    }
  }
  

  if (!newsDetail) {
    return <div className='news_detail'><span>Loading...</span></div>
  }
  return (
    <div className='news_detail'>
      <Link to={`/${category}`} className='section_name'>{newsDetail?.sectionName}</Link>
      <h1><span>{newsDetail?.fields.headline}</span></h1>
      <div className="byline">{newsDetail?.fields.byline}</div>
      <div className="publish_time">{date}</div>
      {newsDetail&& 
      <div className="standfirst">
        <div>{parse(newsDetail?.fields.standfirst)}</div>
      </div>
      }
      
      {newsDetail&& <div className='body'>{parse(newsDetail?.fields.body, options)}</div>}
    </div>
  )
}
