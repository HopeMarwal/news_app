import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { newsOptions } from "../utils/fetchData";

const NewsContext = createContext()

export const NewsProvider = ({ children }) => {
  //State
  const [category, setCategory] = useState('all')
  const [dataNews, setDataNews] = useState(null)
  const [bannerNews, setBannerNews] = useState(null)
  const [sportNews, setSportNews] = useState(null)

  //Handle Fetch News
  useEffect(() => {
    const source = axios.CancelToken.source()
    
    if(category === 'all') {
      fetchTestNews(source.token, 31)
    } else {
      fetchTestNews(source.token, 31, category)
    }
    fetchTestNews(source.token, 2, 'uk-news')
    fetchTestNews(source.token, 3, 'sport')

    return () => {
      source.cancel()
    }
  }, [category])


  //Fetch data func
  const fetchTestNews = async (token, pageSize, section) => {
    await axios.request({...newsOptions, params: {...newsOptions.params, 'page-size': pageSize, section: section}}, {cancelToken: token}).then(function (response) {
      if(pageSize === 3) {
        setSportNews(response.data.response.results)
      } else if(pageSize === 2) {
        setBannerNews(response.data.response.results)
      } else {
        setDataNews(response.data.response.results)
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  return (
    <NewsContext.Provider value={{ category, setCategory, dataNews, bannerNews, sportNews}}>
      {children}
    </NewsContext.Provider>
  )
}

export const useNews = () => useContext(NewsContext)