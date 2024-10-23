import { Scene } from "phaser";
import { getPhrase } from "../services/translations";

export class PauseMenu extends Scene {
  constructor() {
    super({ key: "PauseMenu" });
    this.lastKeyPressTime = 0;
  }

  create(data) {
    let width = this.game.scale.width;
    let height = this.game.scale.height;
    this.mainScene = data.mainScene;

    // Fondo de pausa
    this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height,
        0x000000,
        0.5
      )
      .setDepth(100);

    // Agregar texto al menú de pausa
    this.add
      .text(width / 2, height * 0.3, `${getPhrase("PausaMensaje")}`, {
        fontSize: "45px",
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
      })
      .setOrigin(0.5)
      .setDepth(101);

    // Agregar un botón para volver al menú principal
    const mainMenuButton = this.add
      .text(width / 2, height * 0.5, `${getPhrase("VolverAlMenu")}`, {
        fontSize: "25px",
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
      })
      .setOrigin(0.5)
      .setDepth(101)
      .setInteractive()
      .on("pointerdown", () => {
        this.mainScene.scene.stop("recolectScene");
        this.mainScene.scene.stop("Hud");
        this.mainScene.scene.stop("hudShop");
        this.mainScene.scene.stop();
        this.mainScene.scene.start("MainMenu");
        this.scene.stop();
      });

    mainMenuButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      mainMenuButton.setScale(1.07);
    });

    mainMenuButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      mainMenuButton.setScale(1);
    });

    this.add
      .text(width / 2, height * 0.6, `${getPhrase("ReanudarJuego")} Esc`, {
        fontSize: "25px",
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
      })
      .setOrigin(0.5)
      .setDepth(101);

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      this.isPaused = false;
      if (currentTime - this.lastKeyPressTime > 250) {
        this.lastKeyPressTime = currentTime;
        this.mainScene.scene.resume();
        this.scene.resume("recolectScene");
        // Reanudar la música
        const recolectScene = this.mainScene.scene.get("recolectScene");
        if (recolectScene.backgroundMusic) {
          recolectScene.backgroundMusic.resume();
        }
        this.scene.resume("battleScene");
        this.scene.stop("PauseMenu");
        console.log("Reanude Game");
      }
    });
  }
}
