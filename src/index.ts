import {
	Texture,
	Sprite,
	Game,
	Container,
	MouseControls,
	TileSprite,
	KeyControls,
	TileMap,
} from "../lib/index.js";
import { clamp, distance, rand, randf, randOneIn } from "../lib/utils/math.js";
import Player from "./entities/player.js";
import Level from "./Level.js";

const controls = new KeyControls();

const game = new Game(640, 320);
const { scene, width, height } = game;

const map = new Level(width, height);
const player = new Player(controls);

scene.add(map);
scene.add(player);

game.run(() => {
	const { pos } = player;
	const {
		bounds: { top, right, bottom, left },
	} = map;

	player.pos.x = clamp(pos.x, left, right);
	player.pos.y = clamp(pos.y, top, bottom);

	const g = map.checkGround(player.pos);
});
