export class Television {
  constructor(scene, isInMenu) {
    this.scene = scene;

    this.y = this.scene.scale.height * 0.4;
    this.x = this.scene.scale.width / 2;

    this.onomatopoeias = [];

    if (isInMenu) {
      this.scale = 0.83;
      this.y = this.scene.scale.height;

      // Sprite Television
      this.television = this.scene.physics.add
        .sprite(this.x, this.y * 0.5, "TeleImagen") // l-opacidad
        .setScale(this.scale)
        .setAlpha(0.5)
        .setDepth(1);
      this.television.setImmovable;
      this.television.body.allowGravity = false;
      this.television.setDepth(1);

      // Shader
      this.television.setPostPipeline("TVStaticFx");
    } else if (!isInMenu) {
      this.y = this.scene.scale.height * 0.43;
      this.scale = 0.32; // 0.00092

      // Sprite Television
      this.television = this.scene.physics.add
        .sprite(this.x, this.y, "l-opacidad")
        .setScale(this.scale)
        .setAlpha(0.4)
        .setDepth(1);
      this.television.setImmovable;
      this.television.body.allowGravity = false;

      this.filtrado = this.scene.physics.add
        .sprite(this.x, this.y, "l-opacidad") //
        .setScale(this.scale)
        .setAlpha(0.08)
        .setDepth(1);
      this.filtrado.setImmovable;
      this.filtrado.body.allowGravity = false;

      // Shader
      // this.television.setPostPipeline("TVDistortionFx");
      this.filtrado.setPostPipeline("CRTPostFx");
    }

    this.text = this.scene.add
      .text(this.x - 15, this.y - 50, "", {
        fontSize: "70px",
        color: "#fff1e8",
      })
      .setDepth(1);

    this.television.setPostPipeline("TVStaticFx");
    this.startWhiteNoise();
  }

  // Método para mostrar una onomatopeya
  showOnomatopoeia(sprite, scale) {
    let margin = 40;
    let randomX = Phaser.Math.Between(
      this.television.x - margin,
      this.television.x + margin
    );
    let randomY = Phaser.Math.Between(
      this.television.y - margin,
      this.television.y + margin
    );

    // Crear la onomatopeia con un tamaño inicial muy pequeño
    let onomatopoeia = this.scene.add
      .sprite(randomX, randomY, sprite)
      .setScale(0) // Empieza en un tamaño de 0
      .setOrigin(0.5)
      .setDepth(1);

    console.log("ONOMATOPEYA APPEAR");

    this.onomatopoeias.push(onomatopoeia);

    // Tween para hacer que la onomatopeia se agrande hasta su tamaño original
    this.scene.tweens.add({
      targets: onomatopoeia,
      scale: scale, // La escala final que hemos pasado como parámetro
      ease: "Power2", // Tipo de animación (puedes cambiarla según prefieras)
      duration: 900, // Duración de 1.2 segundos
    });

    // Desaparece la onomatopeya después de 4 segundos
    this.scene.time.delayedCall(1400, () => {
      onomatopoeia.destroy();
    });
  }

  // Método para manejar las onomatopeyas en diferentes escenas
  handleOnomatopoeias(sceneType, playerAction = null) {
    switch (sceneType) {
      // case "game1vs1":
      //   this.showOnomatopoeia("hello", 0.00); // "Hola!"
      //   break;
      case "recolectScene":
        if (playerAction === "BigKidKorn") {
          let random = Phaser.Math.Between(1, 4);
          let expresion = `boom${random}`;
          this.showOnomatopoeia(expresion, 0.43); // "Boom!"
          this.showOnomatopoeia("kaboom", 0.74); // "Boom!"
        }
        if (playerAction === "Combo10") {
          let expresion = `crash1`;
          this.showOnomatopoeia(expresion, 0.75); // "Wow!"
        }
        break;
      case "battleScene":
        if (playerAction === "start") {
          let random = Phaser.Math.Between(1, 2);
          let expresion = `ready${random}`;
          this.showOnomatopoeia(expresion, 0.46); // "Ready?"
        }
        if (playerAction === "critical") {
          let random = Phaser.Math.Between(1, 2);
          random === 1
            ? this.showOnomatopoeia("crash2", 0.7)
            : this.showOnomatopoeia("ouch", 0.4); // "Ouch!"
        }
        if (playerAction === "attack") {
          this.showOnomatopoeia("pfoom", 0.56);
        }
        if (playerAction === "shield") {
          this.showOnomatopoeia("oh", 0.2); // "Ouch!"
        }
        break;
      default:
        break;
    }
  }

  // Método para limpiar las onomatopeyas restantes si es necesario
  clearOnomatopoeias() {
    this.onomatopoeias.forEach((onomatopoeia) => onomatopoeia.destroy());
    this.onomatopoeias = [];
  }

  updateText(remainingTime) {
    if (remainingTime <= 3 && remainingTime != -1) {
      this.text.setText(`${remainingTime}`); // Actualizar el texto con el tiempo restante
    } else if (remainingTime === 0) {
      this.text.setText("0");
    } else {
      this.text.setText(""); // Limpiar el texto si el tiempo es mayor a 3 o menor que 0
    }
  }

  startWhiteNoise() {
    if (!this.whiteNoiseTimer) {
      this.whiteNoiseTimer = this.scene.time.addEvent({
        delay: 550,
        callback: () => {
          const whiteNoise = this.scene.sound.add("whiteNoise", {
            volume: 0.02,
          });
          whiteNoise.play();
        },
        loop: true,
      });
    }
  }

  // Método para detener el sonido del latido del corazón
  stopWhiteNoise() {
    if (this.whiteNoiseTimer) {
      this.whiteNoiseTimer.remove(false); // Elimina el evento del temporizador
      this.whiteNoiseTimer = null; // Resetea el temporizador
    }
  }
}
