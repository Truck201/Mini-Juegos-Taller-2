import { Scene } from "phaser";

export class Game1v1 extends Scene {
  constructor() {
    super("Game1vs1");
    this.lastKeyPressTime = 0;
  }

  create(data) {
    let barra = true;
    let width = this.scale.width;
    let height = this.scale.height;

    //Agregar los cursores
    this.cursor = this.input.keyboard.createCursorKeys();

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      console.log("pres scape");
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause('battleScene');
        this.scene.pause('Game1vs1')
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
      }
    });

    this.input.keyboard.on("keydown-Q", () => {
      console.log("Start Battle");
      // Atacar
      if (barra) {
        this.scene.launch("battleScene", {});
        barra = false;
      } else {
        this.scene.stop("battleScene", {});
        this.scene.stop("Hud", {});
        barra = true;
      }
    });


    // Añadir Cuadro de Personaje Uno
    // Dimensiones
    let rectWidht = width / 7.8;

    // Posición
    let rect1X = rectWidht / 1.8; // Posición ancho
    let rect1Y = (height * 1) / 7.5; // Posicion alto
    // Recuadro 1
    let recuadro1 = this.physics.add.sprite(
      rect1X,
      rect1Y,
      'mimbo'
    );
    
    recuadro1.setImmovable
    recuadro1.body.allowGravity = false;
    
    // Añadir Cuadro de Personaje Uno
    // Posición
    let rect2X = rectWidht / 0.1379; // Posición ancho
    let rect2Y = (height * 1) / 7.5; // Posicion alto
    // Recuadro 2
    let recuadro2 = this.physics.add.sprite(
      rect2X,
      rect2Y,
      'luho'
    );

    recuadro2.setImmovable
    recuadro2.body.allowGravity = false;

    // Añadimos el televisor
    // Dimensiones
    let teleWidth = width / 2.08;
    let teleHeight = height / 1.86;
    // Posición
    let teleX = width / 2;
    let teleY = height / 2 - 60;
    // Crear Televisor
    // Rectangulo plateado fondo
    this.add.rectangle(
      teleX,
      teleY,
      teleWidth,
      teleHeight,
      0xbbbbbb // Blanco - Plateado
    );
    // Imagen opacidad
    this.television = this.physics.add.sprite(
      teleX,
      teleY,
      'l-opacidad'
    ).setScale(0.18).setAlpha(0.18);
        
    this.television.setImmovable
    this.television.body.allowGravity = false;

    // Añadimos sillones, butacas !! En los Laterales
    // Dimensiones
    let armchairWidth = width / 11;
    let armchairHeight = height / 7.5;
    // Posición X
    let armX = width / 5.5;
    // Crear sillones
    let n = 0;
    for (let i = 0; i < 14; i++) {
      if (i < 7) {
        let armchair = this.add.rectangle(
          armX + i * (armchairWidth + 20), // Ajustar por cada rectangulo
          teleY * 1.77,
          armchairWidth,
          armchairHeight,
          0xbbbbbb // Blanco - Plateado
        );
      } else {
        let armchair = this.add.rectangle(
          armX + n * (armchairWidth + 20), // Ajustar por cada rectangulo
          teleY * 2.18,
          armchairWidth,
          armchairHeight,
          0xbbbbbb // Blanco - Plateado
        );
        n = n + 1;
      }
    }

    // Texto de los personajes
    this.personaje1 = this.add.text(45, height / 4.39, "MIMBO", {
      fontSize: "16px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#ff004d", // ROJO
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    this.personaje2 = this.add.text(width / 1.099, height / 4.39, "LUHO", {
      fontSize: "18px",
      fontFamily: "Arial Black, Gadget, sans-serif",
      fill: "#065ab5", // AZUL
      fontWeight: "bold",
      padding: { x: 6, y: 3 },
      backgroundColor: "#ffffff",
      border: "60px solid #000000",
    });

    let widthMenu = 20
    // Menu Button
    this.box = this.add
      .text(widthMenu , height - 65, "Menu", {
        fontSize: "130px",
        backgroundColor: "#ffffff",
        color: "#000000",
        padding: { x: 10, y: 5 },
        border: "60px solid #000000",
      })
      .setInteractive();
    this.box.setScale(0.32);
    this.box.on("pointerdown", () => this.toggleOptions());

    // Crear las opciones (inicialmente invisibles)
    this.options = [];
    const optionTexts = ["Opción 1", "Opción 2", "Opción 3"];
    for (let i = 0; i < optionTexts.length; i++) {
      let option = this.add
        .text(widthMenu , height - 86 + i * -42, optionTexts[i], {
          fontSize: "100px",
          backgroundColor: "#ffffff",
          color: "#000000",
          padding: { x: 10, y: 5 },
          border: "80px solid #000000",
        })
        .setInteractive();
      option.visible = false;
      option.setScale(0.3);
      option.on("pointerdown", () => this.toggleOption(option));
      this.options.push(option);
    }
  }

  update() {}

  movimientoJugadorUno() {}

  movimientoJugadorDos() {}

  toggleOptions() {
    // Mostrar u ocultar las opciones
    this.options.forEach((option, index) => {
      if (option.visible) {
        this.tweens.add({
          targets: option,
          y: option.y + 20,
          alpha: 0,
          duration: 500,
          onComplete: () => option.setVisible(false),
        });
      } else {
        option.setVisible(true);
        this.tweens.add({
          targets: option,
          y: option.y - 20,
          alpha: 1,
          duration: 500,
        });
      }
    });
  }

  toggleOption(option) {
    // Activar o desactivar la opción
    option.setStyle({
      backgroundColor:
        option.style.backgroundColor === "#ffffff" ? "#00ff00" : "#ffffff",
    });
  }
}
