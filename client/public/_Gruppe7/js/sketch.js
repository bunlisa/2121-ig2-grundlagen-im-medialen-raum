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


// let lastX = [0, 40, 80, 120];
// let lastY = [0, 0, 0, 0];

let colors = ['purple', 'blue', 'yellow','green']

let engine;
let circle;

let blocks = []
let board = []

let boardConstraints =[]

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
// 1.Stufe
blocks.push(Bodies.rectangle(19, 121, 94, 23, {isStatic: true, angle: Math.PI * 0.06}));
blocks.push(Bodies.rectangle(282, 146, 143, 292, {isStatic: true}));
blocks.push(Bodies.rectangle(28, 516, 56, 322, {isStatic: true}));
blocks.push(Bodies.rectangle(118, 730, 236, 117, {isStatic: true}));
blocks.push(Bodies.rectangle(318, 446, 71, 310, {isStatic: true}));
blocks.push(Bodies.rectangle(461, 756, 184, 60, {isStatic: true}));
blocks.push(Bodies.rectangle(506, 700, 94, 52, {isStatic: true}));
blocks.push(Bodies.rectangle(529, 652, 48, 45, {isStatic: true}));
blocks.push(Bodies.rectangle(473, 52, 169, 50, {isStatic: true}));

// // 2.Stufe
// blocks.push(Bodies.rectangle(90, 130, 165, 40, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(80, 630, 280, 170, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));

// //3.Stufe
// blocks.push(Bodies.rectangle(90, 130, 165, 40, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(80, 630, 280, 170, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));
// blocks.push(Bodies.rectangle(360, 250, 264, 500, {isStatic: true}));

// blocks.push(Bodies.rectangle(0, 1408, 2560, 192, {isStatic: true}));

World.add(engine.world, blocks)

    // blocks.push(Matter.Bodies.rectangle(800, 300, 30, 30, { isStatic: true }))

//Board 1   
    board1 = Bodies.rectangle(300, 0, 200, 30);
    blocks.push(board1);

    constraint1 = Constraint.create({
      pointA: { x: 150, y: 0 },
      bodyB: board1,
      pointB: { x: -150, y: 0 },
      length: 0,
      stiffness: 0.5,
    });
    constraint2 = Constraint.create({
      pointA: { x: 450, y: 0 },
      bodyB: board1,
      pointB: { x: 150, y: 0 },
      length: 0,
      stiffness: 0.5,
    });
    boardConstraints.push([constraint1, constraint2]);
  World.add(engine.world, [board1, constraint1, constraint2]);

//Board 2
    board2 = Bodies.rectangle(300, 100, 200, 30);
    blocks.push(board2);

    constraint3 = Constraint.create({
      pointA: { x: 150, y: 100 },
      bodyB: board2,
      pointB: { x: -150, y: 0 },
      stiffness: 0.5,
    });
    constraint4 = Constraint.create({
      pointA: { x: 450, y: 100 },
      bodyB: board2,
      pointB: { x: 150, y: 0 },
      stiffness: 0.5,
    });
   
    boardConstraints.push([constraint3, constraint4]);
  World.add(engine.world, [board2, constraint3, constraint4]);




//Board 3
    board3 = Bodies.rectangle(300, 200, 200, 30);
    blocks.push(board3);

      constraint5 = Constraint.create({
        pointA: { x: 150, y: 200 },
        bodyB: board3,
        pointB: { x: -150, y: 0 },
        stiffness: 0.5,
      });
      constraint6 = Constraint.create({
        pointA: { x: 450, y: 200 },
        bodyB: board3,
        pointB: { x: 150, y: 0 },
        stiffness: 0.5,
      });
      boardConstraints.push([constraint5, constraint6]);

    World.add(engine.world, [board3, constraint5, constraint6]);

//Board 4
      board4 = Bodies.rectangle(300, 300, 200, 30);
      blocks.push(board4);

       constraint7 = Constraint.create({
        pointA: { x: 150, y: 300 },
        bodyB: board4,
        pointB: { x: -150, y: 0 },
        stiffness: 0.5,
      });
      constraint8 = Constraint.create({
        pointA: { x: 450, y: 300 },
        bodyB: board4,
        pointB: { x: 150, y: 0 },
        stiffness: 0.5,
      });
      boardConstraints.push([constraint7, constraint8]);
      World.add(engine.world, [board4, constraint7, constraint8]);
    Matter.World.add(engine.world, board)
  

  Engine.run(engine);
}

function draw() {
    // put drawing code here
    background(255);

    noStroke();
  fill(0);
  drawVertices(circle.vertices);
       
    // for (let i = 0; i < lastX.length; i++) {
    //    fill(colors[i]);
    //     rect(lastX[i], lastY[i], 70, 20,);
        
    // }

    fill(180, 0, 255);
    blocks.forEach(board => drawBody(board))
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
    
    socket.emit('serverEvent', myPlayerIndex, mouseX, mouseY);

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

  boardConstraints[index][0].pointA = {x: x-100, y:y-20};
  boardConstraints[index][1].pointA = {x: x+100, y:y+20};

});

socket.on('newUsersEvent', function (myID, myIndex, userList) {

    playerCount = userList.length;
    myPlayerIndex = myIndex;

});