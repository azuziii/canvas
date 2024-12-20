import Container from "./Container";
import CanvasRenderer from "./renderer/CanvasRenderer";

export default class Game {
	renderer!: CanvasRenderer;
	scene = new Container();

	constructor(
		public width: number,
		public height: number,
		public parent = "body",
		private step = 1 / 60,
		private MAX_FRAME = 5,
	) {
		this.renderer = new CanvasRenderer(this.width, this.height);
		document.querySelector(parent)?.appendChild(this.renderer.view);
	}

	run(gameUpdate = () => {}) {
		let dt = 0;
		let last = 0;
		const loop = (ms: number) => {
			const t = ms / 1000;
			dt = Math.min(t - last, this.MAX_FRAME);
			last = t;

			this.scene.update(dt, t);
		};
	}
}
