// Connecting to server. Don't touch this :-) 
let socket = io();
socket.on('connected', function (msg) {
    console.log(msg);
});

// Sending a userID will help to know if the message came from me or from others
// let myUserID = Math.random().toString(36).substr(2, 9).toUpperCase();

// Your script starts here ------------------------------------------------------

Matter.use('matter-wrap');
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;

let myPlayerIndex = Math.random().toString(36).substr(2, 9).toUpperCase();

let playerCount = 0;


let lastX = [0, 40, 80, 120];
let lastY = [0, 0, 0, 0];

let colors = ['purple', 'blue', 'yellow','green']

let engine;
let circle;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    engine = Engine.create();

    circle = Bodies.circle(width/2, 50, 40, {
      restitution: 0
    });
    circle.plugin.wrap = {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    };

    World.add(engine.world, [circle]);

  Engine.run(engine);
}

function draw() {
    // put drawing code here
    background(255);

    noStroke();
  fill(255);
  drawVertices(circle.vertices);
       
    for (let i = 0; i < lastX.length; i++) {
       fill(colors[i]);
        rect(lastX[i], lastY[i], 70, 20,);
        
    }

}

function mouseMoved() {
    //console.log(mouseX, mouseY);

    // Sending an event 
    socket.emit('serverEvent', myUserIndex, mouseX, mouseY);

    // updateStatus();

}

function drawVertices(vertices) {
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
  }

//function updateStatus() {
//   $('#player-status').html("There are " + playerCount + " players connected");
//    $('#playcolor').css("background-color", playerColors[myPlayerIndex]);
//    $('body').css("background-color", playerColors[myUserIndex]+"4"); // background color like playing color but less opacity

//}

// Incoming events 
socket.on('serverEvent', function (index, x, y)  
{

// ein Spieler, ein Balken
    lastX[index] = x;
    lastY[index] = y;
});

socket.on('newUsersEvent', function (myID, myIndex, userList) {

    playerCount = userList.length;
    myUserIndex = myIndex;

    // updateStatus();
});

