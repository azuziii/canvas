import Sprite from "./Sprite";

export default class Container {
	children: any[] = [];
	public pos = {
		x: 0,
		y: 0,
	};
	public visible = true;

	constructor() {}

	add(child: any) {
		this.children.push(child);
		return child;
	}

	remove(child: any) {
		this.children = this.children.filter((c) => c !== child);
		return child;
	}

	update(dt: number, t: number) {
		this.children = this.children.filter((child) => {
			if (child.update) {
				child.update(dt, t);
			}
			return child.dead ? false : true;
		});
	}

	map(fn: (...args: any[]) => any): any[] {
		return this.children.map(fn);
	}
}
