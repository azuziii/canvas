import Texture from "./Texture.js";
import Sprite from "./Sprite.js";
import { AnimManager } from "./AnimationManager.js";

export default class TileSprite extends Sprite {
	public anims: AnimManager;
	public frame = { x: 0, y: 0 };

	constructor(
		public texture: Texture,
		public tileWidth: number,
		public tileHeight: number,
	) {
		super(texture);
		this.anims = new AnimManager(this);
	}

	update(dt: number) {
		this.anims.update(dt);
	}

	get w() {
		return this.tileWidth * Math.abs(this.scale.x);
	}

	get h() {
		return this.tileHeight * Math.abs(this.scale.y);
	}
}
