window.onload = function() {

  var canvas = document.querySelector("#db");
  var context = canvas.getContext("2d");
  var db = new DiskBouncer(10,100,1.0/60,canvas.width);

  document.body.addEventListener("click",
  function(e) {
    db = new DiskBouncer(10,100,1.0/60,canvas.width);
  });


  function main(tf) {
    window.requestAnimationFrame(main);
    db.update();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for(var i = 0; i < db.disks.length; i++) {
      context.beginPath();
      context.arc(Math.floor(db.disks[i].centerX),Math.floor(db.disks[i].centerY),
        Math.floor(db.disks[i].radius),
        0,2*Math.PI,false);
      context.fillStyle = "black";
      context.fill();
    }
  }
  
  main(0);
}
