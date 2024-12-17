class Game {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  width!: number;
  height!: number;

  delta = 0;
  last = 0;

  speed = 64;
  p1 = 0;
  p2 = 0;

  constructor() {
    this.canvas;
    this.ctx;
    this.width;
    this.height;

    this.init();
    requestAnimationFrame(this.loop.bind(this));
  }

  init() {
    this.canvas = this.createCanvas(640, 480);
    console.log(document.getElementById("board"));
    document.getElementById("board")!.appendChild(this.canvas);
  }

  createCanvas(width: number, height: number): HTMLCanvasElement {
    const canvas = document.createElement("canvas");
    this.width = canvas.width = width;
    this.height = canvas.height = height;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    return canvas;
  }

  rect() {
    this.ctx.beginPath();
  }

  deg2Rad(deg: number) {
    return (Math.PI / 180) * deg;
  }

  rad2Deg(rad: number) {
    return (180 / Math.PI) * rad;
  }

  sphere({
    x,
    y,
    r,
    startAngle = 0,
    endAngle = Math.PI * 2,
    color = "#111111",
    isStroke = false,
  }: {
    x: number;
    y: number;
    r: number;
    startAngle?: number;
    endAngle?: number;
    color?: string;
    isStroke?: boolean;
  }) {
    this.ctx.beginPath();
    this.ctx.arc(x, y, r, startAngle, endAngle);
    this.ctx.fillStyle = color;
    isStroke ? this.ctx.stroke() : this.ctx.fill();
  }

  rand(x: number, floor: boolean = true) {
    return floor ? Math.floor(Math.random() * x) : Math.random() * x;
  }

  loop(ms: any) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    const t = ms / 1000;
    this.delta = t - this.last;
    this.last = t;

    this.sphere({
      x: this.p1,
      y: 70,
      r: 20,
    });

    this.sphere({
      x: this.p2,
      y: 120,
      r: 20,
    });

    this.p1 += this.speed * this.delta;
    this.p2 += this.speed * (1 / 60);
    if (this.p1 + 20 > this.width) this.p1 = 20;
    if (this.p2 + 20 > this.width) this.p2 = 20;

    this.ctx.strokeText(
      `Frame length: ${(this.delta * 1000).toFixed(2)} ms`,
      10,
      30
    );
    this.ctx.strokeText(`Total time: ${ms.toFixed(2)}`, 10, 10);
    requestAnimationFrame(this.loop.bind(this));
  }
}

const game = new Game();
