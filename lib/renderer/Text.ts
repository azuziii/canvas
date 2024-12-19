interface Style {
	font?: string;
	fill?: string;
	align?: CanvasTextAlign;
	line?: CanvasTextBaseline;
}

export default class Text {
	pos = { x: 0, y: 0 };
	constructor(
		private text = "",
		private style: Style = {},
		private visible: boolean = true,
	) {}

	update({ delta }: { delta: number }) {}
}
