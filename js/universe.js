function Universe(canvas){
    this.canvas = canvas;
    this.context = canvas.getContext('2d');

    this.updateCanvasSize();

    this.timing = {
        lastTimer: 0,
        currentTimer: 0,
        time: 0,
        fps: 60,
        frameCounter: 0,
        timeCounter: 0
    };

    this.timing.lastTimer = new Date().getTime();
    this.timing.currentTimer = this.timing.lastTimer;

    this.worlds = []
};

Universe.prototype.update = function() {
    var gameTime = { time: 0, fps: 0 };
    this.calculateTime();

    gameTime.fps = this.timing.fps;
    gameTime.time = this.timing.time;

    for (var idx in this.worlds) {
        world = this.worlds[idx];
        world.update(gameTime);
    }
};

Universe.prototype.erase = function() {
    // stores the current transformation matrix
    this.context.save();

    // using the identity matrix to clear the canvas
    //context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // restoring the transformation matrix
    this.context.restore();
};

Universe.prototype.draw = function() {
    this.updateCanvasSize();

    for (var idx in this.worlds) {
        world = this.worlds[idx];
        world.draw(this.context);
    }
};

Universe.prototype.calculateTime = function() {
    this.timing.currentTimer = new Date().getTime();
    this.timing.time = this.timing.currentTimer - this.timing.lastTimer;
    this.timing.lastTimer = this.timing.currentTimer;
    this.timing.timeCounter += this.timing.time;
    this.timing.frameCounter++;

    if(this.timing.timeCounter >= 1000){ // one second
        this.timing.timeCounter = 0;
        this.timing.fps = this.timing.frameCounter;
        this.timing.frameCounter = 0;
    }

    // this parameter should be passed along as second
    this.timing.time /= 1000;
};

Universe.prototype.updateCanvasSize = function() {
    // Make the canvas occupy the whole screen
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
};