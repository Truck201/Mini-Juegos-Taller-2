import { Scene } from 'phaser';

export class MenuOpciones extends Scene {
    constructor() {
      super("opcionesScene");
    }
  
    preload() {

    }
  
    create() {
      // Agregar un botón para volver al menú principal
      const mainMenuButton = this.add
        .text(100, 310, "Volver al Menú Principal", {
          fontSize: "24px",
          fill: "#fff",
        })
        .setInteractive()
        .on("pointerdown", () => {
          this.scene.stop("PauseMenu");
          this.scene.start("MainMenu");
        });
  
      mainMenuButton.on("pointerover", () => {
        // Cambia el tamaño de la imagen al pasar el mouse
        mainMenuButton.setScale(1.07);
      });
  
      mainMenuButton.on("pointerout", () => {
        // Cambia el tamaño de la imagen al pasar el mouse
        mainMenuButton.setScale(1);
      });
      // Crear la barra
      this.sliderBar = this.add.image(400, 300, "sliderBar");
      this.sliderHandle = this.add
        .image(400, 300, "sliderHandle")
        .setInteractive();
  
      // Hacer que el control deslizante sea arrastrable
      this.input.setDraggable(this.sliderHandle);
  
      // Evento de arrastre
      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        // Restringir el movimiento solo en el eje X
        gameObject.x = Phaser.Math.Clamp(
          dragX,
          this.sliderBar.x - this.sliderBar.width / 2,
          this.sliderBar.x + this.sliderBar.width / 2
        );
        this.updateVolume();
      });
    }
  
    updateVolume() {
      // Calcular el porcentaje de la barra
      let percentage =
        (this.sliderHandle.x - (this.sliderBar.x - this.sliderBar.width / 2)) /
        this.sliderBar.width;
      // Ajustar el volumen del sonido
      this.sound.volume = percentage;
    }
  
    update() {}
  }
  