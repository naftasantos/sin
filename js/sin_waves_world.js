function SinWavesWorld(canvas){
    this.canvas = canvas;
    this.textColor = "#000";
    this.textFont = "12px Courier";
    this.fps = 0;
    this.val = 0;
    this.pointsTime = 0;
    this.pointsSpawnTime = 0.01;
    this.points = [];
    this.pointsSpeed = 100;
    this.colorChangeSpeed = 5;
    this.currentColorTime = 0;
    this.colorChangeMultiplier = 1;
    this.sin = 0;

    this.circle = {
        radius: 5,
        x: 0,
        y: 0
    };

    this.point = {
        radius: 1
    }

    this.colors = [
        {
            r: 234,
            g: 254,
            b: 226
        },
        {
            r: 226,
            g: 228,
            b: 254
        }
    ]

    this.currentColor = {
        r: this.colors[0].r,
        g: this.colors[0].g,
        b: this.colors[0].b
    }
    
    this.reset();
};

SinWavesWorld.prototype.update = function(gameTime) {
    this.fps = gameTime.fps;

    this.val += gameTime.time;
    this.pointsTime += gameTime.time;

    this.sin = Math.sin(this.val) / 7 * Math.PI;

    this.circle.x = this.canvas.width / 2;
    this.circle.y = (this.canvas.height / 2) + (this.canvas.height * this.sin);

    for(var idx in this.points) {
        var point = this.points[idx];
        point.x += this.pointsSpeed * gameTime.time;

        if(point.x > this.canvas.width) {
            this.points.splice(idx, 1);
        }
    }

    if(this.pointsTime >= this.pointsSpawnTime) {
        this.pointsTime = 0;
        this.points.push({
            radius: this.point.radius,
            x: this.circle.x,
            y: this.circle.y
        });
    }

    this.currentColor = {
        r: Math.round(this.colors[0].r + ((this.colors[1].r - this.colors[0].r) * this.sin)),
        g: Math.round(this.colors[0].g + ((this.colors[1].g - this.colors[0].g) * this.sin)),
        b: Math.round(this.colors[0].b + ((this.colors[1].b - this.colors[0].b) * this.sin))
    }

    this.currentColorTime += this.colorChangeMultiplier * gameTime.time;

    if(this.currentColorTime >= this.colorChangeSpeed || 
        this.currentColorTime <= 0) {
        this.colorChangeMultiplier *= -1;

    }
};

SinWavesWorld.prototype.draw = function(context) {
    context.fillStyle = "rgba(" + 
            this.currentColor.r + ", " + 
            this.currentColor.g + ", " + 
            this.currentColor.b + ", 1)";
    context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    context.fillStyle = "#C0C0C0";
    context.fillRect(0, this.circle.y, this.canvas.width, 1);

    for(var idx in this.points) {
        var point = this.points[idx];

        context.beginPath();
        context.arc(point.x, point.y, point.radius, 0, 2 * Math.PI, false);
        context.fillStyle = "rgba(255, 0, 0, 1)";
        context.fill();
        context.closePath();
    }

    context.beginPath();
    context.arc(this.circle.x, this.circle.y, this.circle.radius, 0, 2 * Math.PI, false);
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fill();
    context.closePath();

    context.fillStyle   = this.textColor;
    context.font        = this.textFont;

    context.fillText(" fps: " + this.fps, 10, 15);    
    context.fillText("time: " + this.val.toFixed(2), 10, 30);
    context.fillText("   y: " + this.circle.y.toFixed(2), 10, 45);
    context.fillText("objs: " + this.points.length, 10, 60);
    context.fillText(" sin: " + this.sin.toFixed(2), 10, 75);
};

SinWavesWorld.prototype.reset = function() {

};