import { Scene } from "phaser";
import { BaseScene } from '../lib/FontsBase';

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
    let miImagen; //Definir una Variable en la escena

    //Title
    this.background = this.add
      .sprite(width / 2, height / 2, "menu-background")
      .setScale(2.2153)
      .setDepth(2);

    //Button
    miImagen = this.createText(width / 2 - 50, 240, "Play")
    .setInteractive()
    .setDepth(3);;
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    miImagen.setInteractive();

    //Button Animations Hover, Down, Out
    miImagen.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      miImagen.setScale(1.1);
      console.log("on");
    });

    miImagen.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      miImagen.setScale(1);
      console.log("off");
    });

    miImagen.on("pointerdown", () => {
      miImagen.setScale(1.2); // Vuelve al tamaño original
      console.log("active");
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 900, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
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

    let options; // Botón de opciones

    //Button
    options = this.createText(width / 2 - 65, 310, "Options")
    .setDepth(3);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    options.setInteractive();

    //Button Animations Hover, Down, Out
    options.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      options.setScale(1.1);
    });

    options.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      options.setScale(1);
    });

    options.on("pointerdown", () => {
      options.setScale(0.9); // Vuelve al tamaño original
      console.log("active");
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 300, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          this.toOptionsScene(); //Llama la escena Main
        },
      });
    });

    this.television = this.physics.add
      .sprite(width/2, height/2, "l-opacidad")
      .setScale(0.4)
      .setAlpha(0.4)
      .setDepth(0);

    this.television.setImmovable;
    this.television.body.allowGravity = false;
    this.television.setDepth(1);
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
