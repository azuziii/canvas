interface Style {
	font?: string;
	fill?: string;
	align?: CanvasTextAlign;
	line?: CanvasTextBaseline;
}

export default class Text {
	constructor(
		public text = "",
		public style: Style = {},
		public visible: boolean = true,
		public pos = { x: 0, y: 0 },
	) {}

	update(dt: number) {}
}
