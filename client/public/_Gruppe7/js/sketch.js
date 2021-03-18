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
const Constraint = Matter.Constraint;

let myPlayerIndex = Math.random().toString(36).substr(2, 9).toUpperCase();

let playerCount = 0;


let lastX = [0, 40, 80, 120];
let lastY = [0, 0, 0, 0];

let colors = ['purple', 'blue', 'yellow','green']

let engine;
let circle;

let blocks = []
let board;
let constraint1;
let constraint2;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    engine = Engine.create();

    circle = Bodies.circle(200, 50, 25, {
      restitution: 0.5
    });
    circle.plugin.wrap = {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    };

    World.add(engine.world, [circle]);

    //blocks.push(Matter.Bodies.rectangle(200, 300, 30, 30, { isStatic: true }))
    
    board = Bodies.rectangle(300, 200, 200, 30);
    //board.inertia = 200000;
    blocks.push(board);
    constraint1 = Constraint.create({
      pointA: { x: 150, y: 200 },
      bodyB: board,
      pointB: { x: -150, y: 0 },
      stiffness: 0.5,
    });
    constraint2 = Constraint.create({
      pointA: { x: 450, y: 200 },
      bodyB: board,
      pointB: { x: 150, y: 0 },
      stiffness: 0.5,
    });
    constraint2.pointA.y = 230;
    World.add(engine.world, [board, constraint1, constraint2]);
    //Matter.World.add(engine.world, blocks)
  

  Engine.run(engine);
}

function draw() {
    // put drawing code here
    background(255);

    noStroke();
  fill(0);
  drawVertices(circle.vertices);
       
    for (let i = 0; i < lastX.length; i++) {
       fill(colors[i]);
        rect(lastX[i], lastY[i], 70, 20,);
        
    }

    fill(255, 0, 0);
    blocks.forEach(bridge => drawBody(bridge))
}

function drawBody(body) {
  if (body.parts && body.parts.length > 1) {
    body.parts.filter((part, i) => i > 0).forEach((part, i) => {
      drawVertices(part.vertices)
    })
  } else {
    if (body.type == "composite") {
      body.bodies.forEach((body, i) => {
        drawVertices(body.vertices)
      })
    } else {
      drawVertices(body.vertices)
    }
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

    constraint1.pointA = {x: x-150, y:y-20};
    constraint2.pointA = {x: x+150, y:y+20};
});

socket.on('newUsersEvent', function (myID, myIndex, userList) {

    playerCount = userList.length;
    myUserIndex = myIndex;

    // updateStatus();
});