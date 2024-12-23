import Sprite from "../Sprite.js";
import TileSprite from "../TileSprite.js";
import * as math from "./math.js";

function center(entity: Sprite | TileSprite) {
	const { pos, width, height } = entity;

	return {
		x: pos.x + width / 2,
		y: pos.y + height / 2,
	};
}

function distance(entityA: Sprite | TileSprite, entityB: Sprite | TileSprite) {
	return math.distance(center(entityA), center(entityB));
}

export { center, distance };
