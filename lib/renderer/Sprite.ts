import Texture from "./Texture";

export default class Sprite {
	pos = { x: 0, y: 0 };
	constructor(public texture: Texture, public visible = true) {}

	update({ delta, width }: { delta: number; width: number }) {}
}
