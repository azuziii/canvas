export default class Texture {
	img: HTMLImageElement;
	constructor(private url: string) {
		this.img = new Image();
		this.img.src = this.url;
	}
}
