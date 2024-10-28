export class PedidoManager {
  constructor(scene) {
    this.scene = scene;
    this.currentPedido = null;
    this.nextPedido = null;
    this.timeRemaining = 10; // Tiempo límite de 8 segundos por pedido
    this.pedidoTypes = ["blue", "rose", "green", "orange"]; // Colores de pochoclos
    this.azucarSalTypes = ["salt", "sugar", "spicy"]; // white1: sal, white2: azúcar
    this.points = 0;
    this.timerEvent = null;

    this.pedidoValidated = false; // Nueva propiedad para validar una sola vez

    this.currentPedidoSprite = null;
    this.currentCondimentoSprite = null;
    this.nextPedidoSprite = null;
    this.nextCondimentoSprite = null;

    // Crear texto para mostrar el tiempo restante
    this.timeText = this.scene.add
      .text(
        this.scene.scale.width / 2,
        this.scene.scale.height * 0.85,
        `${this.timeRemaining}`,
        {
          fontSize: 40,
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
        }
      )
      .setOrigin(0.5)
      .setDepth(10); // Profundidad para que aparezca en frente

    this.initPedidos();
  }

  initPedidos() {
    this.currentPedido = this.generatePedido();
    this.nextPedido = this.generatePedido();
    this.showPedido(); // Mostrar el pedido en pantalla
    this.startPedidoTimer();
  }

  generatePedido() {
    const pochoclo = Phaser.Math.RND.pick(this.pedidoTypes);
    const condimento = Phaser.Math.RND.pick(this.azucarSalTypes);
    const spriteName = this.getCompletedSpriteName(pochoclo, condimento); // Genera el nombre del sprite combinado
    return { pochoclo, condimento, spriteName };
  }

  validatePedido(entregados) {
    // Verifica si ya se ha validado el pedido
    if (this.pedidoValidated) return false;

    const item1 = entregados[0].texture.key;
    const item2 = entregados[1].texture.key;

    const isCorrectPedido =
      (item1 === this.getSpriteName(this.currentPedido.pochoclo) &&
        item2 === this.currentPedido.condimento) ||
      (item2 === this.getSpriteName(this.currentPedido.pochoclo) &&
        item1 === this.currentPedido.condimento);

    console.log(
      "CURRENT P->" + this.getSpriteName(this.currentPedido.pochoclo)
    );
    console.log("CURRENT C->" + this.currentPedido.condimento);
    console.log("ITEM 1 ->" + item1);
    console.log("ITEM 2 ->" + item2);
    console.log("ES REAL? ->" + isCorrectPedido);

    if (isCorrectPedido) {
      this.pedidoValidated = true; // Marcar como validado
      this.emotionCharacters("correct")
      // Crear un nuevo sprite basado en el pedido correcto
      const completedSprite = this.scene.add
        .sprite(
          this.scene.scale.width / 2,
          this.scene.scale.height * 0.72,
          this.getCompletedSpriteName(
            this.currentPedido.pochoclo,
            this.currentPedido.condimento
          ) // Pasa los valores individuales
        )
        .setDepth(10)
        .setOrigin(0.5);

      // EmptyRoseWithSalt or EmptyRoseWithSugar
      this.scene.add.tween({
        targets: completedSprite,
        y: this.scene.scale.height * 0.72,
        scale: { from: 2, to: 1.86 }, // Agrandar el texto
        duration: 1000, // Duración de la animación (1 segundo)
        ease: "Power2",
        onComplete: () => {
          // EmptyRoseWithSalt or EmptyRoseWithSugar
          this.scene.add.tween({
            targets: completedSprite,
            y: this.scene.scale.height * 0.72,
            scale: { from: 2, to: 0 }, // Agrandar el texto
            alpha: { from: 1, to: 0 }, // Desaparecer el texto
            duration: 900, // Duración de la animación (1 segundo)
            ease: "Power2",
            onComplete: () => {
              completedSprite.destroy();
            },
          });
        },
      });

      // Posición aleatoria para el dinero entre los rangos dados
      const randomX = Phaser.Math.Between(
        this.scene.scale.width * 0.45,
        this.scene.scale.width * 0.55
      );
      const randomY = Phaser.Math.Between(
        this.scene.scale.height * 0.68,
        this.scene.scale.height * 0.73
      );
      const moneySprite = this.scene.add
        .sprite(randomX, randomY, "Cash")
        .setVisible(true)
        .setDepth(10)
        .setOrigin(0.5)
        .setScale(2);

      this.scene.add.tween({
        targets: moneySprite,
        y: randomY - 50,
        scale: { from: 1.7, to: 1.55 }, // Agrandar el texto
        duration: 1000, // Duración de la animación (1 segundo)
        ease: "Power2",
        onComplete: () => {
          moneySprite.anims.play("CashFlying", true);

          this.scene.add.tween({
            targets: moneySprite,
            y: this.scene.scale.height * 0.2,
            x: this.scene.scale.width * 0.5,
            alpha: { from: 1, to: 0 }, // Desvanecer
            scale: { from: 1.55, to: 0 }, // Reducir tamaño
            duration: 1200, // Duración de la animación (1 segundo)
            ease: "Power2",
            onComplete: () => {
              moneySprite.destroy();
            },
          });
        },
      });

      // Incrementar puntos y avanzar al siguiente pedido
      // this.scene.bridgeManager.openBridge();
      if (this.timeRemaining > 0) {
        this.timeRemaining = 1;
      }
    }

    return true;
  }
  // Empty${color}Whit${condiment}
  getCompletedSpriteName(pochoclo, condimento) {
    return `Empty${pochoclo.charAt(0).toUpperCase() + pochoclo.slice(1)}With${
      condimento.charAt(0).toUpperCase() + condimento.slice(1)
    }`;
  }

  showPedido() {
    // Limpiar sprites anteriores
    if (this.currentPedidoSprite) this.currentPedidoSprite.destroy();
    if (this.nextPedidoSprite) this.nextPedidoSprite.destroy();

    // Mostrar sprite combinado para el pedido actual
    this.currentPedidoSprite = this.scene.add
      .sprite(
        this.scene.scale.width / 2,
        this.scene.scale.height * 0.3, // Posición en Y
        this.currentPedido.spriteName // Usa el sprite combinado
      )
      .setOrigin(0.5)
      .setDepth(10)
      .setScale(1.15)
      .setVisible(true);

    // Animación para el sprite actual
    this.scene.tweens.add({
      targets: this.currentPedidoSprite,
      y: this.scene.scale.height * 0.39, // Nueva posición Y
      duration: 500,
      ease: "Bounce.easeOut",
    });

    // Mostrar sprite combinado para el próximo pedido
    this.nextPedidoSprite = this.scene.add
      .sprite(
        this.scene.scale.width * 0.5,
        this.scene.scale.height * 0.2, // Posición en Y
        this.nextPedido.spriteName // Usa el sprite combinado
      )
      .setOrigin(0.5)
      .setDepth(10)
      .setScale(1.15)
      .setAlpha(0.5);

    // Animación para el sprite actual
    this.scene.tweens.add({
      targets: this.nextPedidoSprite,
      y: this.scene.scale.height * 0.25, // Nueva posición Y
      duration: 500,
      ease: "Bounce.easeOut",
    });
  }

  getSpriteName(type) {
    // Método para obtener el nombre del sprite según el tipo
    if (type === "blue" || type === "EmptyBlue") return "EmptyBlue";
    if (type === "rose" || type === "EmptyRose") return "EmptyRose";
    if (type === "green" || type === "EmptyGreen") return "EmptyGreen";
    if (type === "orange" || type === "EmptyOrange") return "EmptyOrange";
    if (type === "salt") return "salt";
    if (type === "sugar") return "sugar";
    if (type === "spicy") return "spicy";
  }

  startPedidoTimer() {
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000, // Cada segundo
      callback: () => {
        this.timeRemaining--;

        // Actualizar el texto del temporizador
        this.timeText.setText(`${this.timeRemaining}`);

        if (this.timeRemaining <= 0) {
          this.timeExpired();
        }
      },
      loop: true,
    });
  }

  timeExpired() {
    this.generateNewPedido();

    // Limpiar lista de delivered y reiniciar el pedido
    this.scene.delivered.forEach((obj) => obj.destroy());
    this.scene.delivered = [];
    this.scene.waiterPopcorn = [];
    this.scene.waiterCondimento = [];

    this.scene.pochocloEntregado = false;
    this.scene.condimentoEntregado = false;

    this.pedidoValidated = false; // Restablecer para el nuevo pedido
    console.log("Pedido expirado y limpiado");
  }

  // Avanza al siguiente pedido
  nextPedido() {
    this.currentPedidoIndex =
      (this.currentPedidoIndex + 1) % this.pedidos.length;
    return this.getCurrentPedido();
  }

  getCurrentPedido() {
    return this.currentPedido;
  }

  generateNewPedido() {
    // Cambiar el pedido actual por el siguiente
    this.currentPedido = this.nextPedido;
    this.nextPedido = this.generatePedido();
    this.timeRemaining = 10; // Reiniciar el tiempo

    this.updatePedidoDisplay();
  }

  updatePedidoDisplay() {
    // Actualizar sprites del pedido actual
    this.currentPedidoSprite
      .setTexture(this.currentPedido.spriteName)
      .setVisible(true)
      .setScale(1.15)
      .setAlpha(1)
      .setDepth(10)
      .setPosition(this.scene.scale.width / 2, this.scene.scale.height * 0.3);

    // Animación para el sprite actual
    this.scene.tweens.add({
      targets: this.currentPedidoSprite,
      y: this.scene.scale.height * 0.4, // Nueva posición Y
      duration: 500,
      ease: "Bounce.easeOut",
    });

    // Actualizar sprites del próximo pedido
    this.nextPedidoSprite
      .setTexture(this.nextPedido.spriteName)
      .setVisible(true)
      .setScale(1.15)
      .setAlpha(0.5)
      .setDepth(10)
      .setPosition(this.scene.scale.width / 2, this.scene.scale.height * 0.2);

    // Animación para el sprite actual
    this.scene.tweens.add({
      targets: this.nextPedidoSprite,
      y: this.scene.scale.height * 0.25, // Nueva posición Y
      duration: 500,
      ease: "Bounce.easeOut",
    });
  }

  // Restar uno si el pedido se completó correctamente
  removePedidoItem(item) {
    let endY = -100;
    if (item === "pochoclo") {
      const modificado = this.currentPedidoSprite;
      console.log("primero " + item);

      // Sii se completó el pedido correctamente
      this.scene.tweens.add({
        targets: modificado,
        y: endY,
        rotation: Phaser.Math.DegToRad(360), // Rota 360 grados
        duration: 400,
        ease: "Power2",
        onComplete: () => {
          // Animaciónes
          modificado.setVisible(false);
        },
      });
    }
    if (item === "condimento") {
      const modificado = this.currentCondimentoSprite;
      console.log("segundo " + item);
      // Sii se completó el pedido correctamente
      this.scene.tweens.add({
        targets: modificado,
        y: endY,
        rotation: Phaser.Math.DegToRad(360), // Rota 360 grados
        duration: 400,
        ease: "Power2",
        onComplete: () => {
          // Animaciónes
          modificado.setVisible(false);
        },
      });
    }
  }

  // Comprueba si todos los pedidos han sido completados
  areAllPedidosComplete() {
    return this.pedidos.length === 0;
  }

  emotionCharacters(emotion) {
    if (emotion === "correct") {
      // Contentos
      this.scene.player2.change_emotion("Luho", 2, this.scene.player2); // Luho: animación de daño
      this.scene.player1.change_emotion("Mimbo", 2, this.scene.player1); // Mimbo: animación de victoria
    }
    if (emotion === "negative") {
      // Enojados
      this.scene.player1.change_emotion("Mimbo", 3, this.player1); // Mimbo: animación de Enojado
      this.scene.player2.change_emotion("Luho", 3, this.player2); // Luho: animación de Enojado
    }

    this.scene.time.delayedCall(1200, () => {
      // back to idle
      this.scene.player1.change_emotion("Mimbo", 0, this.scene.player1); // Mimbo: IDLE
      this.scene.player2.change_emotion("Luho", 0, this.scene.player2); // Luho: IDLE
    });
  }
}
