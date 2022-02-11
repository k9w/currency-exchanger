import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './js/business-logic.js';

function clearFields() {
  $('#search-field').val("");
  $('#show-currency').html("");
  $('#show-errors').html("");
}

function getElements(response) {
  if (typeof response === "string") {
    $('#show-errors').text(`error on our end: ${response}`);
  } else if (!response[0]) {
    $('#show-errors').text(`error on your end: This currency doesn't exist. Try again!`);
    return;
  } else if (response[0]) {

    // This would be the currency conversion rate. Pass it to another
    // function to multiply it with the number of US dollars the user
    // entered.
    
    $('#show-currency').text(`Here is the description for ${response[0].name}. ${response[0].description}`);
    if (response[0].description === "") {
      $('#show-currency').text(`There is no description for ${response[0].name}.`);
    }
  }
}

async function makeApiCall(currency) {
  let response = await CurrencyExchange.getCurrency(currency);
  getElements(response);
}

$(document).ready(function() {
  $('#get-currency').click(function() {
    let currency = $('#search-field').val().toUpperCase();
    clearFields();
    if (currency.length === 3) {
      makeApiCall(currency);
    } else {
      $('#show-errors').text(`You can only enter 3 characters, no more, no less.`);
    }
  });  
});
