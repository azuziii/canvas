import Sprite from "./Sprite";

export default class Container {
	children: any[] = [];

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
				child.update(dt, t, this);
			}
			return child.dead ? false : true;
		});
	}

	map(fn: (...args: any[]) => any): any[] {
		return this.children.map(fn);
	}
}
