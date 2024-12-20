import Texture from "./Texture";

export default class Sprite {
	width: number;
	height: number;

	constructor(
		public texture: Texture,
		public visible = true,
		public scale = { x: 1, y: 1 },
		public dead = false,
		public anchor = { x: 0, y: 0 },
		public pos = { x: 0, y: 0 },
		public pivot = { x: 0, y: 0 },
		public rotation = 0,
	) {
		this.width = texture.img.width;
		this.height = texture.img.height;
	}

	update(dt: number, t: number) {}
}
