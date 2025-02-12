type KeyboardKey =
	| "Backspace"
	| "Tab"
	| "Enter"
	| "Shift"
	| "Control"
	| "Escape"
	| "Space"
	| "ArrowLeft"
	| "ArrowUp"
	| "ArrowRight"
	| "ArrowDown"
	| "0"
	| "1"
	| "2"
	| "3"
	| "4"
	| "5"
	| "6"
	| "7"
	| "8"
	| "9"
	| "a"
	| "b"
	| "c"
	| "d"
	| "e"
	| "f"
	| "g"
	| "h"
	| "i"
	| "j"
	| "k"
	| "l"
	| "m"
	| "n"
	| "o"
	| "p"
	| "q"
	| "r"
	| "s"
	| "t"
	| "u"
	| "v"
	| "w"
	| "x"
	| "y"
	| "z";

export default class KeyControls {
	keys: { [s: string]: any };
	constructor() {
		this.keys = {};
		this.init();
	}

	init() {
		this.attachEvents();
	}

	attachEvents() {
		document.addEventListener("keydown", (e: KeyboardEvent) => {
			if (["ArrowUp", "ArrowRight", "ArrowDown", "ArrowLeft"].includes(e.code))
				e.preventDefault();
			this.keys[e.code] = true;
		});

		document.addEventListener("keyup", (e: KeyboardEvent) => {
			// this.keys[e.code] = false;
			delete this.keys[e.code];
		});
	}

	key(key: KeyboardKey) {
		return this.keys[key];
	}

	get action() {
		return this.key("Space");
	}

	get x() {
		if (this.key("a") || this.key("ArrowLeft")) {
			return -1;
		}

		if (this.key("d") || this.key("ArrowRight")) {
			return 1;
		}

		return 0;
	}

	get y() {
		if (this.key("s") || this.key("ArrowDown")) {
			return 1;
		}

		if (this.key("w") || this.key("ArrowUp")) {
			return -1;
		}
		return 0;
	}

	reset() {
		for (let key in this.keys) {
			delete this.keys[key];
		}
	}
}
