import Texture from "./Texture.js";
import Sprite from "./Sprite.js";

export default class TileSprite extends Sprite {
	constructor(
		public texture: Texture,
		public width: number,
		public height: number,
		public frame = { x: 0, y: 0 },
		public tileWidth = width,
		public tileHeight = height,
	) {
		super(texture);
	}
}
