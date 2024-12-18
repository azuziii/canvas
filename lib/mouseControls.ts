export default class KeyControls {
	canvas: HTMLCanvasElement;
	x = 0;
	y = 0;
	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.init();
	}

	init() {
		this.attachEvents();
	}

	attachEvents() {
		this.canvas.addEventListener("mousemove", this.move.bind(this));
		this.canvas.addEventListener("mousedown", this.down.bind(this));
		this.canvas.addEventListener("mouseup", this.up.bind(this));
	}

	move({ clientX, clientY }: MouseEvent) {
		this.x = clientX;
		this.y = clientY;
	}

	down() {}

	up() {}
}
