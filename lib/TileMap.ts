import Container from "./Container.js";
import Texture from "./Texture.js";
import TileSprite from "./TileSprite.js";
import { Frame } from "./types/frame.js";

export default class TileMap extends Container {
	width!: number;
	height!: number;

	constructor(
		public tiles: Frame[],
		public mapWidth: number,
		public mapHeight: number,
		public tileWidth: number,
		public tileHeight: number,
		public texture: Texture,
	) {
		super();
		this.width = mapWidth * tileWidth;
		this.height = mapHeight * tileHeight;

		this.children = tiles.map((frame: Frame, i: number) => {
			const s = new TileSprite(texture, tileWidth, tileHeight);

			s.frame = frame;
			s.pos.x = (i % mapWidth) * tileWidth;
			s.pos.y = Math.floor(i / mapWidth) * tileHeight;

			return s;
		});
	}

	pixelToMapPos(pos: Frame): Frame {
		const { tileWidth, tileHeight } = this;
		return {
			x: Math.floor(pos.x / tileWidth),
			y: Math.floor(pos.y / tileHeight),
		};
	}

	mapToPixelPos(mapPos: Frame): Frame {
		const { tileWidth, tileHeight } = this;
		return {
			x: mapPos.x * tileWidth,
			y: mapPos.y * tileHeight,
		};
	}

	tileAtMapPos(mapPos: Frame): TileSprite {
		return this.children[mapPos.y * this.mapWidth + mapPos.x];
	}

	tileAtPixelPos(pos: Frame): TileSprite {
		return this.tileAtMapPos(this.pixelToMapPos(pos));
	}

	setFrameAtMapPos(mapPos: Frame, frame: Frame) {
		const tile = this.tileAtMapPos(mapPos);
		tile.frame = frame;
		return tile;
	}

	setFrameAtPixelPos(pos: Frame, frame: Frame) {
		return this.setFrameAtMapPos(this.pixelToMapPos(pos), frame);
	}
}
