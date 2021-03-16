// Connecting to server. Don't touch this :-) 
let socket = io();
socket.on('connected', function (msg) {
    console.log(msg);
});

// Sending a userID will help to know if the message came from me or from others



// Your script starts here ------------------------------------------------------

let myUserIndex = 1;

let lastX = [0, 0, 0, 0];
let lastY = [0, 0, 0, 0];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    fill(255, 128, 0);
    
}

function draw() {
    // put drawing code here
    background(255);
       
    for (let i = 0; i < lastX.length; i++) {
        rect(lastX[i], lastY[i], 40, 20);
    }

}

function mouseMoved() {
    //console.log(mouseX, mouseY);

    // Sending an event 
    socket.emit('serverEvent', myUserIndex, mouseX, mouseY);
}

// Incoming events 
socket.on('serverEvent', function (userIndex, x, y)  
{
    //console.log("Incoming event: ", user, x, y);
    
    // if (user == myUserID) { 
    //   fill(128, 100);
    // } 
    // else {
    //   fill(255, 128, 0, 100);
    // }

    lastX[0] = x;
    lastY[0] = y;
});

