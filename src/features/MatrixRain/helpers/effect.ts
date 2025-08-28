import Symbol from "./symbol";

export default class Effect {
  private canvasWidth: number;
  private canvasHeight: number;
  private fontSize: number = 17;
  private columns: number;
  public symbols: Symbol[] = [];

  constructor(canvasWidth: number, canvasHeight: number) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.columns = canvasWidth / this.fontSize;
    this.initialize();
  }

  private initialize() {
    for (let i = 0; i < this.columns; i++) {
      this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
    }
  }

  resize(width: number, height: number) {
    this.canvasWidth = width;
    this.canvasHeight = height;
    this.columns = this.canvasWidth / this.fontSize;
    this.symbols = [];
    this.initialize();
  }
}
