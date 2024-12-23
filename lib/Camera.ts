import Container from "./Container.js";
import Sprite from "./Sprite.js";
import TileSprite from "./TileSprite.js";
import { clamp } from "./utils/math.js";

export default class Camera extends Container {
	private width: number;
	private height: number;
	private offset!: { x: number; y: number };

	constructor(
		public subject: any,
		public viewport: { width: number; height: number },
		public worldSize = viewport,
	) {
		super();
		this.width = viewport.width;
		this.height = viewport.height;
		this.setSubject(subject);
	}

	setSubject(e: Sprite | TileSprite) {
		this.subject = e ? e.pos || e : this.pos;
		this.offset = { x: 0, y: 0 };

		if (e && e.width) {
			this.offset.x += e.width / 2;
			this.offset.y += e.height / 2;
		}

		if (e && e.anchor) {
			this.offset.x -= e.anchor.x;
			this.offset.y -= e.anchor.y;
		}
		this.focus();
	}

	focus() {
		const { width, height, worldSize, subject, offset } = this;

		const centeredX = subject.x + offset.x - width / 2;
		const maxX = worldSize.width - width;
		const x = -clamp(centeredX, 0, maxX);

		const centeredY = subject.y + offset.y - height / 2;
		const maxY = worldSize.height - height;
		const y = -clamp(centeredY, 0, maxY);

		this.pos.x = x;
		this.pos.y = y;
	}

	override update(dt: number, t: number) {
		super.update(dt, t);
		if (this.subject) {
			this.focus();
		}
	}
}
