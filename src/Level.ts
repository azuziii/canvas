import { Texture, TileMap, TileSprite } from "../lib/index.js";
import { Frame } from "../lib/types/frame.js";
import { rand, randOneIn } from "../lib/utils/math.js";

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
		// for (let y = 0; y < mapHeight; y++) {
		// 	for (let x = 0; x < mapWidth; x++) {
		// 		level.push({
		// 			x: rand(5),
		// 			y: rand(2),
		// 		});
		// 	}
		// }

		for (let i = 0; i < mapWidth * mapHeight; i++) {
			const isTopOrBottom = i < mapWidth || i > mapWidth * mapHeight - mapWidth;
			const isRightOrLeft = i % mapWidth == mapWidth - 1 || i % mapWidth == 0;
			const isSecondRow = Math.floor(i / mapWidth) == 1;

			if (isTopOrBottom) {
				level.push({
					x: 2,
					y: 1,
				});
			} else if (isRightOrLeft) {
				level.push({
					x: 3,
					y: 1,
				});
			} else if (isSecondRow) {
				level.push({
					x: 4,
					y: 1,
				});
			} else {
				level.push({
					x: rand(1, 3),
					y: 0,
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

		if (tile.frame.x != 0 && (tile.frame.y == 0 || tile.frame.y == 1)) {
			this.setFrameAtPixelPos(pos, randOneIn() ? blankFrame : { x: 0, y: 1 });
			return "solid";
		}
		return "cleared";
	}
}
