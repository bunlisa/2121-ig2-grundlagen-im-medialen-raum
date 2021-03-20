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

let blocks4 = []
let blocks1 = []
let blocks2 = []
let blocks3 = []
let wände = []
let mauern = []
let walls = []

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
      restitution: 0.1
    });
    circle.plugin.wrap = {
      min: { x: 0, y: 0 },
      max: { x: width, y: height }
    };

    World.add(engine.world, [circle]);
// 1.Stufe
wände.push(Bodies.rectangle(19, 121, 94, 23, {isStatic: true, angle: Math.PI * 0.06}));
wände.push(Bodies.rectangle(282, 146, 143, 292, {isStatic: true}));
wände.push(Bodies.rectangle(28, 516, 56, 322, {isStatic: true}));
wände.push(Bodies.rectangle(118, 730, 236, 117, {isStatic: true}));
wände.push(Bodies.rectangle(318, 446, 71, 310, {isStatic: true}));
wände.push(Bodies.rectangle(461, 756, 184, 60, {isStatic: true}));
wände.push(Bodies.rectangle(506, 700, 94, 52, {isStatic: true}));
wände.push(Bodies.rectangle(529, 652, 48, 45, {isStatic: true}));
wände.push(Bodies.rectangle(473, 52, 169, 50, {isStatic: true}));

//obere Balken
mauern.push(Bodies.rectangle(604, 52, 23, 107, {isStatic: true}));
mauern.push(Bodies.rectangle(733, 232, 23, 463, {isStatic: true}));
mauern.push(Bodies.rectangle(862, 177, 23, 356, {isStatic: true}));

// //untere Balken
mauern.push(Bodies.rectangle(604, 490, 23, 592, {isStatic: true}));
mauern.push(Bodies.rectangle(733, 678, 23, 215, {isStatic: true}));
mauern.push(Bodies.rectangle(861, 619, 23, 332, {isStatic: true}));

// //3.Stufe
walls.push(Bodies.rectangle(1355, 116, 176, 52, {isStatic: true}));
walls.push(Bodies.rectangle(1400, 240, 75, 196, {isStatic: true}));
walls.push(Bodies.rectangle(1225, 769, 436, 52, {isStatic: true}));
walls.push(Bodies.rectangle(944, 341, 113, 17, {isStatic: true, angle: Math.PI * 0.06}));
walls.push(Bodies.rectangle(944, 654, 113, 17, {isStatic: true, angle: Math.PI * 0.06, restitution: 0.8}));
walls.push(Bodies.rectangle(1278, 521, 86, 17, {isStatic: true, angle: Math.PI * 0.06}));
walls.push(Bodies.rectangle(1167, 588, 113, 17, {isStatic: true, angle: Math.PI * -0.06}));
walls.push(Bodies.rectangle(1399, 540, 98, 17, {isStatic: true, angle: Math.PI * -0.15}));

wände.push(Bodies.rectangle(721, 830, 1443, 108, {isStatic: true}));

World.add(engine.world, wände)
World.add(engine.world, mauern)
World.add(engine.world, walls)

//Board 1   
    board1 = Bodies.rectangle(50, 180, 100, 30, {color: 'blue'});
    blocks1.push(board1);

    constraint1 = Constraint.create({
      pointA: { x: 25, y: 180 },
      bodyB: board1,
      pointB: { x: -25, y: 0 },
      length: 0,
      stiffness: 0.5,
    });
    constraint2 = Constraint.create({
      pointA: { x: 75, y: 180 },
      bodyB: board1,
      pointB: { x: 25, y: 0 },
      length: 0,
      stiffness: 0.5,
    });
    boardConstraints.push([constraint1, constraint2]);
  World.add(engine.world, [board1, constraint1, constraint2]);

//Board 2
    board2 = Bodies.rectangle(50, 230, 100, 30, {color: 'green'});
    blocks2.push(board2);

    constraint3 = Constraint.create({
      pointA: { x: 25, y: 230 },
      bodyB: board2,
      pointB: { x: -25, y: 0 },
      stiffness: 0.5,
    });
    constraint4 = Constraint.create({
      pointA: { x: 75, y: 230 },
      bodyB: board2,
      pointB: { x: 25, y: 0 },
      stiffness: 0.5,
    });
   
    boardConstraints.push([constraint3, constraint4]);
  World.add(engine.world, [board2, constraint3, constraint4]);




//Board 3
    board3 = Bodies.rectangle(50, 280, 100, 30, {color: 'red'});
    blocks3.push(board3);

      constraint5 = Constraint.create({
        pointA: { x: 25, y: 280 },
        bodyB: board3,
        pointB: { x: -25, y: 0 },
        stiffness: 0.5,
      });
      constraint6 = Constraint.create({
        pointA: { x: 75, y: 280 },
        bodyB: board3,
        pointB: { x: 25, y: 0 },
        stiffness: 0.5,
      });
      boardConstraints.push([constraint5, constraint6]);

    World.add(engine.world, [board3, constraint5, constraint6]);

//Board 4
      board4 = Bodies.rectangle(50, 330, 100, 30, {color: 'orange'});
      blocks4.push(board4);

       constraint7 = Constraint.create({
        pointA: { x: 25, y: 330 },
        bodyB: board4,
        pointB: { x: -25, y: 0 },
        stiffness: 0.5,
      });
      constraint8 = Constraint.create({
        pointA: { x: 75, y: 330 },
        bodyB: board4,
        pointB: { x: 25, y: 0 },
        stiffness: 0.5,
      });
      boardConstraints.push([constraint7, constraint8]);
      World.add(engine.world, [board4, constraint7, constraint8]);
  

  Engine.run(engine);
}

function draw() {
    background(255);
    noStroke();
    fill(0);
    
    drawVertices(circle.vertices);

    fill(255, 200, 250);    
    blocks1.forEach(board => drawBody(board))
    fill(200, 0, 250);    
    blocks2.forEach(board => drawBody(board))
    fill(255, 200, 0);    
    blocks3.forEach(board => drawBody(board))
    fill(255, 0, 0);    
    blocks4.forEach(board => drawBody(board))

    fill(0, 200, 250);
    wände.forEach(board => drawBody(board))
    fill(0, 0, 250);
    mauern.forEach(board => drawBody(board))
    fill(0, 200, 0);
    walls.forEach(board => drawBody(board))
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