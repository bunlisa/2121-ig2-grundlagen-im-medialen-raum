// Connecting to server. Don't touch this :-) 
let socket = io();
// socket.on('connected', function (msg) {
//     console.log(msg);
// });

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
let engine;
let circle;

let blocks = []
let board = []

let boardConstraints =[]

function keyPressed() {
  if (key == " ") {
      socket.emit('serverEvent', {type:"reset"});
  }
}
// Event when connecting 
socket.on('connected', function (msg) {
    socket.emit('serverEvent', {type:"reset"});
});


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
    background(255);
    noStroke();
    fill(0);
    
    drawVertices(circle.vertices);

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
    socket.emit('serverEvent', {type: "move", index: myPlayerIndex, x: mouseX, y: mouseY} );
} 

function drawVertices(vertices) {
    beginShape();
    for (let i = 0; i < vertices.length; i++) {
      vertex(vertices[i].x, vertices[i].y);
    }
    endShape(CLOSE);
}


// Incoming events 
socket.on('serverEvent', function (message) {
  // console.log("Incoming event: ", user, x, y);

  if(message.type == "move") {
    boardConstraints[message.index][0].pointA = {x: message.x-100, y: message.y-20};
    boardConstraints[message.index][1].pointA = {x: message.x+100, y: message.y+20};
  }

  if (message.type == "reset") {
    Body.setPosition(circle, {x: 10, y: 10});
    Body.setPosition(board1, {x: 10, y: 200});
    Body.setPosition(board2, {x: 10, y: 300});
    Body.setPosition(board3, {x: 10, y: 400});
    Body.setPosition(board4, {x: 10, y: 500});
  }

});

socket.on('newUsersEvent', function (myID, myIndex, userList) {

    playerCount = userList.length;
    myPlayerIndex = myIndex;

});