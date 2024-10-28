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
      "../public/assets/versus/boleteria/lenguaje.png",
      {
        frameWidth: 1920,
        frameHeight: 1080,
      }
    );

    this.load.image(
      "Argentina",
      "../public/assets/versus/boleteria/flag-arg-simple.png"
    );
    this.load.image(
      "EstadosUnidos",
      "../public/assets/versus/boleteria/flag-eeuu-simple.png"
    );

    this.load.spritesheet(
      "CUT-ARG",
      "../public/assets/versus/boleteria/flag-arg.png",
      {
        frameWidth: 228,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "CUT-EEUU",
      "../public/assets/versus/boleteria/flag-eeuu.png",
      {
        frameWidth: 228,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-ARG",
      "../public/assets/versus/boleteria/flag-arg-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-EEUU",
      "../public/assets/versus/boleteria/flag-eeuu-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    //  Main Menu
    // LOGO
    this.load.image("logo", "../public/assets/versus/menu/logo.png");
    this.load.image(
      "menu-background",
      "../public/assets/versus/escenario/principal.png"
    ); // /public/assets/versus/escenario/principal.png   image.png

    // Televisión
    this.load.image("TeleImagen", "../public/assets/versus/menu/tv.png"); // Derrota

    // Onomatopeyas
    this.load.image("boom1", "../public/assets/versus/television/OYS-boom.png"); // Onomatopeyas
    this.load.image(
      "boom2",
      "../public/assets/versus/television/OYS-boom2.png"
    );
    this.load.image(
      "boom3",
      "../public/assets/versus/television/OYS-boom3.png"
    );
    this.load.image(
      "boom4",
      "../public/assets/versus/television/OYS-boom4.png"
    );
    this.load.image(
      "crash1",
      "../public/assets/versus/television/OYS-crash.png"
    );
    this.load.image(
      "crash2",
      "../public/assets/versus/television/OYS-crash2.png"
    );
    this.load.image(
      "ready1",
      "../public/assets/versus/television/OYS-getReady.png"
    );
    this.load.image(
      "ready2",
      "../public/assets/versus/television/OYS-ready.png"
    );
    this.load.image(
      "hello",
      "../public/assets/versus/television/OYS-hello.png"
    );
    this.load.image(
      "kaboom",
      "../public/assets/versus/television/OYS-kaboom.png"
    );
    this.load.image("oh", "../public/assets/versus/television/OYS-oh.png");
    this.load.image("ouch", "../public/assets/versus/television/OYS-ouch.png");
    this.load.image(
      "pfoom",
      "../public/assets/versus/television/OYS-pfoom.png"
    );
    this.load.image(
      "whack",
      "../public/assets/versus/television/OYS-whack.png"
    );

    // Barra Audio Master
    this.load.image(
      "sliderHandle",
      "../public/assets/versus/menu/anillo_volumen.png"
    ); // Derrota
    this.load.image(
      "sliderBar",
      "../public/assets/versus/menu/barra_volumen.png"
    ); // Daño
   
    // Dialogues
    this.load.json(
      "kidKornDialogues_en-US.json",
      "../public/data/kidKornDialogues_en-US.json"
    );
    this.load.json(
      "kidKornDialogues_es-AR.json",
      "../public/data/kidKornDialogues_es-AR.json"
    );
    this.load.json(
      "kidKornDialogues_fr-FR.json",
      "../public/data/kidKornDialogues_fr-FR.json"
    );

    //   Opacidad
    this.load.image("l-opacidad", "../public/assets/versus/opacidad.png");


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
