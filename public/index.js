var countries = []


var app = function(){
  var url = 'https://restcountries.eu/rest/v2';
  makeRequest(url, requestComplete);

  var select = document.querySelector('#country-list')
  select.addEventListener('change', countrySelected)

  if(localStorage.getItem('country')){
    var country = JSON.parse(localStorage.getItem('country'));

    populateTable(country);
    borderingCountries(country)
  }
}


var makeRequest = function(url, callback){
  //create a new object XMLHTTPRequest object
  var request = new XMLHttpRequest();
  //set type of request we want to make hint:Get
  request.open('GET', url);
  // tell the request what function to run when it has completed
  request.addEventListener('load', callback);
  //send the request
  request.send();
}

var listBorders = function(border){
  var ul = document.querySelector('ul');
  var li = document.createElement('li');
  li.innerText = border;
  ul.appendChild(li);
}

var borderingCountries = function(country){
  var ul = document.querySelector('ul');
  ul.innerHTML = '';
  country.borders.forEach(function(border){
    listBorders(border);
  })
}

var requestComplete = function(){
  console.log("Request Successfully Completed!");
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  populateList(countries);
}

var populateList = function(countries){
  var select = document.querySelector('#country-list');

  countries.forEach(function(country){
    var option = document.createElement('option');
    countries.push(country);
   option.innerText = country.name;
   option.value = JSON.stringify(country);
   select.appendChild(option);

  })
}

var countrySelected = function() {
  var country = JSON.parse(this.options[this.selectedIndex].value);
  localStorage.setItem('country', this.options[this.selectedIndex].value)
  populateTable(country)
}

var populateTable = function(country){
  var table = document.querySelector('#country-table');
  var nameElement = document.querySelector('#name');
  var popElement = document.querySelector('#pop');
  var capitalElement = document.querySelector('#cap');
  nameElement.innerText = country.name;
  popElement.innerText = country.population;
  capitalElement.innerText = country.capital;
  table.appendChild(nameElement);
  table.appendChild(popElement);
  table.appendChild(capitalElement);
  borderingCountries(country);
}

window.addEventListener('load', app);