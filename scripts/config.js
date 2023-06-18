export default class Config {

	constructor() {
		this.step = 0;
		this.maxStep = 6;
		this.sizeCell = 16;
		this.sizeBerry = this.sizeCell / 4;

		this.canvasWidth = 1200;
		this.canvasHeight = 800;

		this.right = new Audio(); // Создаём новый элемент Audio
		this.right.src = '././rightanswer.mp3'; // Указываем путь к звуку "клика"

		this.wrong = new Audio(); // Создаём новый элемент Audio
		this.wrong.src = '././wronganswer.mp3'; // Указываем путь к звуку "клика"
	}

}