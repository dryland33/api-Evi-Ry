'use strict';

function gitRepos(handle) {
  const searchURL = 'https://api.github.com/users/' + handle + '/repos';
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

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the results array, stopping at the max number of results
  for (let i = 0; i < responseJson.length; i++) {
    $('#results-list').append(
      `<li> 
        ${responseJson[i].name}
      </li>`
    )
  }
  //display the results section  
  $('#results').removeClass('hidden');
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    //const searchTerm = document.getElementById('#js-search-term').value;
    gitRepos(searchTerm);
  });
}

$(watchForm);