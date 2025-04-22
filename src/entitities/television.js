export class Television {
  constructor(scene, isInMenu, isClose) {
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
      this.y = this.scene.scale.height;
      let tvY;
      isClose ? (this.scale = 1.7) : (this.scale = 1.14);
      isClose ? (tvY = this.y * 0.48) : (tvY = this.y * 0.43);

      // Sprite Television
      this.television = this.scene.physics.add
        .sprite(this.x + 12, tvY, "battleTV")
        .setScale(this.scale)
        .setAlpha(0.5)
        .setDepth(1);
      this.television.setImmovable;
      this.television.body.allowGravity = false;
      this.television.setDepth(1);

      // Shader
      // this.television.setPostPipeline("TVDistortionFx");
      // this.television.setPostPipeline("CRTPostFx");
      this.television.setPostPipeline("TVStaticFx");
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
    let teleX = this.television.x + 20;
    let teleY = this.television.y - 18;
    console.log(`Tele X ${teleX}`);
    console.log(`Tele Y ${teleY}`);

    // Crear la onomatopeia con un tamaño inicial muy pequeño
    let onomatopoeia = this.scene.add
      .sprite(teleX, teleY, sprite)
      .setScale(0) // Empieza en un tamaño de 0
      .setAlpha(0.87)
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
        if (playerAction === "start") {
          let expresion = `fireworksTV`;
          this.showOnomatopoeia(expresion, 1.3); // "Fireworks"
        }
        if (playerAction === "BigKidKorn") {
          let expresion = `appear`;
          this.showOnomatopoeia(expresion, 2.1); // "Boom!"
        }
        if (playerAction === "Combo10") {
          let random = Phaser.Math.Between(1, 6);
          let expresion = `combo${random}`;
          this.showOnomatopoeia(expresion, 2.3); // "Wow!"
        }
        if (playerAction === "Terminado") {
          let expresion = `termina`;
          this.showOnomatopoeia(expresion, 2.3);
        }
        break;
      case "battleScene":
        if (playerAction === "start") {
          let expresion = `fireworksTV`;
          let expresion2 = `swordsTV`;
          let expresion3 = `battle`;
          this.showOnomatopoeia(expresion, 1.3); // "Fireworks"
          this.showOnomatopoeia(expresion2, 1.3); // "Battle"
          this.showOnomatopoeia(expresion3, 1.4); // "Battle"
        }
        if (playerAction === "critical") {
          let random = Phaser.Math.Between(1, 2);
          this.showOnomatopoeia(`ouch${random}`, 2); // "Ouch!"
        }
        if (playerAction === "attack") {
          let random = Phaser.Math.Between(1, 2);
          this.showOnomatopoeia(`attack${random}`, 2.3);
        }
        if (playerAction === "shield") {
          let random = Phaser.Math.Between(1, 2);
          this.showOnomatopoeia(`shield${random}`, 2); // "Ouch!"
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
