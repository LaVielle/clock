// Initializing hands array
var hands = [];
var handsFull = false;

// set time interval check to 1000ms (so that tick() will run every second)
var tCheck;
var tInt = 1000;

// Initializing other necessary variables
var center;
var ang = 0;
var radius;
var sec = 1;

function setup(){
   createCanvas(400, 400);
   background(0);

   // Assigning value to tCheck, it will be equal to the amount of milliseconds ellapsed since program starts running.
   tCheck = millis();

   // Create vector object that hold the center of the sun.
   center = createVector(width/2, height/2);
   radius = width/4;

   // Set angleMode to degrees, as opposed to leaving radians default
   angleMode(DEGREES);

   // Creating first hand so it doesnt look weird when the sketch starts
   var x = cos(1 * (360/60)) * radius;
   var y = sin(1 * (360/60)) * radius;
   hands.push(new hand(0,0, x, y));

}

function draw(){

   // background(0);
   fill(0, 50);
   rect(0,0,width,height);

   // Map speed of sun rotation to its position in the sky
   var angInc = map(center.y, 0, height, 0.2, 0.8);

   ang += angInc;

   // Adjust center of the sun
   center.x = width/2 + cos(ang) * width/2;
   center.y = height/2 + sin(ang) * height/2;

   // Run tick() so that the seconds hand ticks
   tick();

   // Color variables, all mapped to the height of the sun (center.y)
   var sunHue = map(center.y, 0, height, 60, 20);
   var sunBright = map(center.y, 0, height, 80, 50);
   // radius = map(center.y, 0, height, width/4, width/2);
   var horizonBright = map(center.y, 0, height, 80, 10);

   // Color the sun
   fillHsluv(sunHue, 100, sunBright);
   noStroke();

   // Draw the sun
   ellipse(center.x, center.y, radius*2);

   // Draw seconds hands
   push();
   translate(center.x, center.y);
   rotate(-90);
   for (var i = 0; i < hands.length; i++) {
      hands[i].show();
      // hands[i].updateSize(); // Needs some work
   }
   pop();

   // Horizon line
   fillHsluv(60, 80, horizonBright);
   rect(0, 0.75*height, width, 0.25*height);

}

// Tick function
function tick(){

   // Check if 1000ms have ellapsed
   if (millis() - tCheck > tInt) {

      // Reset tCheck to millis()
      tCheck = millis();

      // If we ave less than 60 hand objects, create a new one
      if (handsFull == false) {
         var x = cos(sec * (360/60)) * radius;
         var y = sin(sec * (360/60)) * radius;

         hands.push(new hand(0,0, x, y));
      }

      // Increment sec, if sec reaches 60, we know that we have enough hands and we can stop creating them.
      sec +=1;
      if (sec > 60 ) {
         sec = 1;
         handsFull = true;
      }

      // Update transparency
      for (var i = 0; i < hands.length; i++) {
         hands[i].updateAlpha();
      }

      console.log("ticking");
   }
}

// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **
// HSLuv functions, you dont need to use this specifically.
// You can just add colorMode(HSL) in setup() and change fillHsluv() to fill() where you see that.
// ** ** ** ** ** ** ** ** ** ** ** ** ** ** ** **

function fillHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  fill(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
function strokeHsluv(h, s, l) {
  var rgb = hsluv.hsluvToRgb([h, s, l]);
  stroke(rgb[0] * 255, rgb[1] * 255, rgb[2] * 255);
}
