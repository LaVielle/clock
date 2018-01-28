function module(x, y, s, h){
   this.x = x;
   this.y = y;
   this.s = s;

   this.center = createVector(this.x + this.s/2, this.y + this.s/2);

   this.hu = h;

   var numLayers = floor(random(1,10));
   // var numLayers = 5;
   var maxBreaks = 6;

   var radStart = this.s/numLayers/2;

   this.update = function(){

   }

   this.show = function(){

      push()
      translate(this.center.x, this.center.y);

      for (var i = 0; i < numLayers; i++) {
         var randBreaks = floor(random(1,maxBreaks));
         var randStart = random(360);

         noFill();
         // stroke(255);
         strokeHsluv(random(0.8*this.hu, 1.2*this.hu), 100, 50);
         strokeWeight(random(2, 5));



         beginShape();
         for (var j = 0; j < 360; j++) {
            var px = cos(radians(j)) * (radStart - this.s/10);
            var py = sin(radians(j)) * (radStart - this.s/10);
            vertex(px, py);
         }
         endShape();

         // noStroke();
         // fill(255, 0, 0);
         //
         // for (var j = 0; j < randBreaks; j++) {
         //    var px = cos(radians(360/j)) * radStart;
         //    var py = sin(radians(360/j)) * radStart;
         //
         //    ellipse(px, py, 15);
         // }
         radStart += this.s/numLayers/2;
      }

      pop();

   }
}
