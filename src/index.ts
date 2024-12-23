import { Game, KeyControls, Camera } from "../lib/index.js";
import { clamp } from "../lib/utils/math.js";
import Player from "./entities/player.js";
import Level from "./Level.js";

const controls = new KeyControls();

const game = new Game(640, 480);
const { scene, width, height } = game;

const map = new Level(width, height);
const player = new Player(controls);
player.pos = {
	x: map.width / 2,
	y: map.height / 2,
};

const camera = new Camera(
	player,
	{ width, height },
	{ width: map.width, height: map.height },
);

// scene.add(camera);
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
