import Texture from "./Texture";

export default class Sprite {
	pos = { x: 0, y: 0 };
	width: number;
	height: number;
	dead = false;
	constructor(public texture: Texture, public visible = true) {
		this.width = texture.img.width;
		this.height = texture.img.height;
	}

	update(dt: number) {}
}
