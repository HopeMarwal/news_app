import React from 'react'
import { useParams } from 'react-router-dom'

export default function NewsDetail() {
  const {category, id} = useParams()
  const itToFind = id.replaceAll('_', '/')
  return (
    <div>
        <h1>Category: {category}</h1>
        <h4>ID: {itToFind}</h4>
    </div>
  )
}
