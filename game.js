let bs = 50;
class Building {
    constructor(x, y, mf, mt, color) {
        this.x = x;
        this.y = y;
        this.mf = mf;
        this.mt = mt;
        this.count = [];
        for(let i = 0;i < 10;i ++) { this.count[i] = 0; }
        this.color = color;
        this.attached = undefined;
    }
    draw() {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, bs, bs);
        context.font = "16pt Monospace";
        context.fillStyle = "black";
        context.fillText("C:" + this.count[1], this.x, this.y + 1*16);
        context.fillText("I:" + this.count[2], this.x, this.y + 2*16);
        
        if(this.attached != undefined) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.lineTo(this.attached.x, this.attached.y);
            context.stroke();
        }
    }
    work() {
        if(this.mf == 0 || this.count[this.mf] > 0) {
            this.count[this.mf] --;
            this.count[this.mt] ++;
        }
    }
    transfer() {
        if(this.attached == undefined) { return; }
        this.count[this.mt] --;
        this.attached.count[this.mt] ++;
    }
};

/*
0  = void
1  = coal
2  = iron
*/

let buildings = [];
buildings.push(new Building(0, 0, 0, 1, "blue"));
buildings.push(new Building(100, 0, 1 , 2, "red"));
buildings[0].attached = buildings[1];

function update() {
    for(let i = 0;i < buildings.length;i ++) {
        buildings[i].work();
    }
    for(let i = 0;i < buildings.length;i ++) {
        buildings[i].transfer();
    }
}

function draw() {
    // This is how you draw a rectangle
    for(let i = 0;i < buildings.length;i ++) {
        buildings[i].draw();
    }
    if(try_attach) {
        context.beginPath();
        context.moveTo(first_building.x, first_building.y);
        context.lineTo(mouseX, mouseY);
        context.stroke();
    }
};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

let try_attach = false;
let first_building;

function mousedown() {
    try_attach = false;
    for(let i = 0;i < buildings.length;i ++) {
        if(areColliding(mouseX, mouseY, 1, 1, buildings[i].x, buildings[i].y, bs, bs)) {
            try_attach = true;
            first_building = buildings[i];
        }
    }
    if(!try_attach) {
        let mf = 1;
        let mt = 2;
        let color = "red";
        if(Math.random() < 0.5) {
            mf = 0;
            mt = 1;
            color = "blue";
        }
        buildings.push(new Building(mouseX, mouseY, mf, mt, color));
    }
}

function mouseup() {
    // Show coordinates of mouse on click
    if(!try_attach) { return; }
    
    for(let i = 0;i < buildings.length;i ++) {
        if(areColliding(mouseX, mouseY, 1, 1, buildings[i].x, buildings[i].y, bs, bs)) {
            first_building.attached = buildings[i];
            console.log('ad');
        }
    }
    
    try_attach = false;
};