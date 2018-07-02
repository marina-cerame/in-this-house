$(document).ready(function() {
  console.log('ready');

  $('#customText').submit(function(event) {
    event.preventDefault();
    console.log('submitted!');
    var newText = $('#inputText').serializeArray();
    console.log(newText);
    var encodedText = encodeURIComponent(newText[0].value);
    console.log(encodedText);
    window.location.assign('http://inthishousewe.love/' + encodedText);
  });
});
