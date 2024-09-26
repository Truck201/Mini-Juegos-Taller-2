import { Scene } from "phaser";
import { Character } from "../entitities/character";
import { Television } from "../entitities/television";

export class Game1v1 extends Scene {
  constructor() {
    super("Game1vs1");
    this.lastKeyPressTime = 0;
  }

  create(data) {
    let barra = true;
    let width = this.scale.width;
    let height = this.scale.height;

    // Crear Televisor Instancar
    let television = new Television(this);
    
    let background = this.add.sprite(width / 2, height / 2, "escenario");
    background.setDepth(1)

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      console.log("pres scape");
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause("recolectScene");
        this.scene.pause("Game1vs1");
        this.scene.pause("battleScene");
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
      }
    });

    this.input.keyboard.on("keydown-Q", () => {
      console.log("Start Recolect");
      // Atacar
      if (barra) {
        this.scene.launch("recolectScene", {});
        barra = false;
      } else {
        this.scene.stop("recolectScene", {});
        this.scene.stop("Hud", {});
        barra = true;
      }
    });

    this.input.keyboard.on("keydown-T", () => {
      console.log("Start Battle");
      // Atacar
      if (barra) {
        this.scene.launch("battleScene", {});
        barra = false;
      } else {
        this.scene.stop("battleScene", {});
        // this.scene.stop("HudBattle", {});
        barra = true;
      }
    });

    // Añadir Cuadro de Personaje Uno
    let personaje1 = new Character(this, "mimbo", true, false);

    // Añadir Cuadro de Personaje Uno
    let personaje2 = new Character(this, "luho", false, false);

    // Posición
    let teleY = height / 2 - 60;
  }

  update() {}
}
