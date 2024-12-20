import {
	KeyControls,
	MouseControls,
	Container,
	Text,
	CanvasRenderer,
	Texture,
	Sprite,
} from "../lib/index.js";

class aaaaaaaaaa {
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
	score!: Text;
	scoreAmount = 0;
	gameOver = false;
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

		this.scene.add(new Sprite(this.textures.background));

		const ship = new Sprite(this.textures.spaceship);
		this.player = ship;
		ship.pos.x = 120;
		ship.pos.y = this.height / 2 - 16;
		ship.update = (delta: number) => {
			const { pos } = ship;
			pos.x += this.controls.x * delta * 200;
			pos.y += this.controls.y * delta * 200;

			if (pos.x < 0) pos.x = 0;
			if (pos.x > this.width - ship.width) pos.x = this.width - ship.width;
			if (pos.y < 0) pos.y = 0;
			if (pos.y > this.height - ship.height) pos.y = this.height - ship.height;
		};

		this.score = new Text(`Score: ${this.score}`, {
			font: "20px sans-serif",
			fill: "#8b8994",
			align: "center",
			line: "top",
		});

		this.score.pos = {
			x: 100,
			y: 10,
		};

		this.scoreAmount += 10;

		this.scene.add(this.score);

		this.scene.add(this.bullets);
		this.scene.add(ship);
		this.scene.add(this.enemies);

		requestAnimationFrame(this.loop.bind(this));
	}

	fireBullet(x: number, y: number) {
		const bullet = new Sprite(this.textures.bullet);
		bullet.pos.x = x;
		bullet.pos.y = y;

		bullet.update = function (delta: number) {
			this.pos.x += 400 * delta;

			if (bullet.pos.x >= this.width + bullet.width / 2) {
				bullet.dead = true;
			}
		};

		this.bullets.add(bullet);
	}

	spawnEnemy(speed: number) {
		const enemy = new Sprite(this.textures.enemy);
		enemy.pos.x = this.width + enemy.width;
		enemy.pos.y = Math.random() * (this.height - enemy.height);
		enemy.update = function (delta: number) {
			enemy.pos.x += delta * speed;

			if (enemy.pos.x + enemy.width < 0) {
				enemy.dead = true;
			}
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
		console.log(this.score);
		this.score.text = `Score: ${this.scoreAmount}`;

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

		this.enemies.children.forEach((enemy: Sprite) => {
			this.bullets.children.forEach((bullet: Sprite) => {
				const dx = enemy.pos.x + 16 - (bullet.pos.x + 8);
				const dy = enemy.pos.y + 16 - (bullet.pos.y + 8);
				console.log(Math.sqrt(dx * dx + dy * dy) < 24);
				if (Math.sqrt(dx * dx + dy * dy) < 24) {
					enemy.dead = true;
					bullet.dead = true;
					this.scoreAmount += 1;
				}
			});
		});

		this.enemies.children.forEach((x: Sprite, index: number) => {
			if (x.dead) this.enemies.children.splice(index, 1);
		});

		this.bullets.children.forEach((x: Sprite, index: number) => {
			if (x.dead) this.enemies.children.splice(index, 1);
		});

		this.scene.update(this.delta, t);
		this.renderer.render(this.scene);

		requestAnimationFrame(this.loop.bind(this));
	}
}

new aaaaaaaaaa();
