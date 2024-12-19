import {
	KeyControls,
	MouseControls,
	Container,
	Text,
	CanvasRenderer,
	Texture,
	Sprite,
} from "../lib/index.js";

class Game {
	scene = new Container();
	bullets = new Container();
	enemies = new Container();

	mouse!: MouseControls;
	controls = new KeyControls();
	renderer!: CanvasRenderer;

	ctx!: CanvasRenderingContext2D;
	width = 640;
	height = 300;
	delta = 0;
	last = 0;
	speed = 64;
	p1 = 0;
	p2 = 0;
	color = 0;
	lastshot = 0;
	lastSpawn = 0;
	spawnSpeed = 1;
	player!: Sprite;

	textures!: { [s: string]: Texture };

	constructor() {
		this.init();
	}

	init() {
		this.renderer = new CanvasRenderer(this.width, this.height);
		this.mouse = new MouseControls(this.renderer.view);
		document.getElementById("board")!.appendChild(this.renderer.view);

		this.textures = {
			background: new Texture("res/images/bg.png"),
			spaceship: new Texture("res/images/spaceship.png"),
			bullet: new Texture("res/images/bullet.png"),
			enemy: new Texture("res/images/baddie.png"),
		};

		const ship = new Sprite(this.textures.spaceship);
		this.player = ship;
		ship.pos.x = 120;
		ship.pos.y = this.height / 2 - 16;
		ship.update = ({ delta, width, height }) => {
			const { pos } = ship;
			pos.x += this.controls.x * delta * 200;
			pos.y += this.controls.y * delta * 200;

			if (pos.x < 0) pos.x = 0;
			if (pos.x > width - ship.width) pos.x = width - ship.width;
			if (pos.y < 0) pos.y = 0;
			if (pos.y > height - ship.height) pos.y = height - ship.height;
		};

		this.scene.add(new Sprite(this.textures.background));
		this.scene.add(this.bullets);
		this.scene.add(ship);
		this.scene.add(this.enemies);

		requestAnimationFrame(this.loop.bind(this));
	}

	fireBullet(x: number, y: number) {
		const bullet = new Sprite(this.textures.bullet);
		bullet.pos.x = x;
		bullet.pos.y = y;

		bullet.update = function ({ delta, width }) {
			this.pos.x += 400 * delta;
		};

		this.bullets.add(bullet);
	}

	spawnEnemy(speed: number) {
		const enemy = new Sprite(this.textures.enemy);
		enemy.pos.x = this.width + enemy.width;
		enemy.pos.y = Math.random() * (this.height - enemy.height);
		enemy.update = function ({ delta, width }) {
			enemy.pos.x += delta * speed;
		};
		this.enemies.add(enemy);
	}

	rand(x: number, floor: boolean = true) {
		return floor ? Math.floor(Math.random() * x) : Math.random() * x;
	}

	loop(ms: any) {
		const t = ms / 1000;
		this.delta = t - this.last;
		this.last = t;

		if (this.controls.action && t - this.lastshot > 0.15) {
			this.lastshot = t;
			this.fireBullet(
				this.player.pos.x + this.player.width,
				this.player.pos.y + 10,
			);
		}

		if (t - this.lastSpawn > this.spawnSpeed) {
			this.lastSpawn = t;
			this.spawnEnemy(-50 - Math.random() * Math.random() * 100);
			this.spawnSpeed =
				this.spawnSpeed < 0.05 ? 0.6 : this.spawnSpeed * 0.97 + 0.001;
		}

		this.bullets.children = this.bullets.children.filter((bullet) => {
			return bullet.pos.x < this.width + bullet.width / 2;
		});

		this.enemies.children = this.enemies.children.filter((enemy) => {
			return enemy.pos.x + enemy.width > 0;
		});

		this.scene.update({
			delta: this.delta,
			width: this.width,
			height: this.height,
		});
		this.renderer.render(this.scene);

		requestAnimationFrame(this.loop.bind(this));
	}
}

new Game();
