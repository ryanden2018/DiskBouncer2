function Disk(centerX,centerY,radius) {
  this.centerX = centerX;
  this.centerY = centerY;
  this.radius = radius;
}

Disk.prototype.disksOverlap = function(disk2) {
  var dist = Math.sqrt(Math.pow(this.centerX-disk2.centerX,2)+Math.pow(this.centerY-disk2.centerY,2));
  return ((this.radius+disk2.radius)>dist);
};
