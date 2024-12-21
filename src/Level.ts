import { Texture, TileMap } from "../lib/index.js";
import { rand } from "../lib/utils/math.js";

const texture = new Texture("res/images/tiles.png");

export default class Level extends TileMap {
	public bounds: { [s: string]: number };

	constructor(public width: number, public height: number) {
		const tileSize = 32;
		const mapWidth = Math.ceil(width / tileSize);
		const mapHeight = Math.ceil(height / tileSize);

		const level = [];
		for (let y = 0; y < mapHeight; y++) {
			for (let x = 0; x < mapWidth; x++) {
				level.push({
					x: rand(5),
					y: rand(2),
				});
			}
		}

		super(level, mapWidth, mapHeight, tileSize, tileSize, texture);

		this.bounds = {
			left: tileSize,
			right: width - tileSize * 2,
			top: tileSize * 2,
			bottom: height - tileSize * 2,
		};
	}
}
