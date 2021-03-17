// Connecting to server. Don't touch this :-) 
let socket = io();
socket.on('connected', function (msg) {
    console.log(msg);
});

// Sending a userID will help to know if the message came from me or from others
// let myUserID = Math.random().toString(36).substr(2, 9).toUpperCase();

// Your script starts here ------------------------------------------------------

let myUserIndex = 2;
// let playerColors = ['#f80', '#08f', '#80f', '#0f8', '#8f0', '#f08']
let userCount = 0;
// let whosTurn = 0;



let lastX = [0, 40, 80, 120];
let lastY = [0, 0, 0, 0];

let colors = ['purple', 'blue', 'yellow','green']

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    //fill(255, 128, 0);
    
}

function draw() {
    // put drawing code here
    background(255);
       
    for (let i = 0; i < lastX.length; i++) {
       fill(colors[i]);
        rect(lastX[i], lastY[i], 40, 20,);
        
    }

}

function mouseMoved() {
    //console.log(mouseX, mouseY);

    // Sending an event 
    socket.emit('serverEvent', myUserIndex, mouseX, mouseY);
}

function updateStatus() {
    $('#player-status').html("There are " + playerCount + " players connected");

    $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
    $('body').css("background-color", playerColors[myUserIndex]+"4"); // background color like playing color but less opacity

    if (whosTurn == myUserIndex) {
        $('#turn-status').html("It's your turn.");
    } else {
        $('#turn-status').html("Waiting for player " + (whosTurn+1) + ".");        
    }
}

// Incoming events 
socket.on('serverEvent', function (index, x, y)  
{
    //console.log("Incoming event: ", user, x, y);
    
    // if (user == myUserID) { 
    //   fill(128, 100);
    // } 
    // else {
    //   fill(255, 128, 0, 100);
    // }

    lastX[index] = x;
    lastY[index] = y;
});

socket.on('newUsersEvent', function (myID, myIndex, userList) {
    console.log("New users event: ");
    console.log("That's me: " + myID);
    console.log("My index in the list: " + myIndex);
    console.log("That's the new users: ");
    console.log(userList);

    playerCount = userList.length;
    myUserIndex = myIndex;

    // updateStatus();
});

