import { Texture, TileMap, TileSprite } from "../lib/index.js";
import { Frame } from "../lib/types/frame.js";
import { rand } from "../lib/utils/math.js";

const texture = new Texture("res/images/tiles.png");

export default class Level extends TileMap {
	public bounds: { [s: string]: number };
	private blankFrame = {
		x: 0,
		y: 0,
	};
	private lastTile!: TileSprite;

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

	checkGround(pos: Frame) {
		const { blankFrame, lastTile } = this;
		const tile = this.tileAtPixelPos(pos);
		if (lastTile === tile) return "checked";

		this.lastTile = tile;

		if (tile.frame != blankFrame) {
			this.setFrameAtPixelPos(pos, blankFrame);
			return "solid";
		}
		return "cleared";
	}
}
