export default class Symbol {
  private characters: string =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private x: number;
  private y: number;
  private fontSize: number;
  private canvasHeight: number;
  private text: string = "";

  constructor(x: number, y: number, fontSize: number, canvasHeight: number) {
    this.x = x;
    this.y = y;
    this.fontSize = fontSize;
    this.canvasHeight = canvasHeight;
  }

  draw(context: CanvasRenderingContext2D) {
    this.text = this.characters.charAt(
      Math.floor(Math.random() * this.characters.length)
    );
    context.textAlign = "center";
    context.font = `${this.fontSize}px monospace`;
    context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
  }

  update() {
    if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
      this.y = 0;
    } else {
      this.y += 1;
    }
  }
}
