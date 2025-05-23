import { Scene } from "phaser";
import WebFont from "webfontloader";
import { getLanguageConfig, getTranslations } from "../services/translations";
import { Sounds } from "../load/audio";
import { SoundsCoop } from "../load/audioCoop";

export class Preloader extends Scene {
  #language;
  constructor() {
    super("Preloader");
  }

  init() {
    //  A simple progress bar. This is the outline of the bar.
    //this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    //const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    //this.load.on('progress', (progress) => {
    //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //bar.width = 4 + (460 * progress);
    //});
  }

  preload() {
    //this.load.image('logo', 'logo.png');
    this.load.glsl("crtShader", "../src/crtShaders.flag");
    console.log(this.game.renderer);

    this.load.on("complete", () => {
      if (this.cache.shader.has("crtShader")) {
        console.log("Shader loaded successfully!");
      } else {
        console.error("Failed to load shader.");
      }
    });

    // Agregar Lenguaje
    this.#language = getLanguageConfig();

    Sounds(this);
    SoundsCoop(this);

    // ChooseLanguage
    this.load.spritesheet(
      "boleteriaBackground",
      "/assets/versus/boleteria/lenguaje.png",
      {
        frameWidth: 1920,
        frameHeight: 1080,
      }
    );

    this.load.image(
      "Argentina",
      "/assets/versus/boleteria/flag-arg-simple.png"
    );
    this.load.image(
      "EstadosUnidos",
      "/assets/versus/boleteria/flag-eeuu-simple.png"
    );
    this.load.image(
      "BoletoPlay",
      "/assets/versus/boleteria/flag-play-simple.png"
    );

    this.load.spritesheet("CUT-ARG", "/assets/versus/boleteria/flag-arg.png", {
      frameWidth: 228,
      frameHeight: 92,
    });

    this.load.spritesheet(
      "CUT-EEUU",
      "/assets/versus/boleteria/flag-eeuu.png",
      {
        frameWidth: 228,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "CUT-PLAY",
      "/assets/versus/boleteria/flag-play.png",
      {
        frameWidth: 292,
        frameHeight: 76,
      }
    );

    this.load.spritesheet(
      "IDLE-ARG",
      "/assets/versus/boleteria/flag-arg-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-EEUU",
      "/assets/versus/boleteria/flag-eeuu-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-PLAY",
      "/assets/versus/boleteria/flag-play-simple.png",
      {
        frameWidth: 292,
        frameHeight: 76,
      }
    );
    // User Logo
    this.load.image("user_ico", "/assets/user-ico.png");

    //  Main Menu
    // Logojuego
    this.load.image("logoJuego", "/assets/versus/menu/logojuego.png");

    // LOGO
    this.load.image("logo", "/assets/versus/menu/logo.png");
    this.load.image(
      "menu-background",
      "/assets/versus/escenario/principal.png"
    ); // /public/assets/versus/escenario/principal.png   image.png

    // Televisión
    this.load.image("TeleImagen", "/assets/versus/menu/tv.png"); // Derrota

    // Cargar imágenes de versus para pantalla
    this.load.image("battleTV", "/assets/versus/television/TV-battle.png");
    this.load.image(
      "fireworksTV",
      "/assets/versus/television/TV-fireworks.png"
    );
    this.load.image("swordsTV", "/assets/versus/television/TV-swords.png");

    // Onomatopeyas this.load.image("", "/assets/versus/television/.png");
    this.load.image("appear", "/assets/versus/television/OYS-appear.png"); // Onomatopeyas

    this.load.image("combo1", "/assets/versus/television/OYS-combo1.png");
    this.load.image("combo2", "/assets/versus/television/OYS-combo2.png");
    this.load.image("combo3", "/assets/versus/television/OYS-combo3.png");
    this.load.image("combo4", "/assets/versus/television/OYS-combo4.png");
    this.load.image("combo5", "/assets/versus/television/OYS-combo5.png");
    this.load.image("combo6", "/assets/versus/television/OYS-combo6.png");

    this.load.image("termina", "/assets/versus/television/OYS-termina.png");

    this.load.image("battle", "/assets/versus/television/OYS-battle.png");
    this.load.image("ouch1", "/assets/versus/television/OYS-ouch1.png");
    this.load.image("ouch2", "/assets/versus/television/OYS-ouch2.png");

    this.load.image("shield1", "/assets/versus/television/OYS-shield1.png");
    this.load.image("shield2", "/assets/versus/television/OYS-shield2.png");

    this.load.image("attack1", "/assets/versus/television/OYS-attack1.png");
    this.load.image("attack2", "/assets/versus/television/OYS-attack2.png");

    // Barra Audio Master
    this.load.image("sliderHandle", "/assets/versus/menu/anillo_volumen.png"); // Derrota
    this.load.image("sliderBar", "/assets/versus/menu/barra_volumen.png"); // Daño

    // Dialogues
    this.load.json(
      "kidKornDialogues_en-US.json",
      "/data/kidKornDialogues_en-US.json"
    );
    this.load.json(
      "kidKornDialogues_es-AR.json",
      "/data/kidKornDialogues_es-AR.json"
    );
    this.load.json(
      "kidKornDialogues_fr-FR.json",
      "/data/kidKornDialogues_fr-FR.json"
    );

    //   Opacidad
    this.load.image("l-opacidad", "/assets/versus/opacidad.png");
    this.load.image("l-opacidad2", "/assets/versus/opacidad2.png");

    // Bolsas
    this.load.image("logo1", "/assets/versus/menu/logo1.png");

    this.load.image("logo2", "/assets/versus/menu/logo2.png");

    this.load.image("logo3", "/assets/versus/menu/logo3.png");

    this.load.image("logo4", "/assets/versus/menu/logo4.png");

    this.load.image("logo5", "/assets/versus/menu/logo5.png");

    WebFont.load({
      google: {
        families: ["Press Start 2P"],
      },
      active: () => {
        console.log("Fuentes cargadas.");
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    getTranslations(this.#language, () =>
      this.scene.start("ChooseLanguage", { language: this.#language })
    );

    const defaultText = this.add
      .text(width * 0.5, height * 0.4, "Cargando", {
        fontSize: "25px",
        fontFamily: "'Press Start 2P'",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    let loadingText = "Cargando";
    let dotCount = 0;

    this.time.addEvent({
      delay: 220, // 1 segundo
      callback: () => {
        dotCount = (dotCount + 1) % 4; // Ciclo entre 0 y 3
        defaultText.setText(loadingText + ".".repeat(dotCount));
      },
      loop: true,
    });
  }
}
