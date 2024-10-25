export class PedidoManager {
  constructor(scene) {
    this.scene = scene;
    this.currentPedido = null;
    this.nextPedido = null;
    this.timeRemaining = 8; // Tiempo límite de 8 segundos por pedido
    this.pedidoTypes = ["blue", "red", "green", "orange"]; // Colores de pochoclos
    this.azucarSalTypes = ["salt", "sugar", "spicy"]; // white1: sal, white2: azúcar
    this.points = 0;
    this.timerEvent = null;

    this.currentPedidoSprite = null;
    this.currentCondimentoSprite = null;
    this.nextPedidoSprite = null;
    this.nextCondimentoSprite = null;

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
    return { pochoclo, condimento };
  }

  validatePedido(entregados) {
    const item1 = entregados[0].texture.key;
    const item2 = entregados[1].texture.key;
    const pochoclo = this.getSpriteName(this.currentPedido.pochoclo)
    const condimento = this.getSpriteName(this.currentPedido.condimento)

    const isCorrectPedido =
      (item1 === pochoclo &&
        item2 === condimento) ||
      (item2 === pochoclo &&
        item1 === condimento);

    console.log("CURRENT ->" + pochoclo);
    console.log("CURRENT ->" + condimento);
    console.log("ITEM 1 ->" + item1);
    console.log("ITEM 2 ->" + item2);
    console.log("ES REAL? ->" + isCorrectPedido);

    if (isCorrectPedido) {
      // Crear un nuevo sprite basado en el pedido correcto
      const completedSprite = this.scene.add.sprite(
        this.scene.scale.width / 2,
        this.scene.scale.height * 0.75,
        this.getCompletedSpriteName(pochoclo)
      );

      // EmptyRoseWithSalt or EmptyRoseWithSugar
      this.scene.add.tween({
        targets: completedSprite,
        y: this.scene.scale.height + 100,
        duration: 1000,
        ease: "Power2",
        onComplete: () => completedSprite.destroy(),
      });

      // Incrementar puntos y avanzar al siguiente pedido
      this.points += 10;
      this.scene.bridgeManagerLeft.openBridge();
      this.scene.bridgeManagerRight.openBridge();
      this.generateNewPedido();
    }

    return true;
  }
  // Empty${color}Whit${condiment}
  getCompletedSpriteName(pedido) {
    if (pedido.condimento === "salt") return pedido.pochoclo + "WithSalt";
    if (pedido.condimento === "sugar") return pedido.pochoclo + "WithSugar";
    if (pedido.condimento === "spicy") return pedido.pochoclo + "WithSpicy";
  }

  showPedido() {
    // Crear sprites para el pedido actual
    this.currentPedidoSprite = this.scene.add
      .sprite(
        this.scene.game.scale.width / 2 - 50,
        50,
        this.getSpriteName(this.currentPedido.pochoclo)
      )
      .setOrigin(0.5)
      .setVisible(true);

    // Tween para mover el sprite hacia abajo
    this.scene.tweens.add({
      targets: this.currentPedidoSprite,
      y: 100, // Nueva posición Y
      duration: 500, // Duración de la animación
      ease: "Bounce.easeOut", // Efecto de rebote
    });

    this.currentCondimentoSprite = this.scene.add
      .sprite(
        this.scene.game.scale.width / 2 + 50,
        50,
        this.getSpriteName(this.currentPedido.condimento)
      )
      .setOrigin(0.5)
      .setVisible(true);

    // Tween para mover el condimento hacia abajo
    this.scene.tweens.add({
      targets: this.currentCondimentoSprite,
      y: 100, // Nueva posición Y
      duration: 500, // Duración de la animación
      ease: "Bounce.easeOut", // Efecto de rebote
    });

    // Crear sprites para el próximo pedido
    this.nextPedidoSprite = this.scene.add
      .sprite(
        this.scene.game.scale.width - 150,
        50,
        this.getSpriteName(this.nextPedido.pochoclo)
      )
      .setOrigin(0.5)
      .setAlpha(0.5);

    this.nextCondimentoSprite = this.scene.add
      .sprite(
        this.scene.game.scale.width - 100,
        50,
        this.getSpriteName(this.nextPedido.condimento)
      )
      .setOrigin(0.5)
      .setAlpha(0.5);
  }

  getSpriteName(type) {
    // Método para obtener el nombre del sprite según el tipo
    if (type === "blue") return "EmptyBlue";
    if (type === "red") return "EmptyRose";
    if (type === "green") return "EmptyGreen";
    if (type === "orange") return "EmptyOrange";
    if (type === "salt") return "salt";
    if (type === "sugar") return "sugar";
    if (type === "spicy") return "spicy";
  }

  startPedidoTimer() {
    this.timerEvent = this.scene.time.addEvent({
      delay: 1000, // Cada segundo
      callback: () => {
        this.timeRemaining--;
        if (this.timeRemaining <= 0) {
          this.timeExpired();
        }
      },
      loop: true,
    });
  }

  timeExpired() {
    this.generateNewPedido();
    this.scene.pochocloEntregado = false;
    this.scene.condimentoEntregado = false;
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
    this.timeRemaining = 8; // Reiniciar el tiempo

    this.updatePedidoDisplay();
  }

  updatePedidoDisplay() {
    // Actualizar sprites del pedido actual
    this.currentPedidoSprite
      .setTexture(this.getSpriteName(this.currentPedido.pochoclo))
      .setVisible(true)
      .setAlpha(1) // Asegurarse de que sea visible
      .setScale(1) // Restablecer la escala a 1
      .setPosition(this.scene.game.scale.width / 2 - 50, 50); // Restablecer posición

    this.currentCondimentoSprite
      .setTexture(this.getSpriteName(this.currentPedido.condimento))
      .setVisible(true)
      .setAlpha(1) // Asegurarse de que sea visible
      .setScale(1) // Restablecer la escala a 1
      .setPosition(this.scene.game.scale.width / 2 + 50, 50); // Restablecer posición

    // Actualizar sprites del próximo pedido
    this.nextPedidoSprite
      .setTexture(this.getSpriteName(this.nextPedido.pochoclo))
      .setVisible(true)
      .setAlpha(0.5); // Mantener la opacidad reducida para el siguiente pedido

    this.nextCondimentoSprite
      .setTexture(this.getSpriteName(this.nextPedido.condimento))
      .setVisible(true)
      .setAlpha(0.5); // Mantener la opacidad reducida para el siguiente pedido
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
}
