window.onload = function() {

  var canvas = document.querySelector("#db");
  var context = canvas.getContext("2d");
  var db = new DiskBouncer(10,100,1.0/6000,canvas.width);

  document.body.addEventListener("click",
  function(e) {
    db = new DiskBouncer(10,100,1.0/600,canvas.width);
  });


  function main(tf) {
    window.requestAnimationFrame(main);
    for(var i = 0; i < 100; i++) {
      db.update();
    }
    context.clearRect(0, 0, canvas.width, canvas.height);

    for(var i=0; i<db.springs.length; i++) {
      var x1 = db.springs[i].disk1.centerX;
      var x2 = db.springs[i].disk2.centerX;
      var y1 = db.springs[i].disk1.centerY;
      var y2 = db.springs[i].disk2.centerY;
      context.beginPath();
      context.moveTo(x1,y1);
      context.lineTo(x2,y2);
      context.lineWidth = 2;
      context.stroke();
    }


    for(var i = 0; i < db.disks.length; i++) {
      context.beginPath();
      context.arc(Math.floor(db.disks[i].centerX),Math.floor(db.disks[i].centerY),
        Math.floor(db.disks[i].radius),
        0,2*Math.PI,false);
      if((i % 10 === 0) || ((i-1)%10 === 0)) {
        context.fillStyle = "black";
        context.fill();
      } else {
        context.strokeStyle = "black";
        context.lineWidth = 3;
        context.stroke();
        context.fillStyle = "white";
        context.fill();

      }
    }


  }
  
  main(0);
}
