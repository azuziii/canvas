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
}
