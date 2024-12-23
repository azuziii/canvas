import Container from "../Container.js";
import Texture from "../Texture.js";
import TileSprite from "../TileSprite.js";

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
		if (!container.visible) {
			return;
		}

		const { ctx } = this;

		function renderRec(container: Container) {
			for (let child of container.children) {
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
				} else if (child.texture) {
					const { img } = child.texture as Texture;

					if (child.tileWidth) {
						console.log(child);
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
					} else {
						ctx.drawImage(img, 0, 0);
					}
				}

				if (child.children) {
					renderRec(child as Container);
				}
				ctx.restore();
			}
		}

		if (clear) {
			this.clear();
		}
		renderRec(container);
	}

	clear() {
		this.ctx.clearRect(0, 0, this.width, this.height);
	}
}
