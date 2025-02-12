import TileSprite from "./TileSprite.js";
import { Frame } from "./types/frame";

class Anim {
	currFrame!: number;
	currTime!: number;
	frame!: Frame;

	constructor(public frames: any[], public rate: number) {
		this.reset();
	}

	update(dt: number) {
		const { rate, frames } = this;
		if ((this.currTime += dt) > rate) {
			this.currFrame++;
			this.frame = frames[this.currFrame % frames.length];
			this.currTime -= rate;
		}
	}

	reset() {
		this.frame = this.frames[0];
		this.currFrame = 0;
		this.currTime = 0;
	}
}

class AnimManager {
	public anims: { [s: string]: any } = {};
	public running = false;
	public current: string | null = null;
	public frameSource = { x: 0, y: 0 };
	constructor(public e: TileSprite) {
		this.frameSource = e.frame || e;
	}

	add(name: string, frames: Frame[], speed: number) {
		this.anims[name] = new Anim(frames, speed);
		return this.anims[name];
	}

	update(dt: number) {
		const { current, anims, frameSource } = this;

		if (!current) return;

		const anim: Anim = anims[current];
		anim.update(dt);

		frameSource.x = anim.frame.x;
		frameSource.y = anim.frame.y;
	}

	play(name: string) {
		const { current, anims } = this;

		if (name == current) return;

		this.current = name;
		anims[name].reset();
	}

	stop() {
		this.current = null;
	}
}

export { Anim, AnimManager };
