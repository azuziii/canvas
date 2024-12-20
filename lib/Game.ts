import Container from "./Container.js";
import MouseControls from "./controls/MouseControls.js";
import CanvasRenderer from "./renderer/CanvasRenderer.js";

export default class Game {
	renderer!: CanvasRenderer;
	scene = new Container();
	mouse!: MouseControls;

	constructor(
		public width: number,
		public height: number,
		public parent = "body",
		private step = 1 / 60,
		private MAX_FRAME = step * 5,
	) {
		this.renderer = new CanvasRenderer(this.width, this.height);
		document.querySelector(parent)?.appendChild(this.renderer.view);
		this.mouse = new MouseControls(this.renderer.view);
	}

	run(gameUpdate = (...args: any[]) => {}) {
		let dt = 0;
		let last = 0;
		const loop = (ms: number) => {
			const t = ms / 1000;
			dt = Math.min(t - last, this.MAX_FRAME);
			last = t;

			this.scene.update(dt, t);
			gameUpdate(dt, t);
			this.renderer.render(this.scene);

			requestAnimationFrame(loop);
		};
		requestAnimationFrame(loop);
	}
}
