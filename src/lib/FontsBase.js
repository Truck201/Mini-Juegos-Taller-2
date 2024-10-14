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
        offsetX: 7,
        offsetY: 7,
      },
    };
  }

  createText(x, y, text) {
    let fontSize;
    if (text.length <= 2) {
      fontSize = "30px"; // Para palabras cortas
    } else if (text.length <= 4) {
      fontSize = "48px"; // Para palabras cortas
    } else if (text.length <= 8) {
      fontSize = "30px"; // Para palabras medianas
    } else {
      fontSize = "19.5px"; // Para palabras largas
    }
    return this.add.text(x, y, text, this.getGlobalTextStyle(fontSize));
  }
}
