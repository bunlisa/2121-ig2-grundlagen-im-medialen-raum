// Connecting to server. Don't touch this :-) 
let socket = io();
// socket.on('connected', function (msg) {
//     console.log(msg);
// });

// Sending a userID will help to know if the message came from me or from others
// let myUserID = Math.random().toString(36).substr(2, 9).toUpperCase();

// Your script starts here ------------------------------------------------------

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
let boden = []
let ziel = []

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
    // Ball
    circle = Bodies.circle(200, 50, 25, {
      restitution: 0,
      density: 7,
      friction: -0.07,
      label: 'ball'
    });
    
    World.add(engine.world, [circle]);

// 1.Stufe
wände.push(Bodies.rectangle(19, 121, 94, 23, {isStatic: true, angle: Math.PI * 0.06, chamfer: {radius: [0,10,10,0]}}));
wände.push(Bodies.rectangle(282, 146, 143, 292, {isStatic: true, chamfer: {radius: [0,0,0,10]}}));
wände.push(Bodies.rectangle(28, 516.5, 56, 322, {isStatic: true, chamfer: {radius: [0,10,0,0]}}));
wände.push(Bodies.rectangle(32, 730, 150, 106, {isStatic: true, chamfer: {radius: [0,10,0,0]}}));
wände.push(Bodies.rectangle(318, 381, 71, 180, {isStatic: true, chamfer: {radius: [0,0,10,10]}}));

//Treppe
wände.push(Bodies.rectangle(340, 747, 144, 60, {isStatic: false, chamfer: {radius: [10,10,10,10]}}));
wände.push(Bodies.rectangle(364, 700, 96, 52, {isStatic: false, chamfer: {radius: [10,10,10,10]}}));
wände.push(Bodies.rectangle(388, 652, 48, 45, {isStatic: false, chamfer: {radius: [10,10,10,10]}}));

//obere Balken
mauern.push(Bodies.rectangle(545, 52, 23, 107, {isStatic: true, chamfer: {radius: [0,0,10,10]}}));
mauern.push(Bodies.rectangle(733, 229, 23, 463, {isStatic: true, chamfer: {radius: [0,0,10,10]}}));
mauern.push(Bodies.rectangle(930, 175, 23, 356, {isStatic: true, chamfer: {radius: [0,0,10,10]}}));

// //untere Balken
mauern.push(Bodies.rectangle(545, 490.75, 23, 574, {isStatic: true, chamfer: {radius: [10,10,0,0]}}));
mauern.push(Bodies.rectangle(733, 678.25, 23, 198, {isStatic: true, chamfer: {radius: [10,10,0,0]}}));
mauern.push(Bodies.rectangle(930, 619.5, 23, 316, {isStatic: true, chamfer: {radius: [10,10,0,0]}}));

// //3.Stufe
walls.push(Bodies.rectangle(1355, 116, 176, 52, {isStatic: true, chamfer: {radius: [10,0,0,10]}}));
walls.push(Bodies.rectangle(1399.6, 239, 86, 196, {isStatic: true, chamfer: {radius: [0,0,0,10]}}));
walls.push(Bodies.rectangle(1044, 341, 113, 17, {isStatic: true, angle: Math.PI * 0.06, chamfer: {radius: [6,5,6,5]}}));
walls.push(Bodies.rectangle(1278, 690, 86, 17, {isStatic: true, angle: Math.PI * 0.06, chamfer: {radius: [5,5,5,5]}}));
walls.push(Bodies.rectangle(1167, 588, 113, 17, {isStatic: true, angle: Math.PI * -0.06, chamfer: {radius: [5,5,5,5]}}));
walls.push(Bodies.rectangle(1280, 230, 113, 17, {isStatic: true, angle: Math.PI * -0.20, chamfer: {radius: [5,5,5,5]}}));
walls.push(Bodies.rectangle(1399, 540, 98, 17, {isStatic: true, angle: Math.PI * -0.15, chamfer: {radius: [5,5,5,5]}}));

// Rahmen
boden.push(Bodies.rectangle(721, 830, 1443, 108, { isStatic: true, label: 'boden'}));
boden.push(Bodies.rectangle(721, -54, 1443, 108, { isStatic: true}));
boden.push(Bodies.rectangle(1495, 442, 108, 884, { isStatic: true}));
boden.push(Bodies.rectangle(-54, 455, 108, 910, { isStatic: true}));

// Ziel
ziel.push(Bodies.rectangle(1396, 56, 55, 55, { isStatic: true, label: 'ziel', chamfer: {radius: 10}}));

World.add(engine.world, wände)
World.add(engine.world, mauern)
World.add(engine.world, walls)
World.add(engine.world, boden)
World.add(engine.world, ziel)


//Board 1   
    board1 = Bodies.rectangle(50, 180, 100, 30, {chamfer: {radius: 13}, density: 7});
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
    board2 = Bodies.rectangle(50, 230, 100, 30, {chamfer: {radius: 13}, density:7});
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
    board3 = Bodies.rectangle(50, 280, 100, 30, {chamfer: {radius: 13}, density: 7});
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
      board4 = Bodies.rectangle(50, 330, 100, 30, {chamfer: {radius: 13, density: 7}});
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

  Matter.Events.on(engine, 'collisionStart', function (event) {
    const pairs = event.pairs[0];
    const bodyA = pairs.bodyA;
    const bodyB = pairs.bodyB;

  //Boden
  if (bodyA.label === "ball" && bodyB.label === "boden") {
    // Matter.World.remove(engine.world, boden[0]),
    Matter.Body.setPosition(circle, { x: 10, y: 10 })
    }
 
  //Ziel
  if (bodyA.label === "ball" && bodyB.label === "ziel") {
    // Matter.World.remove(engine.world, boden[0]),
    // Matter.Body.setPosition(circle, { x: 10, y: 10 })
    alert ("You Won")
    }
  });
  
  Engine.run(engine);
}

function draw() {
    clear()
    noStroke();
    
    fill(255);
    drawVertices(circle.vertices);

    fill('#EDAD36');    
    blocks1.forEach(board => drawBody(board))
    fill('#629DD2');    
    blocks2.forEach(board => drawBody(board))
    fill('#BA4F0B');    
    blocks3.forEach(board => drawBody(board))
    fill('#12584D');    
    blocks4.forEach(board => drawBody(board))

    fill('#668985');
    wände.forEach(board => drawBody(board))
    fill('#7280A6');
    mauern.forEach(board => drawBody(board))
    fill('#998191');
    walls.forEach(board => drawBody(board))
    fill(180);
    boden.forEach(board => drawBody(board))
    fill(0);
    ziel.forEach(board => drawBody(board))
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