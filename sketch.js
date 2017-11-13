var elem;
var w;
var h;
var neighavg;
var loadbar = new load();
var load = false;
var bararr;
var neighbar;
var state = "graph";
var buttarr = [];
buttarr.push(new button(0,"graph"));
buttarr.push(new button(1,"state"));
buttarr.push(new button(2,"pop"));
function setup() {
  var canvas = createCanvas(600,600);
  canvas.parent('sketch_holder');
  elem = (document.compatMode === "CSS1Compat") ?
    document.documentElement :
    document.body;
  w = elem.clientWidth;
  h = .6*windowHeight;
  resizeCanvas(w,h);
  background('#00A699');
  parseData();
  bararr = [];
  neighbar = new Map();
}

function draw() {
  background(255);
  for(var i = 0; i < 3;i++){
    buttarr[i].render(false);
  }
  if(neighavg == undefined){
    loadbar.render();
    loadbar.update();
  }
  else if(!load){
    load = true;
    var i = 0;
    for(var [key,value] of neighavg){
      bararr.push(new bar(i,key,value));
      i++;
    }
  }
  else if(state == "graph"){
    push();
    stroke("#fc642d");
    strokeWeight(4);
    line(.08*w,.9*h,(1-.08)*w,.9*h);
    line(.08*w,.9*h,.08*w,.2*h);
    var lh = .9*h-50;
    while(lh > .2*h){
      line(.08*w-5,lh,.08*w+5,lh);
      push();
      textSize(10);
      noStroke();
      var lmark = -1*(lh-.9*h);
      text("$"+lmark.toString(),.08*w-30,lh+3);
      pop();
      lh -= 50;
    }
    for(var i = 0;i < 37;i++){
      bararr[i].render();
    }
    info(geti());
    pop();
  }
}

function button(i,state){
  this.state = state;
  this.y = i*20;
  this.current = false;
  this.render= function(hover){
    push();
    if(this.current||hover){
      noStroke();
      fill("#fc642d");
      rect(0,this.y,70,20);
      noStroke();
      fill(255);
      text(state,20,this.y+10);
    }
    else{
      stroke("#fc642d");
      fill(255);
      rect(0,this.y,70,20);
      noStroke();
      fill("#fc642d");
      text(state,20,this.y+12);
    }
    pop();
  }
}

function geti(){
  var i = (mouseX-3-.08*w)/((1/37)*(1-.16)*w);
  return Math.floor(i);
}

function info(i){
  if(i >= 0 && i <= 36){
    if(mouseY >= bararr[i].y-bararr[i].height && mouseY <=bararr[i].y){
      if(mouseX <= w-140 && mouseY >= 100){
        push();
        stroke(0);
        fill(255);
        beginShape();
        vertex(mouseX,mouseY);
        vertex(mouseX,mouseY-100);
        vertex(mouseX + 140, mouseY -100);
        vertex(mouseX + 140, mouseY -20);
        vertex(mouseX + 20, mouseY -20);
        endShape(CLOSE);
        fill(0);
        strokeWeight(.5);
        text(bararr[i].neigh,mouseX + 10,mouseY-80);
        text("$"+bararr[i].avgp,mouseX + 10,mouseY-50);
        pop();
      }
      else if(mouseX <= w -140){
        push();
        stroke(0);
        fill(255);
        beginShape();
        vertex(mouseX,mouseY);
        vertex(mouseX,mouseY+100);
        vertex(mouseX + 140, mouseY +100);
        vertex(mouseX + 140, mouseY +20);
        vertex(mouseX + 20, mouseY +20);
        endShape(CLOSE);
        fill(0);
        strokeWeight(.5);
        text(bararr[i].neigh,mouseX + 10,mouseY+50);
        text("$"+bararr[i].avgp,mouseX + 10,mouseY + 80);
        pop();
      }
      else if(mouseY >= 100){
        push();
        stroke(0);
        fill(255);
        beginShape();
        vertex(mouseX,mouseY);
        vertex(mouseX,mouseY-100);
        vertex(mouseX - 140, mouseY -100);
        vertex(mouseX - 140, mouseY -20);
        vertex(mouseX - 20, mouseY -20);
        endShape(CLOSE);
        fill(0);
        strokeWeight(.5);
        text(bararr[i].neigh,mouseX + 10-140,mouseY-80);
        text("$"+bararr[i].avgp,mouseX + 10-140,mouseY-50);
        pop();
      }
      else{
        push();
        stroke(0);
        fill(255);
        beginShape();
        vertex(mouseX,mouseY);
        vertex(mouseX,mouseY+100);
        vertex(mouseX - 140, mouseY +100);
        vertex(mouseX - 140, mouseY +20);
        vertex(mouseX - 20, mouseY +20);
        endShape(CLOSE);
        fill(0);
        strokeWeight(.5);
        text(bararr[i].neigh,mouseX + 10-140,mouseY+50);
        text("$"+bararr[i].avgp,mouseX + 10-140,mouseY+80);
        pop();
      }
    }
  }
}

function bar(i,neigh,avgp){
  this.neigh = neigh;
  this.avgp = avgp;
  this.x = .08*w+(1/37)*(1-.16)*w*i+3;
  this.y = .9*h-2;
  this.height = this.avgp;
  this.width = (1/37)*(1-.16)*w-2;
  this.render = function(){
    this.x = .08*w+(1/37)*(1-.16)*w*i+3;
    this.y = .9*h-2;
    this.width = (1/37)*(1-.16)*w-2;
    push();
    noStroke();
    fill('#00A699');
    rect(this.x,this.y,this.width,-this.height);
    pop();
  }
}


function load(){
  this.pi = 3.14159265358979323;
  this.theta = 1.5*this.pi;
  this.update = function(){
    this.theta += .1;
  }
  this.render = function(){
    push();
    stroke("#fc642d");
    fill("#fc642d");
    arc(.5*w, .5*h, 80, 80, 1.5*PI, this.theta, PIE);
    strokeWeight(1);
    text("Loading",.5*w-20,.5*h+60);
    pop();
  }
}

function windowResized() {
  w = elem.clientWidth;
  h = .6*windowHeight;
  resizeCanvas(w,h);
}

function parseData(){
  Papa.parse("longandprice.csv", {
    download: true,
  	complete: function(results) {
      initializeDict(simplifyData(results.data));
  	}
  });
}

function initializeDict(parsedata){
  Papa.parse("neighbourhoods.csv", {
    download: true,
  	complete: function(results) {
      getData(parsedata,rectifyData(results.data));
  	}
  });
}

function simplifyData(data){
  var array = [];
  data.forEach(function(element) {
    if(element.length > 3){
      array.push(element);
        }
  });
  array.forEach(function(element){
    element[0] = element[0].trim();
  });
  return array
}

function rectifyData(data){
  var dict = new Map();
  data.forEach(function(element,index){
    if(index > 0 && element.length > 1){
      dict.set(element[1],0);
    }
  });
  return dict
}

function getData(data,dict) {
  var averages = new Map(dict);
  var accum_div = new Map(dict);
  var final = new Map(dict);
  data.forEach(function(element,index){
    averages.set(element[0],averages.get(element[0]) + parseInt(element[3].slice(1)));
    accum_div.set(element[0],accum_div.get(element[0])+1);
  });
  final.forEach(function(value,key){
    final.set(key,averages.get(key)/accum_div.get(key));
  });
  neighavg = new Map(final);
}
