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
		for (let child of this.children) {
			if (child.update) {
				child.update(dt);
			}
		}
	}
}
