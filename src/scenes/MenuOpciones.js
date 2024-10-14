import { Television } from "../entitities/television";
import { BaseScene } from "../lib/FontsBase";
export class MenuOpciones extends BaseScene {
  constructor() {
    super("opcionesScene");
  }

  init() {
    this.cameras.main.zoomTo(1.2, 1200); // Reducir el zoom en 1 segundo (1000 ms)
    this.cameras.main.fadeIn(1500, 0, 0, 0); // Cuando Inica la escena
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    const backgroundTV = new Television(this, true)

    // Agregar un botón para volver al menú principal
    const mainMenuButton = this.createText(
      width * 0.5,
      height * 0.5,
      "Volver al Menú Principal"
    )
      .setOrigin(0.5)
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
    this.sliderBar = this.add.image(width / 2, height * 0.65, "sliderBar").setDepth(2);;
    this.sliderHandle = this.add
      .image(width / 2, height * 0.65, "sliderHandle")
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
