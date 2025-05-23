import { BaseScene } from "../lib/FontsBase";
import { ES_AR, EN_US } from "../enums/languages";
import { getTranslations } from "../services/translations";
import { initAnimations } from "../anims/flags";

export class LanguageScene extends BaseScene {
  constructor() {
    super("ChooseLanguage");
  }

  create() {
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    this.BreakTicket = this.sound.add("breakTicket", { volume: 0.09 });
    this.SelectTicket = this.sound.add("selectFlag", { volume: 0.12 });
    this.selector1 = this.sound.add("hooverSelection1", { volume: 0.09 });
    this.selector2 = this.sound.add("hooverSelection2", { volume: 0.09 });

    initAnimations(this);

    const background = this.add.sprite(
      width * 0.5,
      height * 0.6,
      "boleteriaBackground"
    );
    background.anims.play("Idle-Boleteria", true);

    let isPlayingAnimationPlay = false;
    // Añadimos Bandera unica
    const playGame = this.add
      .sprite(width * 0.5 + 8, height * 0.78, "BoletoPlay")
      .setDepth(10)
      .setOrigin(0.5)
      .setScale(1.24);
    playGame.setInteractive();

    playGame.on("pointerover", () => {
      if (!isPlayingAnimationPlay) {
        isPlayingAnimationPlay = true;
        playGame.anims.play("Crush-Play", true);
        // Cambia el tamaño de la imagen al pasar el mouse
        this.selector2.play();

        this.time.delayedCall(470, () => {
          this.BreakTicket.play();
        });

        this.time.delayedCall(1000, () => {
          playGame.anims.play("Idle-Play", true);
          playGame.setScale(1.24);
          isPlayingAnimationPlay = false;
        });

        playGame.setScale(1.46);
      }
    });

    playGame.on("pointerout", () => {
      playGame.anims.play("Idle-Play", true);
      // Cambia el tamaño de la imagen al pasar el mouse
      playGame.setScale(1.24);
    });

    playGame.on("pointerdown", () => {
      playGame.setScale(1.6);
      this.SelectTicket.play();
      // this.BreakTicket.play();
      getTranslations(ES_AR, () => {
        playGame.anims.play("Crush-Play", true);
        this.time.addEvent({
          delay: 120,
          loop: true,
          callback: () => {
            this.gotoMainScene(ES_AR); //Llama la escena Main
          },
        });
      });
    });

    // let isPlayingAnimationARG = false; // Flag para controlar animación

    // Añadimos las imágenes de ambas banderas
    // const ARGLanguage = this.add
    //   .sprite(width * 0.3, height * 0.78, "Argentina")
    //   .setDepth(10)
    //   .setOrigin(0.5)
    //   .setScale(1.24);
    // ARGLanguage.setInteractive();

    // ARGLanguage.on("pointerover", () => {
    //   if (!isPlayingAnimationARG) {
    //     isPlayingAnimationARG = true;
    //     ARGLanguage.anims.play("Crush-ARG", true);
    //     // Cambia el tamaño de la imagen al pasar el mouse
    //     this.selector2.play();

    //     this.time.delayedCall(470, () => {
    //       this.BreakTicket.play();
    //     });

    //     this.time.delayedCall(1000, () => {
    //       ARGLanguage.anims.play("Idle-ARG", true);
    //       ARGLanguage.setScale(1.24);
    //       isPlayingAnimationARG = false;
    //     });

    //     ARGLanguage.setScale(1.46);
    //   }
    // });

    // ARGLanguage.on("pointerout", () => {
    //   ARGLanguage.anims.play("Idle-ARG", true);
    //   // Cambia el tamaño de la imagen al pasar el mouse
    //   ARGLanguage.setScale(1.24);
    // });

    // ARGLanguage.on("pointerdown", () => {
    //   ARGLanguage.setScale(1.6);
    //   this.SelectTicket.play();
    //   // this.BreakTicket.play();
    //   getTranslations(ES_AR, () => {
    //     ARGLanguage.anims.play("Crush-ARG", true);
    //     this.time.addEvent({
    //       delay: 120,
    //       loop: true,
    //       callback: () => {
    //         this.gotoMainScene(ES_AR); //Llama la escena Main
    //       },
    //     });
    //   });
    // });

    // const USALanguage = this.add
    //   .sprite(width * 0.7, height * 0.78, "EstadosUnidos")
    //   .setDepth(10)
    //   .setOrigin(0.5)
    //   .setScale(1.24);
    // USALanguage.setInteractive();

    // let isPlayingAnimationUSA = false; // Flag para controlar animación de la bandera USA

    // USALanguage.on("pointerover", () => {
    //   if (!isPlayingAnimationUSA) {
    //     isPlayingAnimationUSA = true;
    //     USALanguage.anims.play("Crush-EEUU", true);
    //     USALanguage.setScale(1.46);
    //     this.selector1.play();

    //     this.time.delayedCall(470, () => {
    //       this.BreakTicket.play();
    //     });

    //     this.time.delayedCall(1000, () => {
    //       USALanguage.anims.play("Idle-EEUU", true);
    //       USALanguage.setScale(1.24);
    //       isPlayingAnimationUSA = false; // Permitir que vuelva a reproducirse la animación
    //     });
    //   }
    // });

    // USALanguage.on("pointerout", () => {
    //   USALanguage.anims.play("Idle-EEUU", true);

    //   // Cambia el tamaño de la imagen al pasar el mouse
    //   USALanguage.setScale(1.24);
    // });

    // USALanguage.on("pointerdown", () => {
    //   USALanguage.setScale(1.6);
    //   this.SelectTicket.play();
    //   // this.BreakTicket.play();
    //   getTranslations(EN_US, () => {
    //     USALanguage.anims.play("Crush-EEUU", true);
    //     this.time.addEvent({
    //       delay: 120,
    //       loop: true,
    //       callback: () => {
    //         this.gotoMainScene(EN_US); //Llama la escena Main
    //       },
    //     });
    //   });
    // });
  }

  gotoMainScene(lang) {
    const savedEmail =
      localStorage.getItem("userEmail") || "sin_email@ejemplo.com";
    this.time.delayedCall(200, () => {
      this.scene.start("MainMenu", {
        language: lang,
        email: savedEmail,
      });
    });
  }
}
