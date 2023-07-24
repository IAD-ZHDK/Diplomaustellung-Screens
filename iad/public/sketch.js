const students = {
 //AA Aurelian
  aurelian: {
    vidR: "AA_R.mp4",
    vidL: "AA_L.mp4",
    vidM: "AA_M.mov",
  },
  //Bamna
  bamna: {
    vidR: "BD_R.mp4",
    vidL: "BD_L.mp4",
    vidM: "BD_M.mp4",
  },
  //Duy
  duy: {
    vidR: "DB_R.mp4",
    vidL: "DB_L.mp4",
    vidM: "DB_M.mp4",
  },
  //Dzhuulia & Kaithlyn
  dkkh: {
    vidR: "DK-KH_R.mp4",
    vidL: "DK-KH_L.mp4",
    vidM: "DK-KH_M.mp4",
  },
   //Daniel & Svenja
  dtsj: {
    vidR: "DT-SSJ_R.mp4",
    vidL: "DT-SSJ_L.mp4",
    vidM: "DT-SSJ_M.mp4",
  },
   //Elenora & Johannes
  ebjr: {
    vidR: "EB-JR_R.mp4",
    vidL: "EB-JR_L.mp4",
    vidM: "EB-JR_M.mp4",
  },
  //Elena & Rejane
  ecrs: {
    vidR: "EDC-RS_R.mp4",
    vidL: "EDC-RS_L.mp4",
    vidM: "EDC-RS_M.mp4",
  },
  //Guan
  guan: {
    vidR: "GA_R.mp4",
    vidL: "GA_L.mp4",
    vidM: "GA_M.mp4",
  },
  //Janina
  janina: {
    vidR: "JT_R.mp4",
    vidL: "JT_L.mp4",
    vidM: "JT_M.mp4",
  },
  //Ludovica
  ludovica: {
    vidR: "LGdA_R.mp4",
    vidL: "LGdA_L.mp4",
    vidM: "LGdA_M.mp4",
  },
  //Markus
  markus: {
    vidR: "MB_R.mp4",
    vidL: "MB_L.mp4",
    vidM: "MB_M.mp4",
  },
  //Miguel
  miguel: {
    vidR: "MS_R.mp4",
    vidL: "MS_L.mp4",
    vidM: "MS_M.mp4",
  },
  //Nicola & Bin
  nbbm: {
    vidR: "NB-BM_R.mp4",
    vidL: "NB-BM_L.mp4",
    vidM: "NB-BM_M.mp4",
  },   
  //Sandro & Nemo
  sbnb: {
    vidR: "SB-NB_R.mp4",
    vidL: "SB-NB_L.mp4",
    vidM: "SB-NB_M.mp4",
  },  
  //Shafira
  shafira: {
    vidR: "SN_R.mp4",
    vidL: "SN_L.mp4",
    vidM: "SN_M.mp4",
  },  
  //Silvan & Nadia
  swnw: {
    vidR: "SW-NW_R.mp4",
    vidL: "SW-NW_L.mp4",
    vidM: "SW-NW_M.mp4",
  },  
  //Tim
  tim: {
    vidR: "TF_R.mp4",
    vidL: "TF_L.mp4",
    vidM: "TF_M.mp4",
  },          
  //Thore & Janosch
 trjt: {
    vidR: "TR-JT_R.mp4",
    vidL: "TR-JT_L.mp4",
    vidM: "TR-JT_M.mp4",
  }              
}


const standby = {
  vidR: "STANDBY_R.mp4",
  vidL: "STANDBY_L.mp4",
  vidM: "STANDBY_M.mp4",
}

const circles = [];
var pulseSpeed = 0.3;
let circleSize = 50;
var sizeChange = 2;
var pulsate = false;
let iPad;
var socket;
var scale;
var time;
var wait = 10000;
let executed = false;

function preload() {
  iPad = loadImage("assets/Plan_nolocations.svg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // markings = createGraphics(indowWidth,windowHeight, WEBGL);
  background(255);
  scale = 0.5;
  noStroke();
  imageMode(CORNER);
  //socket = io.connect('http://127.0.0.1:8080');
  socket = io.connect('http://10.128.130.248:8080');

  //GALERIE 1

  //Aurelian
  circles.push(new Circle(290, 760, students.aurelian.vidR, students.aurelian.vidL, students.aurelian.vidM));

  //Janina
  circles.push(new Circle(220, 800, students.janina.vidR, students.janina.vidL, students.janina.vidM));

  //Miguel
  circles.push(new Circle(290, 840, students.miguel.vidR, students.miguel.vidL, students.miguel.vidM));

  //Daniel & Svenja
  circles.push(new Circle(380, 810, students.dtsj.vidR, students.dtsj.vidL, students.dtsj.vidM));

  //Elena und Johannes
  circles.push(new Circle(440, 850, students.ebjr.vidR, students.ebjr.vidL, students.ebjr.vidM));

  //Guan
  circles.push(new Circle(590, 935, students.guan.vidR, students.guan.vidL, students.guan.vidM));

  //Dzhuliia
  circles.push(new Circle(700, 1000, students.dkkh.vidR, students.dkkh.vidL, students.dkkh.vidM));

  //Duy
  circles.push(new Circle(630, 1040, students.duy.vidR, students.duy.vidL, students.duy.vidM));

  //Tim
  circles.push(new Circle(550, 980, students.tim.vidR, students.tim.vidL, students.tim.vidM));

  //Nadia & Slivan
  circles.push(new Circle(430, 950, students.swnw.vidR, students.swnw.vidL, students.swnw.vidM));

  //Ludovica
  circles.push(new Circle(260, 950, students.ludovica.vidR, students.ludovica.vidL, students.ludovica.vidM));

  //Bamna
  circles.push(new Circle(280, 1000, students.bamna.vidR, students.bamna.vidL, students.bamna.vidM));


  //GALERIE 2

  //Elena & Rejane
  circles.push(new Circle(300, 450, students.ecrs.vidR, students.ecrs.vidL, students.ecrs.vidM));

  //Thore & Janosch
  circles.push(new Circle(490, 560, students.trjt.vidR, students.trjt.vidL, students.trjt.vidM));

  //Bin & Nicola
  circles.push(new Circle(355, 640, students.nbbm.vidR, students.nbbm.vidL, students.nbbm.vidM));

  //Shafira
  circles.push(new Circle(210, 510, students.shafira.vidR, students.shafira.vidL, students.shafira.vidM));

  //Nemo & Sandro
  circles.push(new Circle(170, 450, students.sbnb.vidR, students.sbnb.vidL, students.sbnb.vidM));


  //LICHTHOF

  //Markus
  circles.push(new Circle(210, 190, students.markus.vidR, students.markus.vidL, students.markus.vidM));

  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  image(iPad, 0, 0, windowWidth, iPad.height * windowWidth / iPad.width);
 
  for (const c of circles) {
    c.draw();
    if (c.pulsate) {
      c.pulse();
    }
  }

}
//change to touchStarted() for iPad

function touchStarted() {
  console.log("sendData")
  for (const c of circles) {
    c.pulsate = false;
  }

  const overlappingCircle = getOverlappingCircle();
  if (overlappingCircle) {
    overlappingCircle.pulsate = true;
    sendClickData(overlappingCircle.vidR, overlappingCircle.vidL, overlappingCircle.vidM);
    console.log(overlappingCircle.vidR, overlappingCircle.vidL, overlappingCircle.vidM)
    executed = false;

    if (!executed){
      setTimeout(()=> {
        overlappingCircle.pulsate = false; 
        sendClickData(standby.vidR, standby.vidL, standby.vidM);
        executed = true;
      }, 90000)
      }
  }
}

function sendClickData(vidR, vidL, vidM,) {
  var data = {
    sVideoR: vidR,
    sVideoL: vidL,
    sVideoM: vidM
  };

  socket.emit('user', data);
}

function getOverlappingCircle() {
  for (const c of circles) {
    if (dist(c.x, c.y, mouseX, mouseY) < circleSize / 2 + c.size / 2 + 2) {
      return c;
    }
  }
}

class Circle {
  constructor(x, y, vidR, vidL, vidM) {
    this.x = x;
    this.y = y;
    this.size = 33;
    this.color = color(255, 0, 0);
    this.pulsate = false;
    this.vidR = vidR;
    this.vidL = vidL;
    this.vidM = vidM;
  }

  draw() {
    fill(this.color);
    if (this.pulsate) {
      noStroke()
      fill(this.color)
      ellipse(this.x, this.y, this.size + sizeChange, this.size * 0.8 + sizeChange);
    } else {
      noFill()
      stroke(this.color)
      ellipse(this.x, this.y, this.size, this.size * 0.8);
    }
  }

  pulse() {
    sizeChange = sizeChange + pulseSpeed;
    if (sizeChange > 3 || sizeChange < -3) {
      pulseSpeed = pulseSpeed * -1;
    }
  }
}