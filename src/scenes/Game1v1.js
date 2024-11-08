import { Scene } from "phaser";
import { Television } from "../entitities/television";
export class Game1v1 extends Scene {
  constructor() {
    super("Game1vs1");
    this.lastKeyPressTime = 0;
    this.currentParagraph = 0;
  }

  init(data) {
    this.dialogues = data.dialogues;
    this.language = data.language;
    // Cargar los archivos JSON según el idioma seleccionado
  }

  preload() {
    // Obtener el idioma
    if (this.language === "en-US") {
      this.load.json("tutorials", "/data/dialogues_en.json"); // ../public
      this.textSkipper = "Skip, press Q";
    } else {
      this.load.json("tutorials", "/data/dialogues_es.json"); // ../public
      this.textSkipper = "Saltar intro presiona Q";
    }
  }

  create() {
    let barra = true;
    let width = this.scale.width;
    let height = this.scale.height;

    console.log(this.language);

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

    // Obtener los diálogos cargados
    this.tutorials = loadedTutorials.tutorial;
    const paragraphs = [
      this.tutorials.paragraph1,
      this.tutorials.paragraph2,
      this.tutorials.paragraph3,
    ];

    // Crear texto inicial en el centro de la pantalla
    let tutorialText = this.add
      .text(width * 0.5, height * 0.485, paragraphs[this.currentParagraph], {
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
      })
      .setDepth(5)
      .setOrigin(0.5);
      
    // Función para avanzar al siguiente párrafo
    const nextParagraph = () => {
      this.currentParagraph++;
      if (this.currentParagraph < paragraphs.length) {
        tutorialText.setText(paragraphs[this.currentParagraph]);
      } else {
        this.cameras.main.zoomTo(0.89, 1000);
        this.cameras.main.fadeOut(1000, 0, 0, 0);
        this.time.delayedCall(1000, () => {
          this.toRecolectScene();
        });
      }
    };

    // Saltar el tutorial con la tecla Q
    this.input.keyboard.on("keydown-Q", () => {
      this.cameras.main.zoomTo(0.89, 1000);
      this.cameras.main.fadeOut(1000, 0, 0, 0);
      this.time.delayedCall(1000, () => {
        this.toRecolectScene();
      });
    });

    // Avanzar el diálogo con clic del ratón, enter o espacio
    this.input.on("pointerdown", nextParagraph);
    this.input.keyboard.on("keydown-ENTER", nextParagraph);
    this.input.keyboard.on("keydown-SPACE", nextParagraph);

    // Crear Televisor Instancar
    this.television = new Television(this, false);
    this.television.handleOnomatopoeias("game1vs1");

    let background = this.add.sprite(
      width * 0.488,
      height * 0.586,
      "escenario"
    );
    background.setDepth(2);
    background.setScale(1.7);

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    // this.input.keyboard.on("keydown-T", () => {
    //   console.log("Start Battle");
    //   // Atacar
    //   if (barra) {
    //     this.scene.launch("battleScene", {});
    //     barra = false;
    //   } else {
    //     this.scene.stop("battleScene", {});
    //     // this.scene.stop("HudBattle", {});
    //     barra = true;
    //   }
    // });

    // Posición
    let teleY = height / 2 - 60;
  }

  toRecolectScene() {
    // Al terminar los diálogos, iniciar la escena 'RecolectScene'
    this.scene.start("recolectScene", {
      dialogues: this.dialogues,
      language: this.language,
    });
  }

  update() {}
}
