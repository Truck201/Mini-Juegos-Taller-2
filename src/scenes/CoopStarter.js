import { Scene } from "phaser";
import { getLanguageConfig } from "../services/translations";
export class StartCooperative extends Scene {
  constructor() {
    super("startCoop");
    this.currentParagraph = 0;
  }

  init(data) {
    this.points = data.points || 0;
    this.game_over_timeout = data.game_over_timeout || 40;
    this.language = data.language || getLanguageConfig();
    // Cargar los archivos JSON según el idioma seleccionado
  }

  preload() {
    // Obtener el idioma
    if (this.language === "en-US") {
      this.load.json("tutorials", "/data/cooperativeTutorial_en.json");
      this.textSkipper = "Skip, press Q";
      console.log("tuto ing");
    } else if (this.language === "es-AR") {
      this.load.json("tutorials", "/data/cooperativeTutorial_es.json");
      this.textSkipper = "Saltar intro presiona Q";
      console.log("tuto esp");
    }
  }

  create() {
    let activeCoop = true;
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    // Añadimos sonidos
    this.cooperativeMusic = this.sound.add("music-v4", {
      volume: 0.09,
      loop: true,
    });

    this.select1 = this.sound.add("select", { volume: 0.09 });

    this.cooperativeMusic.play();

    // Verificar si los diálogos se cargaron correctamente
    const loadedTutorials = this.cache.json.get("tutorials");
    if (!loadedTutorials) {
      console.error("No se pudo cargar el archivo de diálogos.");
      return;
    }

    // Texto para informar sobre la opción de skip
    let skipText = this.add
      .text(width * 0.5, height * 0.95, this.textSkipper, {
        fontSize: 28,
        fontFamily: "'Press Start 2P'",
        color: "#fff",
        stroke: "black",
        strokeThickness: 4,
        lineSpacing: 9,
        letterSpacing: 3,
        maxLines: 4,
        shadow: {
          color: "#000000",
          fill: true,
          offsetX: 5.7,
          offsetY: 5.7,
        },
      })
      .setDepth(5)
      .setOrigin(0.5);

    // Convertir el contenido en un array para facilitar la navegación entre párrafos
    // Obtener los diálogos cargados
    this.tutorials = loadedTutorials.tutorial;
    this.tutorialParagraphs = [
      this.tutorials.paragraph1,
      this.tutorials.paragraph2,
      this.tutorials.paragraph3,
    ];

    // Saltar el tutorial con la tecla Q
    this.input.keyboard.on("keydown-Q", () => {
      this.cameras.main.zoomTo(0.89, 1000);
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.startGame();
      });
    });

    // Mostrar el primer párrafo
    this.showTutorialParagraph();

    // Configurar el evento de clic para avanzar entre párrafos
    this.input.on("pointerdown", this.nextParagraph, this);

    this.anims.create({
      key: "back-idle",
      frames: this.anims.generateFrameNumbers("backgroundAnimsTutorial", {
        start: 0,
        end: 3,
      }),
      frameRate: 5,
      repeat: -1,
    });

    this.backgroundTutorial = this.add
      .sprite(width * 0.5, height * 0.5, "BackgroundCoop")
      .setAlpha(0.5)
      .setDepth(0);

    this.backgroundTutorial.anims.play("back-idle", true);
  }

  showTutorialParagraph() {
    // Limpiar el texto anterior si existe
    if (this.tutorialText) {
      this.tutorialText.destroy();
    }

    // Mostrar el párrafo actual en el centro de la pantalla
    this.tutorialText = this.add
      .text(
        this.cameras.main.centerX,
        this.cameras.main.centerY,
        this.tutorialParagraphs[this.currentParagraph],
        {
          fontSize: 40,
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
        }
      )
      .setDepth(5)
      .setOrigin(0.5);
  }

  nextParagraph() {
    // Función para avanzar al siguiente párrafo
    this.currentParagraph++;
    this.select1.play();
    if (this.currentParagraph < this.tutorialParagraphs.length) {
      this.tutorialText.setText(this.tutorialParagraphs[this.currentParagraph]);
    } else {
      this.cameras.main.zoomTo(0.89, 1000);
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.startGame();
      });
    }
  }

  startGame() {
    // Iniciar el juego o la siguiente escena
    this.cooperativeMusic.stop();
    this.scene.start("GameCoop", { language: this.language }); // Cambia 'MainGameScene' al nombre real de tu escena de juego
  }
}
