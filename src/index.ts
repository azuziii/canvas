class Game {
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  width!: number;
  height!: number;

  constructor() {
    this.canvas;
    this.ctx;
    this.width;
    this.height;

    this.init();
  }

  init() {
    this.canvas = this.createCanvas(640, 480);
    console.log(document.getElementById("board"));
    document.getElementById("board")!.appendChild(this.canvas);
    this.test();
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

  test() {
    for (let i = 0; i < 600; i++) {
      this.sphere({
        x: this.rand(this.width),
        y: this.rand(this.height),
        r: this.rand(3, false),
      });
    }
  }
}

const game = new Game();
