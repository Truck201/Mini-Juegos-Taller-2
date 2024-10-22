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
      lineSpacing: 9, // Espaciado entre líneas
      letterSpacing: 3, // Espaciado entre letras
      maxLines: 4,
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 5.7,
        offsetY: 5.7,
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
    } else if (text.length <= 12) {
      fontSize = "26px"; // Para palabras medianas
    } else {
      fontSize = "19.5px"; // Para palabras largas
    }

    // Crea el texto con las configuraciones
    const createdText = this.add.text(
      x,
      y,
      text,
      this.getGlobalTextStyle(fontSize)
    );

    // Establece el relleno alrededor del texto
    createdText.setPadding(12, 12, 12, 12); // (top, right, bottom, left)

    return createdText;
  }

  createTextToScene(scene, x, y, text) {
    let fontSize;
    if (text.length <= 2) {
      fontSize = "30px"; // Para palabras cortas
    } else if (text.length <= 4) {
      fontSize = "48px"; // Para palabras cortas
    } else if (text.length <= 8) {
      fontSize = "30px"; // Para palabras medianas
    } else if (text.length <= 12) {
      fontSize = "26px"; // Para palabras medianas
    } else {
      fontSize = "19.5px"; // Para palabras largas
    }

    // Crea el texto con las configuraciones
    const createdText = scene.add.text(
      x,
      y,
      text,
      this.getGlobalTextStyle(fontSize)
    );

    // Establece el relleno alrededor del texto
    createdText.setPadding(12, 12, 12, 12); // (top, right, bottom, left)

    return createdText;
  }
}
