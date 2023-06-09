export const newsOptions = {
  method: 'GET',
  url: 'https://content.guardianapis.com/search',
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0'
  },
  params: {
    'api-key' : 'b6a0e96e-4e49-4842-ba4c-eec982ffb9cb',
    'show-fields': 'thumbnail'
  },
}

export const currencyOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
    'X-RapidAPI-Host': 'currency-converter-pro1.p.rapidapi.com',
    'Cache-Control': 'max-age=1400000'

  }
};


export const fetchData = async (url, options) => {
  const response = await fetch(url, options); 
  const data = await response.json();

  return data;
}