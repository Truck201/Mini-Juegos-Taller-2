export class KidKorn {
  constructor(scene, dialogues) {
    this.scene = scene;

    this.y = this.scene.scale.height;
    this.x = this.scene.scale.width;

    this.appear = this.scene.sound.add("goInSound", { volume: 0.09 });
    this.goBack = this.scene.sound.add("goBackSound", { volume: 0.09 });
    this.dialogueSound = this.scene.sound.add("dialoguesSound", {
      volume: 0.09,
    });

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
    this.appear.play();

    // Seleccionar una frase aleatoria
    const randomIndex = Phaser.Math.Between(
      0,
      this.dialogues.Efusive.length - 1
    );
    const randomDialogue = this.dialogues.Efusive[randomIndex];

    // Mostrar la frase en el juego
    const text = this.scene.add
      .text(this.x / 2, this.y * 0.6, randomDialogue, {
        fontSize: 50,
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
      .setOrigin(0.5)
      .setDepth(23);

    this.dialogueSound.play();

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
        this.scene.time.delayedCall(5400, () => {
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
    this.goBack.play();
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
    this.appear.play();
    sprite.x = startX;

    // Seleccionar una frase aleatoria
    const randomIndex = Phaser.Math.Between(
      0,
      this.dialogues.Neutral.length - 1
    );
    const randomDialogue = this.dialogues.Neutral[randomIndex];

    if (fromLeft) {
      this.dialogueWidth = this.scene.scale.width * 0.235;
    } else if (!fromLeft) {
      this.dialogueWidth = this.scene.scale.width * 0.75;
    }

    let fontSize;
    if (randomDialogue.length <= 18) {
      fontSize = "40px"; // Para palabras cortas
    } else if (randomDialogue.length <= 30) {
      fontSize = "31.4px"; // Para palabras medianas
    } else if (randomDialogue.length <= 37) {
      fontSize = "28px"; // Para palabras medianas
    } else {
      fontSize = "22px"; // Para palabras largas
    }

    this.dialogueSound.play();

    // Mostrar la frase en el juego
    const text = this.scene.add
      .text(this.dialogueWidth, this.y * 0.37, randomDialogue, {
        fontSize: fontSize,
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
        });
      },
    });
  }

  hideKidKornChild(sprite, fromLeft) {
    let endX = fromLeft ? -270 : this.scene.scale.width + 270;
    this.goBack.play();
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
