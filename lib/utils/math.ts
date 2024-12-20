function rand(min: number, max?: number): number {
	return Math.floor(randf(min, max));
}

function randf(min: number = 0, max?: number): number {
	if (max == null) {
		max = min || 1;
		min = 0;
	}

	return Math.random() * (max - min) + min;
}

function randOneIn(max: number = 2): boolean {
	return rand(0, max) == 0;
}

function randOneFrom(arr: any[]): boolean {
	return arr[rand(arr.length)];
}

function radToDeg(rad: number) {
	return (180 / Math.PI) * rad;
}

function degToRad(deg: number) {
	return (Math.PI / 180) * deg;
}

function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
	const dx = a.x - b.x;
	const dy = a.y - b.y;
	return Math.sqrt(dx * dx + dy * dy);
}

export { rand, randf, randOneIn, randOneFrom, radToDeg, degToRad, distance };
