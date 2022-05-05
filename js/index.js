$(function() {
  
  $('.cards').mouseover(function(e){
    e.stopPropagation();
    $(e.target).closest('.card').children('.card-body').find('.btn-view-campaign').css('color', '#89D72D');
    $(e.target).closest('.card').children('.card-body').find('.btn-view-campaign').css('background-color', '#404040');
    $(e.target).closest('.card').children('.card-body').find('.location').css('color', 'black');
  });

  $('.cards').mouseout(function(e){
    e.stopPropagation();
    $(e.target).closest('.card').children('.card-body').find('.btn-view-campaign').css('color', '#404040');
    $(e.target).closest('.card').children('.card-body').find('.btn-view-campaign').css('background-color', '#89D72D');
    $(e.target).closest('.card').children('.card-body').find('.location').css('color', '#404040');
  });

  $.ajax({
    type: 'GET',
    url: 'https://forestlin2020.github.io/Cards/card-content.json',
    dataType: "json",
    success: function(res){
      const data = res.data // return {data: Array[6]}, Get rid of curly brace

      for (let i = 0; i < data.length; i++) {
        // 1. clone the card-component from templete to cards container
        // 2. generate unique class for each card
        $( '.card-component' ).first().clone().addClass( `card-${i}` ).appendTo( '.cards' );
        // Rendering title
        $( `.card-${i} .card-head .card-title` ).text(data[i].title);
        // Translate date form and render it
        $( `.card-${i} .card-body .card-date` ).append(formDateStr(data[i].date));
        // checking status and adding background to light up check icon
        if (data[i].status == 'Completed') $( `.card-${i} .card-body .circle-check` ).css('background-color', '#89D72D');
        // vertially render the locations
        for (let j = 0; j < data[i].locations.length; j++) 
          $( `.card-${i} .card-body .card-location` ).append('<p class="location">' + data[i].locations[j] + '</p>');
        // rendering the behavior and audiences
        $( `.card-${i} .card-body .card-behavior` ).text(data[i].behavior);
        for (let j = 0; j < data[i].audiences.length; j++) {
          $( `.card-${i} .card-body .card-audiences` ).append(data[i].audiences[j]);
          // Adding ', ' between two description
          if (j != data[i].audiences.length - 1) $( `.card-${i} .card-body .card-audiences` ).append(', ');
        }

      }
    },
    error: function(jqXHR, error, errorThrown) {
      if (jqXHR.status == 0) {
        alert ('Not connected.\nPlease verify your network connection.');
      } else if (jqXHR.status == 404) {
          alert ('The requested page not found. [404]');
      } else if (jqXHR.status == 500) {
          alert ('Internal Server Error [500].');
      } else if (exception === 'parsererror') {
          alert ('Requested JSON parse failed.');
      } else if (exception === 'timeout') {
          alert ('Time out error.');
      } else if (exception === 'abort') {
          alert ('Ajax request aborted.');
      } else {
          alert ('Uncaught Error.\n' + jqXHR.responseText);
      }
    }
  });
});

// For UI to format dates
const months = [
  'Jan.', // 'January',
  'Feb.', // 'February',
  'Mar.',  // 'March',
  'Apr.',  // 'April',
  'May',  //'May',
  'Jun.', // 'June',
  'Jul.', // 'July',
  'Aug.', // 'August',
  'Sep.',  // 'September',
  'Oct.',  // 'October',
  'Nov.', // 'November',
  'Dec.', // 'December',
];

const formDateStr = (str) => {
  var date = new Date(str);
  var dateStr =
    months[date.getMonth()] +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear();
  return dateStr;
}