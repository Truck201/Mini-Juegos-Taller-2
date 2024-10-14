import { BaseScene } from "../lib/FontsBase";
import { Television } from "../entitities/television";
export class MainMenu extends BaseScene {
  constructor() {
    super("MainMenu");
    this.movingIcon = null;
    this.allicons = null;
  }

  init() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.allicons = [];
  }
  create() {
    let width = this.scale.width; //Definir la mitad del Ancho
    let height = this.scale.height; //Definir la mitad del Alto

    //Title
    this.background = this.add
      .sprite(width * 0.5, height * 0.5, "menu-background")
      .setScale(2.4)
      .setDepth(2);

    //Button
    const playButton = this.createText(width / 2, height * 0.37, "Play")
      .setScale(1.4)
      .setInteractive()
      .setDepth(3)
      .setOrigin(0.5, 0.5);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    playButton.setInteractive();

    //Button Animations Hover, Down, Out
    playButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      playButton.setScale(1.7);
    });

    playButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      playButton.setScale(1.4);
    });

    playButton.on("pointerdown", () => {
      playButton.setScale(1.3); // Vuelve al tamaño original
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 900, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          optionsButton.setText("");
          playButton.setText("");
          this.transitionToNextScene(); //Llama la escena Main
        },
      });
    });

    // Control de inactividad
    this.inactivityTimer = this.time.addEvent({
      delay: 11000, // 1 minuto
      callback: this.showIconScreen,
      callbackScope: this,
      loop: true,
    });

    // Detectar movimiento del mouse
    this.input.on("pointermove", () => {
      this.resetInactivityTimer();
    });

    //Button
    const optionsButton = this.createText(width / 2, height * 0.47, "Options")
      .setDepth(3)
      .setOrigin(0.5, 0.5);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    optionsButton.setInteractive();

    //Button Animations Hover, Down, Out
    optionsButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      optionsButton.setScale(1.1);
    });

    optionsButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      optionsButton.setScale(1);
    });

    optionsButton.on("pointerdown", () => {
      optionsButton.setScale(0.9); // Vuelve al tamaño original
      this.cameras.main.zoomTo(1.8, 1200);
      this.cameras.main.fadeOut(1200, 0, 0, 0);
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 1200, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          optionsButton.setText("");
          playButton.setText("");
          this.toOptionsScene(); //Llama la escena Main
        },
      });
    });

    this.television = new Television(this, true)
  
  }

  resetInactivityTimer() {
    // Si hay objetos en el array allicons, eliminarlos
    if (this.allicons.length > 0) {
      this.allicons.forEach((icon) => {
        icon.destroy(); // Destruir cada objeto en el array
      });
      this.allicons = []; // Vaciar el array después de destruir los objetos
    }

    this.cameras.main.setAlpha(1); // Restaurar la opacidad normal

    // Reiniciar el temporizador de inactividad
    this.inactivityTimer.reset({
      delay: 11000,
      callback: this.showIconScreen,
      callbackScope: this,
      loop: true,
    });
  }

  showIconScreen() {
    let width = this.scale.width;
    let height = this.scale.height;

    // Crear el ícono que se moverá
    this.movingIcon = this.add
      .image(
        Phaser.Math.Between(0, width), // Posición inicial X aleatoria
        Phaser.Math.Between(0, height), // Posición inicial Y aleatoria
        "logo"
      )
      .setScale(0.5);

    // Movimiento del ícono por la pantalla con posiciones y duraciones aleatorias
    this.tweens.add({
      targets: this.movingIcon,
      x: Phaser.Math.Between(0, width), // Posición final X aleatoria
      y: Phaser.Math.Between(0, height), // Posición final Y aleatoria
      duration: Phaser.Math.Between(2000, 6000), // Duración aleatoria del movimiento
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut", // Movimiento más suave
    });

    // Guardar el ícono en el array
    this.allicons.push(this.movingIcon);

    // Agregar opacidad a la pantalla
    this.cameras.main.setAlpha(0.5);
  }

  toOptionsScene() {
    this.scene.start("opcionesScene"); //Ir a escena Opciones
  }

  transitionToNextScene() {
    // Crear el efecto de zoom out
    this.cameras.main.zoomTo(0.4179, 1300); // Reducir el zoom en 1 segundo (1000 ms)

    // Esperar un poco antes de iniciar la siguiente escena
    this.time.delayedCall(1500, () => {
      this.scene.start("Game1vs1"); //Ir a escena Main
    });
  }
}
