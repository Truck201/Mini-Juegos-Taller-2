import { BaseScene } from "../lib/FontsBase";
export class MenuOpciones extends BaseScene {
  constructor() {
    super("opcionesScene");
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    // Agregar un botón para volver al menú principal
    const mainMenuButton = this.createText(
      width / 2 - 160,
      height * 0.5,
      "Volver al Menú Principal"
    )
      .setInteractive()
      .setDepth(3)
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
    this.sliderBar = this.add.image(width/2 + 20, 500, "sliderBar");
    this.sliderHandle = this.add
      .image(width/2, 500, "sliderHandle")
      .setInteractive()
      .setDepth(3);

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

    // Inicializar el volumen en el nivel actual
    this.updateSliderHandlePosition();
  }

  updateVolume() {
    // Calcular el porcentaje de la barra
    let percentage =
      (this.sliderHandle.x - (this.sliderBar.x - this.sliderBar.width / 2)) /
      this.sliderBar.width;
    // Ajustar el volumen del sonido
    this.sound.volume = percentage;

    // Guardar el volumen ajustado en localStorage para mantener la configuración
    localStorage.setItem("gameVolume", percentage);
  }

  updateSliderHandlePosition() {
    // Cargar el volumen guardado y ajustar la posición del slider
    let savedVolume = localStorage.getItem("gameVolume") || 0.5;
    this.sound.volume = savedVolume;

    // Actualizar la posición del sliderHandle basado en el volumen
    this.sliderHandle.x =
      this.sliderBar.x -
      this.sliderBar.width / 2 +
      this.sliderBar.width * savedVolume;
  }

  update() {}
}
