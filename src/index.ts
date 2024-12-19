import {
	KeyControls,
	MouseControls,
	Container,
	Text,
	CanvasRenderer,
	Texture,
	Sprite,
} from "../lib/index.js";

class Game {
	scene = new Container();
	mouse!: MouseControls;
	controls = new KeyControls();
	renderer!: CanvasRenderer;

	ctx!: CanvasRenderingContext2D;
	width = 640;
	height = 480;
	delta = 0;
	last = 0;
	speed = 64;
	p1 = 0;
	p2 = 0;
	color = 0;

	constructor() {
		this.init();

		const texture = new Texture("res/images/spaceship.png");
		console.log(texture);

		for (let i = 0; i < 50; i++) {
			const ship = new Sprite(texture);
			ship.pos.x = Math.random() * (this.width - 50);
			ship.pos.y = Math.random() * (this.height - 50);
			this.scene.add(ship);
			const speed = Math.random() * 150 + 50;
			ship.update = function ({
				delta,
				width,
			}: {
				delta: number;
				width: number;
			}) {
				this.pos.x += speed * delta;
				if (this.pos.x > width) {
					this.pos.x = -32;
				}
			};
		}

		requestAnimationFrame(this.loop.bind(this));
	}

	init() {
		this.renderer = new CanvasRenderer(this.width, this.height);
		this.mouse = new MouseControls(this.renderer.view);
		document.getElementById("board")!.appendChild(this.renderer.view);
	}

	rand(x: number, floor: boolean = true) {
		return floor ? Math.floor(Math.random() * x) : Math.random() * x;
	}

	loop(ms: any) {
		const t = ms / 1000;
		this.delta = t - this.last;
		this.last = t;

		this.scene.update({
			delta: this.delta,
			width: this.width,
			height: this.height,
		});
		this.renderer.render(this.scene);

		requestAnimationFrame(this.loop.bind(this));
	}
}

new Game();
