import { Scene } from "phaser";
export class BaseScene extends Scene {
  constructor(key) {
    super({ key });
  }

  getGlobalTextStyle(fontSize) {
    return {
      fontSize: fontSize,
      fontFamily: "'Press Start 2P'",
      color: "#fff",
      stroke: "black",
      strokeThickness: 4,
      maxLines: 4,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 3,
        offsetY: 3,
      },
    };
  }

  createText(x, y, text) {
    let fontSize;
    if (text.length <= 4) {
      fontSize = "50px"; // Para palabras cortas
    } else if (text.length <= 8) {
      fontSize = "30px"; // Para palabras medianas
    } else {
      fontSize = "20px"; // Para palabras largas
    }
    return this.add.text(x, y, text, this.getGlobalTextStyle(fontSize));
  }
}
