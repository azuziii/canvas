import {
	Texture,
	Sprite,
	Game,
	Container,
	MouseControls,
	TileSprite,
	KeyControls,
} from "../lib/index.js";
import { distance, rand, randf, randOneIn } from "../lib/utils/math.js";
import Player from "./entities/player.js";

const game = new Game(640, 320);
const { scene, width, height } = game;

const controls = new KeyControls();

for (let i = 0; i < 30; i++) {
	const squizz = new Player(controls);
	squizz.pos = {
		x: Math.random() * width,
		y: Math.random() * height,
	};
	scene.add(squizz);
}

game.run();
