export class KidKorn {
  constructor(scene, dialogues) {
    this.scene = scene;

    this.y = this.scene.scale.height;
    this.x = this.scene.scale.width;

    this.appear = this.scene.sound.add("goInSound", { volume: 0.09 });
    this.goBack = this.scene.sound.add("goBackSound", { volume: 0.09 });
    this.dialogueSound = this.scene.sound.add("dialoguesSound", {
      volume: 0.1,
    });
    this.screamCartoon = this.scene.sound.add("screamCartoon", {
      volume: 0.21,
    });

    // Cargar los diálogos
    this.dialogues = dialogues;

    this.kidKornBig = this.scene.add
      .sprite(this.x / 2, this.y * 1.9, "kid-kornB")
      .setDepth(8)
      .setScale(1.32);
    this.kidKornBig.setVisible(false); // Ocultar al inicio

    this.kidKornLeft = this.scene.add
      .sprite(-250, this.y * 0.59, "kid-kornL")
      .setDepth(4)
      .setScale(0.98);
    this.kidKornRight = this.scene.add
      .sprite(this.x + 250, this.y * 0.59, "kid-kornR")
      .setDepth(4)
      .setScale(0.98);

    this.kidKornLeft.setVisible(false); // Ocultar al inicio
    this.kidKornRight.setVisible(false); // Ocultar al inicio

    this.AnimsKorns(this.scene);
  }

  showKidKornBig() {
    let width = this.scene.game.scale.width;
    let height = this.scene.game.scale.height;

    // Hacer visible el sprite de KidKorn
    this.kidKornBig.setVisible(true);
    this.appear.play();
    this.screamCartoon.play();

    // Siempre aplicar la animación idle de BigKidKorn
    this.kidKornBig.anims.play("idle-BigKorn", true);

    // Seleccionar una frase aleatoria
    const randomIndex = Phaser.Math.Between(
      0,
      this.dialogues.Efusive.length - 1
    );
    const randomDialogue = this.dialogues.Efusive[randomIndex];

    // Mostrar la frase en el juego
    const text = this.scene.add
      .text(this.x / 2, this.y * 0.42, randomDialogue, {
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

    this.scene.television.handleOnomatopoeias("recolectScene", "BigKidKorn");
    this.dialogueSound.play();

    // Animar a KidKorn para que suba desde la parte inferior
    this.scene.tweens.add({
      targets: this.kidKornBig,
      y: height * 0.425, // Subir hasta la mitad de la pantalla
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
    this.screamCartoon.stop();
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
    let startX = fromLeft ? -185 : this.scene.scale.width + 185;
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

    let dialogueWidth = fromLeft
      ? this.scene.scale.width * 0.25
      : this.scene.scale.width * 0.75;

    let fontSize =
      randomDialogue.length <= 18
        ? "40px"
        : randomDialogue.length <= 30
        ? "38px"
        : randomDialogue.length <= 37
        ? "36px"
        : "29px";

    this.dialogueSound.play();

    // Mostrar la frase en el juego
    const text = this.scene.add
      .text(dialogueWidth, this.y * 0.62, randomDialogue, {
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
      duration: 900, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        // Explosión dos veces, luego cambiar a animación de Idle
        const explodeKey = fromLeft
          ? "KKLeftExplodeAnims"
          : "KKRightExplodeAnims";
        const idleKey = fromLeft ? "KKLeftIdleAnims" : "KKRightIdleAnims";
        sprite.anims.play(explodeKey, true);

        this.scene.startGeneratingPopcorn(false);
        // Reproducir la animación de explosión dos veces antes de cambiar a idle
        this.scene.time.delayedCall(sprite.anims.duration * 4, () => {
          sprite.anims.play(idleKey, true);

          this.scene.time.delayedCall(Phaser.Math.Between(1800, 2000), () => {
            this.hideKidKornChild(sprite, fromLeft);
            text.destroy(); // Destruir el texto después de que KidKorn desaparezca
          });
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
      duration: 900, // Duración de la animación (2 segundos)
      ease: "Power2",
      onComplete: () => {
        sprite.setVisible(false); // Ocultar después de la animación
      },
    });
  }

  startKidKornAppearance() {
    this.scene.time.addEvent({
      delay: Phaser.Math.Between(5500, 6000),
      loop: true,
      callback: () => {
        const currentTime = this.scene.time.now;
        const minInterval = 5500; // Intervalo mínimo de 5 segundos entre apariciones

        if (
          this.scene.game_over_timeout > 13 &&
          currentTime - this.scene.lastKidKornTime >= minInterval
        ) {
          this.showKidKorn();
          this.scene.lastKidKornTime = currentTime; // Actualizar el último tiempo de aparición
        }
      },
    });
  }

  AnimsKorns(scene) {
    if (!scene.anims.exists("idle-BigKorn")) {
      scene.anims.create({
        key: "idle-BigKorn",
        frames: scene.anims.generateFrameNumbers("BigKorn", {
          start: 0,
          end: 3,
        }),
        frameRate: 8.2,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("KKRightExplodeAnims")) {
      scene.anims.create({
        key: "KKRightExplodeAnims",
        frames: scene.anims.generateFrameNumbers("KKExploteRightAnims", {
          start: 0,
          end: 1,
        }),
        frameRate: 6,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("KKLeftExplodeAnims")) {
      scene.anims.create({
        key: "KKLeftExplodeAnims",
        frames: scene.anims.generateFrameNumbers("KKExploteLeftAnims", {
          start: 0,
          end: 1,
        }),
        frameRate: 4,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("KKRightIdleAnims")) {
      scene.anims.create({
        key: "KKRightIdleAnims",
        frames: scene.anims.generateFrameNumbers("KidKornRightAnims", {
          start: 0,
          end: 1,
        }),
        frameRate: 4,
        repeat: -1,
      });
    }

    if (!scene.anims.exists("KKLeftIdleAnims")) {
      scene.anims.create({
        key: "KKLeftIdleAnims",
        frames: scene.anims.generateFrameNumbers("KidKornLeftAnims", {
          start: 0,
          end: 1,
        }),
        frameRate: 4,
        repeat: -1,
      });
    }
  }
}
