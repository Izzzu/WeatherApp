var socket = io();

jQuery('#button').on('click', (e) => {
  console.log('inside form');
  e.preventDefault();
  var add = jQuery('#address');
  socket.emit('address', add.val());
})

socket.on('weatherInfo', (weatherInfo) => {
  var w = jQuery("#weather");
  w.text(weatherInfo.address + ", " + weatherInfo.summary + ", " + weatherInfo.temperature + "℃");
  jQuery('#address').val('');
});

socket.on('errorMessage', (errorMessage) => {
  var w = jQuery("#weather");
  w.addClass("data-alert");
  w.text(errorMessage);
  jQuery('#address').val('');
});

jQuery("#address").on('keyup', (event) => {
    if(event.keyCode == 13){
        jQuery("#button").click();
    }
});