export const newsOptions = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/latest_headlines',
  params: { lang: 'en', when: '24h', page: 1, page_size: 50 },
  headers: {
    'x-api-key' : process.env.REACT_APP_API_KEY,
  }
}

export const currencyOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com'
  }
};


export const fetchData = async (url, options) => {
  const response = await fetch(url, options); 
  const data = await response.json();

  return data;
}