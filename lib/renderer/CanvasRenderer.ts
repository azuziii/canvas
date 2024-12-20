import Container from "../Container";
import Sprite from "../Sprite";
import Text from "../Text";
import Texture from "../Texture";
import TileSprite from "../TileSprite";

export default class CanvasRenderer {
	view: HTMLCanvasElement;
	ctx: CanvasRenderingContext2D;
	width: number;
	height: number;

	constructor(width: number, height: number) {
		const canvas = document.createElement("canvas");
		this.width = canvas.width = width;
		this.height = canvas.height = height;
		this.view = canvas;
		this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
	}

	render(container: Container, clear = true) {
		if (clear) {
			this.clear();
		}

		const { ctx } = this;

		function renderRec(container: Container, t: boolean = false) {
			for (let child of container.children) {
				if (child.children) {
					renderRec(child as Container, true);
				}

				if (!child.visible) continue;

				ctx.save();

				if (child.pos) {
					ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
				}

				if (child.anchor) {
					ctx.translate(Math.round(child.anchor.x), Math.round(child.anchor.y));
				}

				if (child.scale) {
					ctx.scale(child.scale.x, child.scale.y);
				}

				if (child.rotation) {
					ctx.translate(child.pivot.x, child.pivot.y);
					ctx.rotate(child.rotation);
					ctx.translate(-child.pivot.x, -child.pivot.y);
				}

				if (child.text) {
					const { font, fill, align, line } = child.style;
					if (font) ctx.font = font;
					if (fill) ctx.fillStyle = fill;
					if (align) ctx.textAlign = align;
					if (line) ctx.textBaseline = line;
					ctx.fillText(child.text, 0, 0);
				} else if (child.tileWidth) {
					const { img } = child.texture as Texture;
					const { frame, tileWidth, tileHeight } = child as TileSprite;

					ctx.drawImage(
						img,
						frame.x * tileWidth,
						frame.y * tileHeight,
						tileWidth,
						tileHeight,
						0,
						0,
						tileWidth,
						tileHeight,
					);
				} else if (child.texture) {
					ctx.drawImage(child.texture.img, 0, 0);
				}
				ctx.restore();
			}
		}

		renderRec(container);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}
