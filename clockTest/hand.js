function hand(x1, y1, x2, y2){
   this.x1 = x1;
   this.y1 = y1;
   this.x2 = x2;
   this.y2 = y2;

   this.alpha = 255;

   this.updateAlpha = function(){
      if (this.alpha <= 0) {
         this.alpha = 255;
      }
      this.alpha -= 255/60;
   }

   this.updateSize = function(){

   }

   this.show = function(){

      noFill();
      stroke(255, this.alpha);
      strokeWeight(2);
      line(this.x1, this.y1, this.x2, this.y2);
   }
}
