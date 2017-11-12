var elem;
var w;
function setup() {
  var canvas = createCanvas(600,600);
  canvas.parent('sketch_holder');
  elem = (document.compatMode === "CSS1Compat") ?
    document.documentElement :
    document.body;
  w = elem.clientWidth;
  resizeCanvas(w,.5*  windowHeight);
  background('#00A699');
  parseData();
}

function draw() {

  // put drawing code here
}

function windowResized() {
  w = elem.clientWidth;
  resizeCanvas(w,.5*  windowHeight);
}

function parseData(){
  Papa.parse("longandprice.csv", {
  	complete: function(results) {
  		console.log("Finished:", results.data);
      getData(results.data)
  	}
  });
}

function getData(data) {


}
