import { KeyControls, Texture, TileSprite } from "../../lib/index.js";
import { randf } from "../../lib/utils/math.js";

export default class Player extends TileSprite {
	public speed = 0.15;
	public dir = {
		x: 1,
		y: 0,
	};

	constructor(public controls: KeyControls) {
		super(new Texture("res/images/player-walk.png"), 32, 32);
		this.anchor = {
			x: -16,
			y: -16,
		};

		const { anims } = this;

		anims.add(
			"walk",
			[0, 1, 2, 3].map((x) => ({ x, y: 0 })),
			0.07 * this.speed,
		);

		anims.add(
			"idle",
			[
				{ x: 0, y: 0 },
				{ x: 4, y: 0 },
				{ x: 4, y: 1 },
				{ x: 4, y: 0 },
			],
			0.15 * this.speed,
		);

		anims.play("walk");
	}

	override update(dt: number) {
		super.update(dt);

		const { pos, scale, speed, anchor, anims, controls } = this;
		const { x, y } = controls;

		pos.x += x * speed * dt * 100;
		pos.y += y * speed * dt * 100;

		if (x && x !== this.dir.x) {
			this.dir.x = x;
			this.dir.y = 0;
			pos.y = Math.round(pos.y / 32) * 32;
			// anims.play("walk");
			// scale.x = Math.sign(x);
			// anchor.x = scale.x > 0 ? -16 : 16;
		} else if (y && y !== this.dir.y) {
			this.dir.x = 0;
			this.dir.y = y;
			pos.x = Math.round(pos.x / 32) * 32;
			// anims.play("walk");
			// scale.y = Math.sign(y);
			// anchor.y = scale.y > 0 ? -16 : 16;
		}

		pos.x += this.dir.x * dt * (32 / speed);
		pos.y += this.dir.y * dt * (32 / speed);
	}
}
