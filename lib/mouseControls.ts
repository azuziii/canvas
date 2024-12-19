export default class MouseControls {
	pos = {
		x: 0,
		y: 0,
	};
	isDown = false;
	isPressed = false;
	isRealesed = false;

	constructor(private canvas: HTMLCanvasElement) {
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
		const { canvas, pos } = this;
		const rect = canvas.getBoundingClientRect();
		const xr = canvas.width / canvas.clientWidth;
		const yr = canvas.height / canvas.clientHeight;
		pos.x = (clientX - rect.left) * xr;
		pos.y = (clientY - rect.top) * yr;
	}

	down(e: MouseEvent) {
		this.isDown = true;
		this.isPressed = true;
		this.move(e);
	}

	up() {
		this.isDown = false;
		this.isRealesed = true;
	}

	update() {
		this.isRealesed = false;
		this.isPressed = false;
	}
}
