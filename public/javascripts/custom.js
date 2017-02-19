/*
 * VARIABLES, BABY!
 */
var socket = io.connect();                     // Our dearest socket
var TIMEOUT = 4                                // How long to wait for a server response before giving up
var THINKING = false;                          // Is ReBeatal processing a request right now?
var TEXTBOX = document.getElementById('ask');  // The question textbox


// Enter key press fuction
$(document).keypress(function (event) {
    if ((event.which == 13 || event.keyCode == 13) && !THINKING) {

        // Do this suff when they hit enter
        var input = TEXTBOX.value;
        console.log("Asking server: " + input);
        THINKING = true;

        TEXTBOX.value = "I'm thinking..."
        TEXTBOX.disabled = true;
        queryServer(input);

        // Stop the event from "bubbling up"
        return false;
    }
    return true;
});

function queryServer(q) {

  // Ask the server
  socket.emit('query', q);
  var didRespond = false;

  // On repsponse:
  socket.on('message', function(msg) {

      didRespond = true;

      console.log("Got response from server: " + msg.stuff);

      TEXTBOX.disabled = false;
      TEXTBOX.value = q;
      TEXTBOX.focus();

      if(THINKING)
        alert(msg.stuff);

      // Keep this variable assignment at the bootom
      THINKING = false;
  });

  // No response in var=TIMEOUT amount of seconds
  setTimeout(function () {
    if (!didRespond) {

      TEXTBOX.disabled = false;
      TEXTBOX.value = "";
      TEXTBOX.focus();

      alert("Hey buddy, how about you ask me a question that actually makes sense.");

      // Keep this variable assignment at the bootom
      THINKING = false;
    }
  }, TIMEOUT*1000);
}
