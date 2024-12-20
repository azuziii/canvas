import { Texture, TileSprite } from "../../lib/index.js";
import { rand } from "../../lib/utils/math.js";

export default class Player extends TileSprite {
	constructor(
		private rate = 0.1,
		private curTime = 0,
		private curFrame = 0,
		public frames = [
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 3, y: 0 },
		],
		public speed = rand(20, 100),
	) {
		super(new Texture("res/images/player-walk.png"), 32, 32);
		this.frame = this.frames[this.curFrame];
		this.anchor = {
			x: -16,
			y: -16,
		};
	}

	override update(dt: number, t: number) {
		const { pos, speed, rate, frames } = this;
		pos.x += speed * dt;
		if (speed) {
			this.curTime += dt;
			if (this.curTime > rate) {
				this.frame = frames[this.curFrame++ % frames.length];
				this.curTime -= rate;
			}
		}
	}
}
