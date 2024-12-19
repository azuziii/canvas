export default class Container {
	pos = {
		x: 0,
		y: 0,
	};
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

	update(options: { delta: number; width: number; height: number }) {
		for (let child of this.children) {
			if (child.update) {
				child.update(options);
			}
		}
	}
}
