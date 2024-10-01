import { Scene } from "phaser";
import { BaseScene } from "../lib/FontsBase";

export class PauseMenu extends Scene {
  constructor() {
    super({ key: "PauseMenu" });
    this.lastKeyPressTime = 0;
  }

  create(data) {
    let width = this.game.scale.width;
    this.mainScene = data.mainScene;

    // Agregar texto al menú de pausa
    this.add.text(width / 2, 230, "Paused Game", {
      fontSize: "32px",
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
        blur: 3,
      },
    })
    .setOrigin(0.5, 0.5)
    .setDepth(10);

    // Agregar un botón para volver al menú principal
    const mainMenuButton = this.add
      .text(width / 2, 310, "Back to Main Menu", {
        fontSize: "24px",
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
          blur: 3,
        },
      })
      .setOrigin(0.5, 0.5)
      .setDepth(10)
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

    this.add.text(width / 2, 370, "Reanude Game press Esc", {
      fontSize: "24px",
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
        blur: 3,
      },
    }).setOrigin(0.5, 0.5)
    .setDepth(10);

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      this.isPaused = false;
      if (currentTime - this.lastKeyPressTime > 250) {
        this.lastKeyPressTime = currentTime;
        this.mainScene.scene.resume();
        this.scene.resume("recolectScene");
        this.scene.resume("battleScene");
        this.scene.stop("PauseMenu");
        console.log("Reanude Game");
      }
    });
  }

  
}
