const fechAPIAll = async () => {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export default fechAPIAll;
