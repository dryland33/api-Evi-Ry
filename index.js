'use strict';

let maxResults = 10;

function gitNews() {
  const searchURL = 'https://api.github.com/users/dryland33/repos';
  fetch(searchURL)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the results array, stopping at the max number of results
  for (let i=0; i<maxResults ; i++){
    $('#results-list').append(
      `<li> 
        ${responseJson[i].name}
      </li>`
    )}
  //display the results section  
  $('#results').removeClass('hidden');
};

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    //const searchTerm = $('#js-search-term').val();
    //const maxResults = $('#js-max-results').val();
    //gitNews(searchTerm, maxResults);
    gitNews();
  });
}

$(gitNews);

/*

function getNews(query, maxResults=10) {
  const params = {
    q: query,
    pageSize: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);

  const options = {
    headers: new Headers({
      "x-rapidapi-key": apiKey})
  };

  fetch(url, options)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}



$(watchForm);
*/