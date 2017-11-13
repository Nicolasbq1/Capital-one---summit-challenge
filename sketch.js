var elem;
var w;
var h;
var neighavg;
var loadbar = new load();
var load = false;
var bararr;
var neighbar;
var state = "POP";
var buttarr = [];
var datarr;
var upperlong;
var lowerlong;
var upperlati;
var lowerlati;
var poparr;
var pobarr = [];
buttarr.push(new button(0,"GRAPH"));
buttarr.push(new button(1,"MAP"));
buttarr.push(new button(2,"POP"));
function setup() {
  var canvas = createCanvas(600,600);
  canvas.parent('sketch_holder');
  elem = (document.compatMode === "CSS1Compat") ?
    document.documentElement :
    document.body;
  w = elem.clientWidth;
  h = .7*windowHeight;
  resizeCanvas(w,h);
  background('#00A699');
  bararr = [];
  neighbar = new Map();
  parseData();
}

function draw() {
  background(255);
  for(var i = 0; i < 3;i++){
    buttarr[i].update();
    buttarr[i].render(butti() == i);
  }
  if(neighavg == undefined || datarr == undefined || poparr == undefined){
    loadbar.render();
    loadbar.update();
  }
  else if(!load){
    calcLimit(datarr);
    load = true;
    var i = 0;
    for(var [key,value] of neighavg){
      bararr.push(new bar(i,key,value));
      i++;
    }
    poparr.forEach(function(element,index){
      var height = map(parseFloat(element[1]),85,100,0,.7*h);
      pobarr.push(new bar(index,element[0],height));
    });
    stroke(0);
  }
  else if(state == "GRAPH"){
    push();
    stroke("#fc642d");
    strokeWeight(4);
    push();
    noStroke();
    fill("#fc642d");
    textAlign(CENTER);
    textSize(32);
    text("Average price per night by Neighborhood",.5*w,40);
    pop();
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
  else if(state == "MAP") {
    var scale = (upperlong-lowerlong)/(upperlati-lowerlati);
    push();
    stroke("#fc642d");
    var height = .97*h-20;
    var width = height*scale;
    rect(.25*w,.97*h,width,-height);
    datarr.forEach(function(element,index){
      var r = map(parseInt(element[3].slice(1)),0,321,0,255);
      var b = 50;
      strokeWeight(5);
      stroke(r,50,b);
      var lati = parseFloat(element[1]);
      var long = parseFloat(element[2]);
      var mappedlat = map(lati,lowerlati,upperlati,.25*w,.25*w +width);
      var mappedlong = map(long,lowerlong,upperlong,.97*h-height,.97*h);
      point(mappedlat,mappedlong);
    });
    textSize(32);
    noStroke();
    fill("#fc642d");
    if(.25*w >= 250){
      text("Price Heat Map",20, 200);
    }
    pop();
  }
  else if(state == "POP"){
    push();
    stroke("#fc642d");
    strokeWeight(4);
    push();
    noStroke();
    fill("#fc642d");
    textAlign(CENTER);
    textSize(32);
    text("Neighborhood Popularity",.5*w,40);
    pop();
    line(.08*w,.9*h,(1-.08)*w,.9*h);
    line(.08*w,.9*h,.08*w,.2*h);
    var lh = .9*h;
    var index = 0;
    while(lh >= .15*h){
      line(.08*w-5,lh,.08*w+5,lh);
      push();
      textSize(10);
      noStroke();
      var lmark = 85+index*5;
      index++;
      text(lmark.toString()+"%",.08*w-30,lh+3);
      pop();
      lh -= .7*h/3;
    }
    for(var i = 0;i < 37;i++){
      pobarr[i].update();
      pobarr[i].render();
    }
    info(geti());
    pop();
  }
}

function calcLimit(data){
  lowerlati = parseFloat(data[0][1]);
  upperlati = parseFloat(data[0][1]);
  lowerlong = parseFloat(data[0][2]);
  upperlong = parseFloat(data[0][2]);
  data.forEach(function(element){
    if(lowerlati > parseFloat(element[1])){
      lowerlati = parseFloat(element[1]);
    }
    if(upperlati < parseFloat(element[1])){
      upperlati = parseFloat(element[1]);
    }
    if(lowerlong > parseFloat(element[2])){
      lowerlong = parseFloat(element[2]);
    }
    if(upperlong< parseFloat(element[2])){
      upperlong = parseFloat(element[2]);
    }
  });
}


function mousePressed(){
  var butt = butti();
  if(butt >= 0){
    state = buttarr[butt].state
  }
}

function butti(){
  var i = -1;
  if(mouseX >= 0 && mouseX <= 70){
    if(mouseY >= 0 && mouseY <= 60){
      i = Math.floor(mouseY/20)
    }
  }
  return i
}

function button(i,dstate){
  this.state = dstate;
  this.y = i*20;
  this.current = false;
  this.update = function(){
    if(state==this.state){
      this.current = true;
    }
    else{
      this.current = false;
    }
  }
  this.render= function(hover){
    push();
    textAlign(CENTER);
    if(this.current||hover){
      stroke("#fc642d");
      fill("#fc642d");
      rect(0,this.y,70,20);
      noStroke();
      fill(255);
      text(dstate,35,this.y+15);
    }
    else{
      stroke("#fc642d");
      fill(255);
      rect(0,this.y,70,20);
      noStroke();
      fill("#fc642d");
      text(dstate,35,this.y+15);
    }
    pop();
  }
}

function geti(){
  var i = (mouseX-3-.08*w)/((1/37)*(1-.16)*w);
  return Math.floor(i);
}

function info(i){
  var arr;
  if(state == "GRAPH"){
    arr = bararr;
  }
  else{
    arr = pobarr;
  }
  if(i >= 0 && i <= 36){
    if(mouseY >= arr[i].y-arr[i].height && mouseY <=arr[i].y){
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
        text(arr[i].neigh,mouseX + 10,mouseY-80);
        var disp = "$" + arr[i].avgp;
        if(state == "POP"){
          disp =map(arr[i].avgp,0,.7*h,85,100)+"%";
        }
        text(disp,mouseX + 10,mouseY-50);
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
        text(arr[i].neigh,mouseX + 10,mouseY+50);
        var disp = "$" + arr[i].avgp;
        if(state == "POP"){
          disp =map(arr[i].avgp,0,.7*h,85,100)+"%";
        }
        text(disp,mouseX + 10,mouseY+80);
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
        text(arr[i].neigh,mouseX + 10-140,mouseY-80);
        var disp = "$" + arr[i].avgp;
        if(state == "POP"){
          disp =map(arr[i].avgp,0,.7*h,85,100)+"%";
        }
        text(disp,mouseX + 10-140,mouseY-50);
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
        text(arr[i].neigh,mouseX + 10-140,mouseY+50);
        var disp = "$" + arr[i].avgp;
        if(state == "POP"){
          disp =map(arr[i].avgp,0,.7*h,85,100)+"%";
        }
        text(disp,mouseX + 10-140,mouseY+80);
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
  this.update=function(){
    var height = map(parseFloat(poparr[i][1]),85,100,0,.7*h);
    this.height = height;
    this.avgp = height;
  }
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
  h = .7 *windowHeight;
  resizeCanvas(w,h);
}

function parseData(){
  Papa.parse("longandprice.csv", {
    download: true,
  	complete: function(results) {
      initializeDict(simplifyData(results.data));
      fullvals(simplifyData(results.data));
  	}
  });
  Papa.parse("popular.csv", {
    download: true,
  	complete: function(results) {
        poparr = results.data;
  	}
  });
}

function fullvals(data){
  datarr = data;
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
