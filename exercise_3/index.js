const input = document.querySelector(".input");
const btnSendMessage = document.querySelector (".btn-send");
const btnGeolocation = document.querySelector (".btn-geo");

const wsUrl = "wss://echo-ws-service.herokuapp.com";

const output = document.querySelector(".output");


let websocket;
websocket = new WebSocket(wsUrl);
  websocket.onopen = function(evt) {
    console.log("CONNECTED");
  };
  websocket.onclose = function(evt) {
    console.log("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    console.log(evt.data)
    writeTo(`Answer: ${evt.data}`, "start");
  };
  websocket.onerror = function(evt) {
    writeTo(
      '<span style="color: red;">ERROR:</span> ' + evt.data, "start"
    );
  };


function writeTo(message, position, side) {
  let myMessage = document.createElement("p");
  let divMessage = document.createElement("div");
  myMessage.style = `
    position: relative;
    text-align: ${position};
    margin: 8px;
    margin-${side}: 240px;
    word-wrap: break-word;
    width: 220px;
    height: min-content;
    background-color:rgba(51, 130, 248, 0.2);
    border: 1px solid rgba(51, 130, 248, 0.2);
    border-radius: 4px;
    font-size: 18px;
  `;
  myMessage.innerHTML += message;
  divMessage.appendChild(myMessage);
  output.appendChild(divMessage);
}

btnSendMessage.addEventListener('click', () => {
  const message = input.value;
  writeTo(`You:` + message, "end", "left");
  websocket.send(message)
  input.value = " ";
 
});

// Navigation

function error () {
    let errorLocation = "Error your location"
    writeTo(errorLocation, "end");
};

function success (position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    let link = `<a href="https://www.openstreetmap.org/#map=17/${latitude}/${longitude}" target="_blank">Your Location</a>`
    writeTo(link, "end", "left")
}

btnGeolocation.addEventListener ("click", ()=> {

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
        }
      else {
        error();
      }
});