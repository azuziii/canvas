import {
	Texture,
	Sprite,
	Game,
	Container,
	MouseControls,
	TileSprite,
} from "../lib/index.js";
import { distance, rand, randf, randOneIn } from "../lib/utils/math.js";
import Player from "./entities/player.js";

const game = new Game(640, 320);
const { scene, width, height, mouse } = game;
const { isPressed, pos } = mouse;

const balls = new Container();

for (let i = 0; i < 50; i++) {
	const p: Sprite = balls.add(new Player());
	p.pos.x = rand(width);
	p.pos.y = rand(height);
}

scene.add(balls);
game.run((dt: number, t: number) => {
	balls.map((b: Player) => {
		if (b.pos.x > width) {
			b.pos.x = -32;
			b.speed *= 1.1;
		}

		if (mouse.isPressed && distance(mouse.pos, b.pos) < 16) {
			if (b.speed > 0) {
				b.speed = 0;
			} else {
				b.dead = true;
			}
		}
	});

	mouse.update();
});
