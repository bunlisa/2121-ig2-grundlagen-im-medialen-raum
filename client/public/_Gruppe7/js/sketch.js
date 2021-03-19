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
<<<<<<< HEAD
let wände = []
=======
let boardConstraints = []
>>>>>>> f5f1c74ddc99bf08d8616076c02513cdcae5fe27

function circleUpdate() {
  // console.log("Ball Update");
  socket.emit('serverEvent', "ball");
}

// class Block {
//   constructor(attrs, options) {
//     this.x = attrs.x
//     this.y = attrs.y
//     this.w = attrs.w
//     this.h = attrs.h
//     this.color = attrs.color
//     this.body = Matter.Bodies.rectangle(this.x + this.w / 2, this.y + this.h / 2, this.w, this.h, options)
//     Matter.World.add(engine.world, [this.body])
//   }

//   show() {
//     fill(this.color)
//     drawBody(this.body)
//     // rect(this.x, this.y, this.w, this.h)
//   }
// }



function keyPressed() {
  if (key == " ") {
    socket.emit('serverEvent', { type: "reset" });
  }
}
// Event when connecting 
socket.on('connected', function (msg) {
  socket.emit('serverEvent', { type: "reset" });
});


function setup() {
<<<<<<< HEAD
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    engine = Engine.create();

    circle = Bodies.circle(200, 50, 25, {
      restitution: 0
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
wände.push(Bodies.rectangle(604, 52, 23, 107, {isStatic: true}));
wände.push(Bodies.rectangle(733, 232, 23, 463, {isStatic: true}));
wände.push(Bodies.rectangle(862, 177, 23, 356, {isStatic: true}));

// //untere Balken
wände.push(Bodies.rectangle(604, 490, 23, 592, {isStatic: true}));
wände.push(Bodies.rectangle(733, 678, 23, 215, {isStatic: true}));
wände.push(Bodies.rectangle(861, 619, 23, 332, {isStatic: true}));

// //3.Stufe
wände.push(Bodies.rectangle(1355, 116, 176, 52, {isStatic: true}));
wände.push(Bodies.rectangle(1400, 240, 75, 196, {isStatic: true}));
wände.push(Bodies.rectangle(1225, 769, 436, 52, {isStatic: true}));
wände.push(Bodies.rectangle(944, 341, 113, 17, {isStatic: true, angle: Math.PI * 0.06}));
wände.push(Bodies.rectangle(944, 654, 113, 17, {isStatic: true, angle: Math.PI * 0.06, restitution: 0.8}));
wände.push(Bodies.rectangle(1278, 521, 86, 17, {isStatic: true, angle: Math.PI * 0.06}));
wände.push(Bodies.rectangle(1167, 588, 113, 17, {isStatic: true, angle: Math.PI * -0.06}));
wände.push(Bodies.rectangle(1399, 540, 98, 17, {isStatic: true, angle: Math.PI * -0.15}));

wände.push(Bodies.rectangle(721, 830, 1443, 108, {isStatic: true}));

World.add(engine.world, wände)

//Board 1   
    // board1 = blocks.push(new Block({x: 300, y: 0, w: 200, h: 30, color: 'blue'}));
    board1 = Bodies.rectangle(300, 0, 200, 30, {color: 'blue'});
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
    board2 = Bodies.rectangle(300, 100, 200, 30, {color: 'green'});
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
=======
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
  blocks.push(Bodies.rectangle(19, 121, 94, 23, { isStatic: true, angle: Math.PI * 0.06 }));
  blocks.push(Bodies.rectangle(282, 146, 143, 292, { isStatic: true }));
  blocks.push(Bodies.rectangle(28, 516, 56, 322, { isStatic: true }));
  blocks.push(Bodies.rectangle(118, 730, 236, 117, { isStatic: true }));
  blocks.push(Bodies.rectangle(318, 446, 71, 310, { isStatic: true }));
  blocks.push(Bodies.rectangle(461, 756, 184, 60, { isStatic: true }));
  blocks.push(Bodies.rectangle(506, 700, 94, 52, { isStatic: true }));
  blocks.push(Bodies.rectangle(529, 652, 48, 45, { isStatic: true }));
  blocks.push(Bodies.rectangle(473, 52, 169, 50, { isStatic: true }));

  //Flappy Bird
  //obere Balken
  blocks.push(Bodies.rectangle(604, 52, 23, 107, { isStatic: true }));
  blocks.push(Bodies.rectangle(733, 232, 23, 463, { isStatic: true }));
  blocks.push(Bodies.rectangle(862, 177, 23, 356, { isStatic: true }));

  // //untere Balken
  blocks.push(Bodies.rectangle(604, 490, 23, 592, { isStatic: true }));
  blocks.push(Bodies.rectangle(733, 678, 23, 215, { isStatic: true }));
  blocks.push(Bodies.rectangle(861, 619, 23, 332, { isStatic: true }));
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
>>>>>>> f5f1c74ddc99bf08d8616076c02513cdcae5fe27
  World.add(engine.world, [board2, constraint3, constraint4]);




<<<<<<< HEAD
//Board 3
    board3 = Bodies.rectangle(300, 200, 200, 30, {color: 'red'});
    blocks.push(board3);
=======
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
>>>>>>> f5f1c74ddc99bf08d8616076c02513cdcae5fe27

  World.add(engine.world, [board3, constraint5, constraint6]);

  //Board 4
  board4 = Bodies.rectangle(300, 300, 200, 30);
  blocks.push(board4);

<<<<<<< HEAD
//Board 4
      board4 = Bodies.rectangle(300, 300, 200, 30, {color: 'orange'});
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
  
=======
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

>>>>>>> f5f1c74ddc99bf08d8616076c02513cdcae5fe27

  Engine.run(engine);
}

function draw() {
<<<<<<< HEAD
    background(255);
    noStroke();
    fill(0);
    
    drawVertices(circle.vertices);

    // fill(this.color);
    blocks.forEach(board => drawBody(board))

    fill(0, 200, 250);
    wände.forEach(board => drawBody(board))
=======
  background(255);
  noStroke();
  fill(0);

  drawVertices(circle.vertices);

  fill(180, 0, 255);
  blocks.forEach(board => drawBody(board))
>>>>>>> f5f1c74ddc99bf08d8616076c02513cdcae5fe27
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
  socket.emit('serverEvent', { type: "move", index: myPlayerIndex, x: mouseX, y: mouseY, });
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

  if (message.type == "move") {
    boardConstraints[message.index][0].pointA = { x: message.x - 100, y: message.y - 20 };
    boardConstraints[message.index][1].pointA = { x: message.x + 100, y: message.y + 20 };
  }

  if (message.type == "reset") {
    Body.setPosition(circle, { x: 10, y: 10 });
    Body.setPosition(board1, { x: 10, y: 200 });
    Body.setPosition(board2, { x: 10, y: 300 });
    Body.setPosition(board3, { x: 10, y: 400 });
    Body.setPosition(board4, { x: 10, y: 500 });
  }

});

socket.on('newUsersEvent', function (myID, myIndex, userList) {

  playerCount = userList.length;
  myPlayerIndex = myIndex;

});