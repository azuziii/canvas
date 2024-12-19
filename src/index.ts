import KeyControls from "../lib/KeyControls.js";
import MouseControls from "../lib/mouseControls.js";

class Game {
	canvas!: HTMLCanvasElement;
	ctx!: CanvasRenderingContext2D;
	width!: number;
	height!: number;
	controls!: KeyControls;
	mouse!: MouseControls;

	delta = 0;
	last = 0;

	speed = 64;
	p1 = 0;
	p2 = 0;

	color = 0;

	constructor() {
		this.canvas;
		this.ctx;
		this.width;
		this.height;
		this.controls = new KeyControls();

		this.init();
		requestAnimationFrame(this.loop.bind(this));
	}

	init() {
		this.canvas = this.createCanvas(640, 480);
		this.mouse = new MouseControls(this.canvas);

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
		const t = ms / 1000;
		this.delta = t - this.last;
		this.last = t;
		console.log(this.mouse.isDown);
		if (this.mouse.isDown) {
			this.color += 10;
			if (this.color > 360) {
				this.color = 0;
			}
		}

		this.sphere({
			x: this.mouse.pos.x,
			y: this.mouse.pos.y,
			r: 20,
			color: `hsl(${this.color}, 50%, 50%)`,
		});

		this.mouse.update();
		requestAnimationFrame(this.loop.bind(this));
	}
}

const game = new Game();
