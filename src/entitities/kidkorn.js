import { BaseScene } from "../lib/FontsBase";
import { getLanguageConfig } from "../services/translations";

export class KidKorn extends BaseScene {
  constructor(scene, dialogues) {
    this.scene = scene;

    this.y = this.scene.scale.height;
    this.x = this.scene.scale.width;

    // Cargar los diálogos
    this.dialogues = dialogues;

    this.kidKornBig = this.scene.add
      .sprite(this.x / 2, this.y * 1.9, "kid-kornB")
      .setDepth(8)
      .setScale(0.82);
    this.kidKornBig.setVisible(false); // Ocultar al inicio

    this.kidKornLeft = this.scene.add
      .sprite(-250, this.y * 0.72, "kid-kornL")
      .setDepth(4)
      .setScale(0.76);
    this.kidKornRight = this.scene.add
      .sprite(this.x + 250, this.y * 0.72, "kid-kornR")
      .setDepth(4)
      .setScale(0.76);

    this.kidKornLeft.setVisible(false); // Ocultar al inicio
    this.kidKornRight.setVisible(false); // Ocultar al inicio
  }

  showKidKornBig() {
    let width = this.scene.game.scale.width;
    let height = this.scene.game.scale.height;

    // Hacer visible el sprite de KidKorn
    this.kidKornBig.setVisible(true);

    // Seleccionar una frase aleatoria
    const randomIndex = Phaser.Math.Between(
      0,
      this.dialogues.Efusive.length - 1
    );
    const randomDialogue = this.dialogues.Efusive[randomIndex];

    // Mostrar la frase en el juego
    const text = this.createText(this.x / 2, this.y * 0.6, randomDialogue)
      .setOrigin(0.5)
      .setDepth(23);

    // Animar a KidKorn para que suba desde la parte inferior
    this.scene.tweens.add({
      targets: this.kidKornBig,
      y: height * 0.57, // Subir hasta la mitad de la pantalla
      duration: 2500, // Duración de la animación (2 segundos)
      ease: "Power2", // Tipo de easing
      onComplete: () => {
        // Una vez que llega a la mitad, comenzar a generar pochoclos
        this.scene.startGeneratingPopcorn(true);

        // Luego de 6 segundos, ocultar a KidKorn y detener la generación de pochoclos
        this.scene.time.delayedCall(6000, () => {
          this.hideKidKornBig();
          text.destroy(); // Destruir el texto después de que KidKorn desaparezca
        });
      },
    });

    // Efecto de shake (temblor) mientras sube
    this.scene.tweens.add({
      targets: this.kidKornBig,
      x: {
        value: width / 2 + 10, // Pequeño desplazamiento en X
        duration: 50, // Duración corta
        ease: "Power1",
        yoyo: true, // Regresar a la posición original
        repeat: -1, // Repetir indefinidamente durante la subida
      },
    });
  }

  hideKidKornBig() {
    let height = this.scene.game.scale.height;

    // Hacer que KidKorn baje y luego desaparecerlo
    this.scene.tweens.add({
      targets: this.kidKornBig,
      y: height * 1.66, // Bajar hasta fuera de la pantalla
      duration: 2000, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        this.kidKornBig.setVisible(false); // Ocultar después de la animación
      },
    });
  }

  showKidKorn() {
    // Elegir aleatoriamente si aparece por la izquierda o la derecha
    const fromLeft = Phaser.Math.Between(0, 1) === 0;
    let sprite = fromLeft ? this.kidKornLeft : this.kidKornRight;
    let startX = fromLeft ? -175 : this.scene.scale.width + 175;
    let endX = fromLeft ? this.x * 0.02 : this.x * 0.98;

    sprite.setVisible(true);
    sprite.x = startX;

    // Seleccionar una frase aleatoria
    const randomIndex = Phaser.Math.Between(
      0,
      this.dialogues.Neutral.length - 1
    );
    const randomDialogue = this.dialogues.Neutral[randomIndex];

    if (fromLeft) {
      this.dialogueWidth = this.scene.scale.width * 0.255;
    } else if (!fromLeft) {
      this.dialogueWidth = this.scene.scale.width * 0.739;
    }

    let fontSize, globoSize;
    if (randomDialogue.length <= 18) {
      console.log("corto");
      fontSize = "39px"; // Para palabras cortas
      globoSize = 1.1;
    } else if (randomDialogue.length <= 30) {
      console.log("medio chico");
      fontSize = "29.4px"; // Para palabras medianas
      globoSize = 1.23;
    } else if (randomDialogue.length <= 37) {
      console.log("mediano alto");
      fontSize = "26px"; // Para palabras medianas
      globoSize = 1.34;
    } else {
      console.log("grande");
      fontSize = "21px"; // Para palabras largas
      globoSize = 1.45;
    }

    // Mostrar la frase en el juego
    const text = this.createText(
      this.dialogueWidth,
      this.y * 0.37,
      randomDialogue
    )
      .setOrigin(0.5)
      .setDepth(23);

    // Animar la entrada
    this.scene.tweens.add({
      targets: sprite,
      x: endX,
      duration: 2000, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        // Generar pochoclos cuando llega al centro
        this.scene.startGeneratingPopcorn(false);
        // Desaparecer después de un tiempo aleatorio entre 1 y 2 segundos
        this.scene.time.delayedCall(Phaser.Math.Between(1300, 2000), () => {
          this.hideKidKornChild(sprite, fromLeft);
          text.destroy(); // Destruir el texto después de que KidKorn desaparezca
          globoTexto.destroy();
        });
      },
    });
  }

  hideKidKornChild(sprite, fromLeft) {
    let endX = fromLeft ? -270 : this.scene.scale.width + 270;

    console.log("sprite seleccionado:", sprite);
    // Animar la salida
    this.scene.tweens.add({
      targets: sprite,
      x: endX,
      duration: 1200, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        sprite.setVisible(false); // Ocultar después de la animación
      },
    });
  }

  startKidKornAppearance() {
    // Temporizador para aparecer KidKorn en intervalos aleatorios de 4 a 9 segundos
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(5000, 7000),
      loop: true,
      callback: () => {
        if (this.scene.game_over_timeout > 13) {
          this.showKidKorn(); // Mostrar KidKorn de forma aleatoria
        }
      },
    });
  }
}
