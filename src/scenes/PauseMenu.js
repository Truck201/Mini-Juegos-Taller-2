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
    this.sceneShop = data.sceneShop;
    this.sceneBattle = data.sceneBattle;
    this.sceneCoop = data.cooperativeScene;

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
      .text(width / 2, height * 0.3, `${getPhrase("Pausa")}`, {
        // key= PausaMensaje
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
      .text(width / 2, height * 0.5, `${getPhrase("Volver al menú")}`, {
        // key = VolverAlMenu
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
        if (this.mainScene) {
          this.mainScene.scene.stop();
          this.mainScene.scene.stop("Hud");
        }
        if (this.sceneShop) {
          this.sceneShop.scene.stop();
          this.sceneShop.scene.stop("hudShop");
        }
        if (this.sceneBattle) {
          this.sceneBattle.scene.stop();
        }
        if (this.sceneCoop) {
          this.sceneCoop.scene.stop();
          this.sceneCoop.scene.stop("hudCoop");
        }

        this.scene.start("MainMenu");
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
      .text(width / 2, height * 0.6, `${getPhrase("Reanudar el juego")} Esc`, {
        // key = ReanudarJuego
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

        // Reanudar Recolect Scene
        if (this.mainScene) {
          const recolectScene = this.mainScene.scene.get("recolectScene");
          this.mainScene.scene.resume();
          if (recolectScene.backgroundMusic) {
            recolectScene.backgroundMusic.resume();
          }
        }

        // Reanudar Shop Scene
        if (this.sceneShop) {
          const shopScene = this.sceneShop.scene.get("Shop");
          this.sceneShop.scene.resume();
          if (shopScene.music) {
            shopScene.music.resume();
          }
        }

        // Reanudar Battle Scene
        if (this.sceneBattle) {
          const battleScene = this.sceneBattle.scene.get("battleScene");
          this.sceneBattle.scene.resume();
          if (battleScene.music1) {
            battleScene.music1.resume();
          }
        }

        //Reanudar GameCoop
        if (this.sceneCoop) {
          const sceneCoop = this.sceneCoop.scene.get("GameCoop");
          this.sceneCoop.scene.resume();
          if (sceneCoop.backgroundMusic) {
            sceneCoop.backgroundMusic.resume();
            sceneCoop.lastSeconds.resume();
          }
        }

        this.scene.stop("PauseMenu");
        console.log("Reanude Game");
      }
    });
  }
}
