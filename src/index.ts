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
		ship.update = ({ delta, width, height }) => {
			const { pos } = ship;
			pos.x += this.controls.x * delta * 200;
			pos.y += this.controls.y * delta * 200;

			if (pos.x < 0) pos.x = 0;
			if (pos.x > width - ship.width) pos.x = width - ship.width;
			if (pos.y < 0) pos.y = 0;
			if (pos.y > height - ship.height) pos.y = height - ship.height;
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

		this.scene.add(this.score);

		this.scene.add(this.bullets);
		this.scene.add(ship);
		this.scene.add(this.enemies);

		requestAnimationFrame(this.loop.bind(this));
	}

	start() {}

	fireBullet(x: number, y: number) {
		const bullet = new Sprite(this.textures.bullet);
		bullet.pos.x = x;
		bullet.pos.y = y;

		bullet.update = function ({ delta, width }) {
			this.pos.x += 400 * delta;
			console.log(bullet.pos.x);
			if (this.pos.x >= width + this.width / 2) {
				this.dead = true;
			}
		};

		this.bullets.add(bullet);
	}

	spawnEnemy(speed: number) {
		const enemy = new Sprite(this.textures.enemy);
		enemy.pos.x = this.width + enemy.width;
		enemy.pos.y = Math.random() * (this.height - enemy.height);
		enemy.update = ({ delta, width }) => {
			enemy.pos.x += delta * speed * 5;

			if (enemy.pos.x < 0) {
				if (!this.gameOver) this.doGameOver();
				enemy.dead = true;
			}
		};
		this.enemies.add(enemy);
	}

	doGameOver() {
		this.gameOver = true;
		const gameOverText = new Text("Game Over", {
			font: "50px sans-serif",
			fill: "#8b8994",
			align: "center",
			line: "top",
		});

		gameOverText.pos.x = this.width / 2;
		gameOverText.pos.y = 120;

		const countdownText = new Text("Starting in 5", {
			font: "50px sans-serif",
			fill: "#8b8994",
			align: "center",
			line: "top",
		});

		countdownText.pos.x = this.width / 2;
		countdownText.pos.y = 200;

		let i = 4;

		let int = setInterval(() => {
			if (i == 0) {
				clearInterval(int);
				this.scene.remove(countdownText);
				this.scene.remove(gameOverText);
				this.gameOver = false;
			}

			countdownText.text = `Starting in ${i}`;
			i--;
		}, 1000);

		this.scene.add(countdownText);
		this.scene.add(gameOverText);
		this.scene.remove(this.player);
		this.scene.remove(this.bullets);
		this.scene.remove(this.enemies);
	}

	rand(x: number, floor: boolean = true) {
		return floor ? Math.floor(Math.random() * x) : Math.random() * x;
	}

	loop(ms: any) {
		const t = ms / 1000;
		this.delta = t - this.last;
		this.last = t;
		this.score.text = `Score: ${this.scoreAmount}`;

		if (!this.gameOver && this.controls.action && t - this.lastshot > 0.15) {
			this.lastshot = t;
			this.fireBullet(
				this.player.pos.x + this.player.width,
				this.player.pos.y + 10,
			);
		}

		if (!this.gameOver && t - this.lastSpawn > this.spawnSpeed) {
			this.lastSpawn = t;
			this.spawnEnemy(-50 - Math.random() * Math.random() * 100);
			this.spawnSpeed =
				this.spawnSpeed < 0.05 ? 0.6 : this.spawnSpeed * 0.97 + 0.001;
		}

		this.enemies.children.forEach((enemy: Sprite) => {
			this.bullets.children.forEach((bullet: Sprite) => {
				const dx = enemy.pos.x + 16 - (bullet.pos.x + 8);
				const dy = enemy.pos.y + 16 - (bullet.pos.y + 8);
				if (Math.sqrt(dx * dx + dy * dy) < 24) {
					enemy.dead = true;
					bullet.dead = true;
					this.scoreAmount += 1;
				}
			});
		});

		this.enemies.children = this.enemies.children.filter(
			(x: Sprite) => !x.dead,
		);

		this.bullets.children = this.bullets.children.filter(
			(x: Sprite) => !x.dead,
		);

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
