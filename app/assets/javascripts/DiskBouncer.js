function DiskBouncer(diskRadius,N,dt,width) {
  this.dt = dt;
  this.diskRadius = diskRadius;
  this.disks = [];
  this.vx = [];
  this.vy = [];
  for(var i = 0; i < N; i++) {
    var theta = 2*Math.PI*Math.random();
    this.vx.push(0*Math.cos(theta));
    this.vy.push(0*Math.sin(theta));

    this.disks.push(new Disk(0.25*width+0.5*width*Math.random(),0.25*width+0.5*width*Math.random(),this.diskRadius));

    while(true) {
      var existsOverlap = false;
      for(var i = 0; i < this.disks.length-1; i++) {
        if( this.disks[i].disksOverlap(this.disks[this.disks.length-1]) ) {
          existsOverlap = true;
        }
      }
      if(existsOverlap) {
        this.disks[this.disks.length-1] = new Disk(0.25*width+0.5*width*Math.random(),0.25*width+0.5*width*Math.random(),this.diskRadius);
      } else {
        break;
      }
    }
  }
}

DiskBouncer.prototype.update = function() {
  for(var i = 0; i < this.disks.length; i++) {
    this.disks[i].centerX += this.vx[i]*this.dt;
    this.disks[i].centerY += this.vy[i]*this.dt;
    for(var j = 0; j < this.disks.length; j++) {
      if(j != i) {
        var dispX = this.disks[i].centerX - this.disks[j].centerX;
        var dispY = this.disks[i].centerY - this.disks[j].centerY;
        var absXY = Math.sqrt(Math.pow(dispX,2)+Math.pow(dispY,2));
        this.vx[i] -= this.dt * dispX / Math.pow(absXY,1);
        this.vy[i] -= this.dt * dispY / Math.pow(absXY,1);
      }
    }
  }

  for( var i = 0; i < this.disks.length; i++) {
    for(var j = 0; j < this.disks.length; j++) {
      if((i<j) && this.disks[i].disksOverlap(this.disks[j])) {
        var nx = this.disks[i].centerX - this.disks[j].centerX;
        var ny = this.disks[i].centerY - this.disks[j].centerY;
        var nabs = Math.sqrt(Math.pow(nx,2)+Math.pow(ny,2));
        nx = nx / nabs;
        ny = ny / nabs;
        var mult = (this.vx[i]-this.vx[j])*nx + (this.vy[i]-this.vy[j])*ny;
        if(mult < 0) {
          this.vx[i] = this.vx[i] - nx*mult;
          this.vy[i] = this.vy[i] - ny*mult;
          this.vx[j] = this.vx[j] + nx*mult;
          this.vy[j] = this.vy[j] + ny*mult;
        }
      }
    }
  }
}
