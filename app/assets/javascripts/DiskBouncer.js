function Spring(disk1,disk2) {
  this.disk1 = disk1;
  this.disk2 = disk2;
  var x1 = this.disk1.centerX;
  var x2 = this.disk2.centerX;
  var y1 = this.disk1.centerY;
  var y2 = this.disk2.centerY;
  this.restingLength = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
}

Spring.prototype.forceScalar = function() {
  var x1 = this.disk1.centerX;
  var x2 = this.disk2.centerX;
  var y1 = this.disk1.centerY;
  var y2 = this.disk2.centerY;
  var dist = Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
  return 1000*(-1)*(this.restingLength-dist);
};

Spring.prototype.forceX = function() {
  var x1 = this.disk1.centerX;
  var x2 = this.disk2.centerX;
  var y1 = this.disk1.centerY;
  var y2 = this.disk2.centerY;
  var nx = x1-x2;
  var ny = y1-y2;
  var nabs = Math.sqrt(Math.pow(nx,2)+Math.pow(ny,2));
  nx = nx / nabs;
  ny = ny / nabs;
  return nx * this.forceScalar();
};

Spring.prototype.forceY = function() {
  var x1 = this.disk1.centerX;
  var x2 = this.disk2.centerX;
  var y1 = this.disk1.centerY;
  var y2 = this.disk2.centerY;
  var nx = x1-x2;
  var ny = y1-y2;
  var nabs = Math.sqrt(Math.pow(nx,2)+Math.pow(ny,2));
  nx = nx / nabs;
  ny = ny / nabs;
  return ny * this.forceScalar();
};



function DiskBouncer(diskRadius,N,dt,width) {
  this.dt = dt;
  this.diskRadius = diskRadius;
  this.disks = [];
  this.springs = [];
  this.vx = [];
  this.vy = [];
  for(var i = 0; i < N/2; i++) {
    var theta = 2*Math.PI*Math.random();
    this.vx.push(0);
    this.vy.push(0);
    this.vx.push(0);
    this.vy.push(0);

    var a = 0.25*width+0.5*width*Math.random();
    var b = 0.25*width+0.5*width*Math.random();

    this.disks.push(new Disk(a,b,this.diskRadius));
    this.disks.push(new Disk(a+Math.cos(theta)*3*diskRadius,b+Math.sin(theta)*3*diskRadius,this.diskRadius));


    while(true) {
      var existsOverlap = false;
      for(var i = 0; i < this.disks.length-2; i++) {
        if( this.disks[i].disksOverlap(this.disks[this.disks.length-1]) ) {
          existsOverlap = true;
        }
        if( this.disks[i].disksOverlap(this.disks[this.disks.length-2]) ) {
          existsOverlap = true;
        }
      }
      if(existsOverlap) {
        var ap = 0.25*width+0.5*width*Math.random();
        var bp = 0.25*width+0.5*width*Math.random();
        this.disks[this.disks.length-2] = new Disk(ap,bp,this.diskRadius);
        this.disks[this.disks.length-1] = new Disk(ap+Math.cos(theta)*3*diskRadius,bp+Math.sin(theta)*3*diskRadius,this.diskRadius);
      } else {
        break;
      }
    }

    this.springs.push(new Spring( this.disks[this.disks.length-1],this.disks[this.disks.length-2] ));
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

  for(var i = 0; i < this.springs.length; i++) {
    this.vx[2*i] += this.springs[i].forceX()*this.dt;
    this.vy[2*i] += this.springs[i].forceY()*this.dt;
    this.vx[2*i+1] -= this.springs[i].forceX()*this.dt;
    this.vy[2*i+1] -= this.springs[i].forceY()*this.dt;
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
