export const options = {
  method: 'GET',
  url: 'https://api.newscatcherapi.com/v2/latest_headlines',
  params: { lang: 'en', when: '24h', page: 1, page_size: 50 },
  headers: {
    'x-api-key' : process.env.REACT_APP_API_KEY,
  }
};




export const fetchData = async (url, options) => {
  const response = await fetch(url, options); 
  const data = await response.json();

  return data;
}