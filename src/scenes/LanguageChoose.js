import { BaseScene } from "../lib/FontsBase";
import { getTranslations } from "../services/translations";
import { EN_US, ES_AR, FR_FR } from "../enums/languages"

export class LanguageScene extends BaseScene {
    language = ES_AR;
  constructor() {
    super("ChooseLanguage");
  }

  create() {

    const width = this.game.scale.width;
    const height = this.game.scale.height;

    this.initAnimations();

    // Añadimos Texto Cartelera
    const textTickets = this.createText(
      width * 0.5,
      height * 0.3,
      "Mufasa"
    ).setOrigin(0.5);

    // Añadimos las imágenes de ambas banderas
    const ARGLanguage = this.add
      .sprite(width * 0.3, height * 0.67, "Argentina")
      .setDepth(10)
      .setOrigin(0.5)
      .setScale(1.24);
    ARGLanguage.setInteractive();

    ARGLanguage.on("pointerover", () => {
      ARGLanguage.anims.play("Crush-ARG", true);
      // Cambia el tamaño de la imagen al pasar el mouse
      ARGLanguage.setScale(1.46);
    });

    ARGLanguage.on("pointerout", () => {
      ARGLanguage.anims.play("Idle-ARG", true);
      // Cambia el tamaño de la imagen al pasar el mouse
      ARGLanguage.setScale(1.24);
    });

    ARGLanguage.on("pointerdown", () => {
      ARGLanguage.setScale(1.6);

      getTranslations(ES_AR);

      ARGLanguage.anims.play("Crush-ARG", true);
      this.time.addEvent({
        delay: 100,
        loop: true,
        callback: () => {
          this.gotoMainScene(); //Llama la escena Main
        },
      });
    });

    const USALanguage = this.add
      .sprite(width * 0.7, height * 0.67, "EstadosUnidos")
      .setDepth(10)
      .setOrigin(0.5)
      .setScale(1.24);
    USALanguage.setInteractive();

    USALanguage.on("pointerover", () => {
      USALanguage.anims.play("Crush-EEUU", true);
      // Cambia el tamaño de la imagen al pasar el mouse
      USALanguage.setScale(1.46);
    });

    USALanguage.on("pointerout", () => {
      USALanguage.anims.play("Idle-EEUU", true);
      // Cambia el tamaño de la imagen al pasar el mouse
      USALanguage.setScale(1.24);
    });

    USALanguage.on("pointerdown", () => {
      USALanguage.setScale(1.6);
      
      getTranslations(EN_US);

      USALanguage.anims.play("Crush-EEUU", true);
      this.time.addEvent({
        delay: 100,
        loop: true,
        callback: () => {
          this.gotoMainScene(); //Llama la escena Main
        },
      });
    });
  }

  initAnimations() {
    this.anims.create({
      key: "Crush-ARG",
      frames: this.anims.generateFrameNumbers("CUT-ARG", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: false, // La animación se repite indefinidamente
    });

    this.anims.create({
      key: "Crush-EEUU",
      frames: this.anims.generateFrameNumbers("CUT-EEUU", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: false, // La animación se repite indefinidamente
    });

    this.anims.create({
      key: "Idle-ARG",
      frames: this.anims.generateFrameNumbers("IDLE-ARG", {
        start: 0,
        end: 0,
      }),
      frameRate: 9,
      repeat: false, // La animación se repite indefinidamente
    });

    this.anims.create({
      key: "Idle-EEUU",
      frames: this.anims.generateFrameNumbers("IDLE-EEUU", {
        start: 0,
        end: 0,
      }),
      frameRate: 2,
      repeat: false, // La animación se repite indefinidamente
    });
  }

  gotoMainScene() {
    this.time.delayedCall(200, () => {
      this.scene.start("MainMenu");
    });
  }
}
