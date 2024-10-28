import { Scene } from "phaser";
import { Bullets } from "../entitities/bullets";
import { WallBrick } from "../entitities/wall";
import { SlingShot } from "../entitities/slingshot";
import { Brick } from "../entitities/bricks";
import { PedidoManager } from "../functions/PedidoManager";
import { BridgeManager } from "../functions/BridgeManager";
import { initialAnims } from "../functions/animsToCooperative";
import { getLanguageConfig } from "../services/translations";
import { Character } from "../entitities/character";
import { addSoundsCooperative } from "../functions/addSoundsCooperative";

export class GameCooperative extends Scene {
  constructor() {
    super("GameCoop");

    this.miras = []; // Agregar array para las miras de ambos jugadores
    this.keys = {}; // Inicializa el objeto keys aquí
    this.lastKeyPressTime = 0;

    this.lastFireTimePlayer1 = 0;
    this.lastFireTimePlayer2 = 0;
    this.fireDelay = 500; // 500 ms de retraso entre disparos

    // Variables para rastrear si los elementos correctos fueron entregados
    this.pochocloEntregado = false;
    this.condimentoEntregado = false;

    this.delivered = [];
    this.waiterPopcorn = [];
    this.waiterCondimento = [];
    this.discarted = [];
  }

  init(data) {
    this.points = data.points || 0; // Puntaje inicial
    this.game_over_timeout = 40; // Tiempo límite de 30 segundos
    this.language = data.language || getLanguageConfig();

    initialAnims(this);

    this.scene.launch("hudCoop", {
      remaining_time: this.game_over_timeout,
      points: this.points,
    });

    // Temporizador
    this.timer_event = this.time.addEvent({
      delay: 1000, // Ejecutar cada segundo
      loop: true,
      callback: () => {
        if (this.game_over_timeout >= 0) {
          this.game_over_timeout--;

          // Actualizar el tiempo en la escena del HUD
          this.scene.get("hudCoop").update_timeout(this.game_over_timeout);
        }
        if (this.game_over_timeout <= 10) {
          this.lastSeconds.play();
        }
        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout < 0) {
          setTimeout(() => {
            this.scene.stop("hudCoop");
            this.scene.pause("GameCoop");

            this.scene.launch("GameOverCoop", {
              point: this.points,
            });
            this.winnerSound.play();
            this.backgroundMusic.stop();
            this.lastSeconds.stop();
            this.scene.bringToTop("GameOverCoop");
          }, 980);
        }
      },
    });
  }

  create() {
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    this.sadLuho = this.sound.add("sadLuhoSound", { volume: 0.09 });
    this.embarassLuho = this.sound.add("embarassLuho", { volume: 0.09 }); // añadir
    this.angryLuho = this.sound.add("angryLuho", { volume: 0.09 }); // añadir
    this.happyLuho = this.sound.add("happyLuho", { volume: 0.09 }); // añadir

    this.cryMimbo = this.sound.add("cryMimbo", { volume: 0.09 }); // añadir
    this.angryMimbo = this.sound.add("angryMimbo", { volume: 0.09 }); // añadir
    this.happyMimbo1 = this.sound.add("happyMimbo1", { volume: 0.09 }); // añadir
    this.happyMimbo2 = this.sound.add("happyMimbo2", { volume: 0.09 }); // añadir

    addSoundsCooperative(this);
    this.backgroundMusic.play();

    // Añadimos el fondo
    this.background = this.add.image(
      width * 0.5,
      height * 0.5,
      "BackgroundCoop"
    );
    this.background.setDepth(1);

    this.player1 = new Character(this, "mimbo", true, true);
    this.player2 = new Character(this, "luho", false, true);

    this.player1.change_emotion("Mimbo", 0, this.scene.player1);
    this.player2.change_emotion("Luho", 0, this.scene.player2);

    // Añadimos fondo de pedidos
    this.boxDelivers = this.add.image(
      width * 0.5,
      height * 0.335,
      "CurrentDelivers"
    );
    this.boxDelivers.setDepth(2);

    this.anims.create({
      key: "mothman_idle",
      frames: this.anims.generateFrameNumbers("mothman", {
        start: 0,
        end: 1,
      }),
      frameRate: 2,
      repeat: -1, // La animación se repite indefinidamente
    });

    this.mothman = this.add
      .sprite(width * 0.5, height * 0.68, "mothman")
      .setDepth(4);
    this.physics.add.existing(this.mothman);
    this.mothman.setImmovable;
    this.mothman.body.allowGravity = false;
    this.mothman.play("mothman_idle", true);

    // Añadimos Flechas
    this.arrowsDelivers = this.add.sprite(width * 0.5, height * 0.4, "");
    this.arrowsDelivers.setDepth(2);
    this.arrowsDelivers.setVisible(true);
    this.arrowsDelivers.anims.play("arrows-idle", true);

    // Crear el puente
    this.bridgeSprite = this.add
      .sprite(this.scale.width * 0.5, this.scale.height * 0.775, "BridgeSprite")
      .setOrigin(0.5)
      .setScale(1.12);

    // Inicializar PedidoManager y BridgeManager
    this.pedidoManager = new PedidoManager(this);
    this.bridgeManager = new BridgeManager(this, this.bridgeSprite);

    // Cinta de movimiento derecha
    this.cintaMovimientoDerecha = this.add
      .sprite(width * 0.8, height * 0.695, "cinta")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(3);
    this.physics.add.existing(this.cintaMovimientoDerecha); // Agrega física al sprite
    this.cintaMovimientoDerecha.body.allowGravity = false;
    this.cintaMovimientoDerecha.body.setImmovable(true);

    // Establecer el tamaño del cuerpo de colisión basado en el tamaño del sprite
    this.cintaMovimientoDerecha.body.setSize(
      this.cintaMovimientoDerecha.width - 40,
      this.cintaMovimientoDerecha.height
    );
    this.cintaMovimientoDerecha.body.setOffset(0, 30);

    // Cinta de movimiento izquierda
    this.cintaMovimientoIzquierda = this.add
      .sprite(width * 0.2, height * 0.695, "cinta")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(3);
    this.physics.add.existing(this.cintaMovimientoIzquierda); // Agrega física al sprite
    this.cintaMovimientoIzquierda.body.allowGravity = false;
    this.cintaMovimientoIzquierda.body.setImmovable(true);

    // Establecer el tamaño del cuerpo de colisión basado en el tamaño del sprite
    this.cintaMovimientoIzquierda.body.setSize(
      this.cintaMovimientoIzquierda.width,
      this.cintaMovimientoIzquierda.height - 40
    );
    this.cintaMovimientoIzquierda.body.setOffset(0, 30);

    this.cintaMovimientoIzquierda.anims.play("MovCintaLeft", true);
    this.cintaMovimientoDerecha.anims.play("MovCintaRight", true);

    // Crear la mira para ambos jugadores
    this.miras.push(this.createMira(width * 0.25, height * 0.5, true)); // Jugador 1
    this.miras.push(this.createMira(width * 0.75, height * 0.5, false)); // Jugador 2

    this.wall = new WallBrick(this, 4, 4);

    // Crear grupo para las balas
    this.bullets = this.physics.add.group({
      classType: Bullets,
      maxSize: 10,
      runChildUpdate: true,
      velocityX: 0,
      allowGravity: false,
      collideWorldBounds: true,
      bounceX: true,
    });

    this.fallingObjects = this.physics.add.group({
      runChildUpdate: true,
      velocityY: 570,
      collideWorldBounds: true,
    });

    this.physics.add.overlap(
      this.fallingObjects,
      this.bridgeManager.bridge,
      this.handleFallingObjectCollision,
      null,
      this
    );

    // Detectar colisiones entre balas y ladrillos
    this.physics.add.collider(
      this.bullets.getChildren(),
      this.wall.getChildren(),
      this.onBulletHitBrick,
      null,
      this
    );

    // Asignar teclas para Jugador 1 (WASD)
    this.keys.W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keys.A = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.keys.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.keys.D = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    // Asignar teclas para disparar Jugador 1
    this.keys.SPACE = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Asignar teclas para Jugador 2 (Flechas)
    this.keys.UP = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.UP
    );
    this.keys.DOWN = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.DOWN
    );
    this.keys.LEFT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.LEFT
    );
    this.keys.RIGHT = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.RIGHT
    );

    // Asignar teclas para disparar Jugador 2
    this.keys.ENTER = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    );

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause("GameCoop");
        // Pausar la música de la escena cooperativeScene
        const cooperativeScene = this.scene.get("GameCoop");
        if (cooperativeScene.backgroundMusic) {
          cooperativeScene.backgroundMusic.pause();
          cooperativeScene.lastSeconds.pause();
        }
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { cooperativeScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    // Crear los tirachinas
    this.slingShot1 = new SlingShot(this, width * 0.25, height * 0.9, false); // Tirachinas para Jugador 1
    this.slingShot2 = new SlingShot(this, width * 0.75, height * 0.9, true); // Tirachinas para Jugador 2
  }

  // Método para manejar la colisión entre un fallingObject y el puente
  handleFallingObjectCollision(bridge, fallingObject) {
    const currentPedido = this.pedidoManager.getCurrentPedido();
    let pochoclo = this.pedidoManager.getSpriteName(currentPedido.pochoclo);
    let condimento = this.pedidoManager.getSpriteName(currentPedido.condimento);
    console.log("current pedido ->" + currentPedido);
    console.log("pochoclo ->" + pochoclo);
    console.log("condimento ->" + condimento);
    console.log("textura objeto caido ->" + fallingObject.texture.key);

    // Verificar si el objeto coincide con los elementos del pedido
    if (fallingObject.texture.key === pochoclo && this.pochocloEntregado) {
      console.log("mismo producto Pochoclo");
      this.waiterPopcorn.push(fallingObject);
      this.waiterPopcorn.forEach((obj) => obj.destroy());
    } else if (
      fallingObject.texture.key === condimento &&
      this.condimentoEntregado
    ) {
      console.log("mismo producto Condiment");
      this.waiterCondimento.push(fallingObject);
      this.waiterCondimento.forEach((obj) => obj.destroy());
    } else if (
      fallingObject.texture.key === pochoclo &&
      !this.pochocloEntregado
    ) {
      fallingObject.setVelocityY(0);
      this.delivered.push(fallingObject); // Agregar a la lista de delivered
      this.pochocloEntregado = true;
      this.deliveredSound.play();
      console.log("correcto 1 pochoclo");
    } else if (
      fallingObject.texture.key === condimento &&
      !this.condimentoEntregado
    ) {
      fallingObject.setVelocityY(0);
      this.delivered.push(fallingObject); // Agregar a la lista de delivered
      this.condimentoEntregado = true;
      this.deliveredSound.play();
      console.log("correcto 2 condimento");
    } else {
      // Si el elemento es incorrecto, restar puntos y limpiar la lista de delivered
      this.discarted.push(fallingObject);
      this.addTime(-5);
      this.showTimerAdder(5, false)
      this.looseChance.play();
      this.loosePoints.play();
      this.sadLuho.play();
      this.angryMimbo.play();
      this.pedidoManager.emotionCharacters("negative");
      this.discarted.forEach((obj) => obj.destroy());
      this.discarted = [];
      console.log("negativo !!");
    }

    // Si ambos elementos del pedido están presentes en la lista
    if (this.pochocloEntregado && this.condimentoEntregado) {
      const validado = this.pedidoManager.validatePedido(this.delivered);
      if (validado) {
        this.winnerSound.play();
        let num = Phaser.Math.Between(0,1)
        num === 1 ? this.happyMimbo1.play() : this.happyMimbo2.play();
        this.happyLuho.play();
        this.update_points(50); // Sumar puntos si el pedido es correcto
        this.winTimer.play();
        this.addTime(15); // Añadir tiempo
        this.showTimerAdder(15, true)
        console.log("correcto !!");
      } else {
        this.update_points(-10); // Restar puntos por pedido incorrecto
        console.log("malchequeo");
      }
    }
  }

  // Método para crear la mira de un jugador
  createMira(x, y, isPlayerOne) {
    let spriteName;
    if (isPlayerOne) {
      spriteName = "miraPlayerOne";
    } else {
      spriteName = "miraPlayerTwo";
    }
    const mira = this.add.sprite(x, y, spriteName).setDepth(10); // Asigna un sprite para la mira
    mira.setInteractive();
    return mira;
  }

  update(time, delta) {
    // Mover miras
    this.handleMiraMovement();

    // Actualizar las balas
    this.bullets.children.each((bullet) => {
      if (bullet.active && bullet.y < 25) {
        bullet.body.enable = false;
        bullet.destroy(); // Destruir balas que salgan de la pantalla
      }
    });

    // Disparar para Jugador 1 si ha pasado el tiempo de espera
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      if (time > this.lastFireTimePlayer1 + this.fireDelay) {
        this.fireBullet(this.miras[0], this.slingShot1);
        this.lastFireTimePlayer1 = time; // Actualizar el tiempo del último disparo
      }
    }

    // Disparar para Jugador 2 si ha pasado el tiempo de espera
    if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      if (time > this.lastFireTimePlayer2 + this.fireDelay) {
        this.fireBullet(this.miras[1], this.slingShot2);
        this.lastFireTimePlayer2 = time; // Actualizar el tiempo del último disparo
      }
    }

    this.wall.checkAndRegenerateWall();
  }

  handleMiraMovement() {
    const speed = 8;
    const width = this.game.scale.width; // Ancho de la pantalla
    const height = this.game.scale.height; // Alto de la pantalla
    let offset = 50;
    // Jugador 1: Límite en la mitad izquierda de la pantalla
    const leftBoundary = offset;
    const rightBoundaryPlayer1 = width / 2 - offset;

    // Jugador 2: Límite en la mitad derecha de la pantalla
    const leftBoundaryPlayer2 = width / 2 + offset;
    const rightBoundary = width - offset;

    // Jugador 1: Mover con WASD
    if (this.keys.W.isDown) {
      this.miras[0].y = Phaser.Math.Clamp(this.miras[0].y - speed, 0, height);
    }
    if (this.keys.S.isDown) {
      this.miras[0].y = Phaser.Math.Clamp(this.miras[0].y + speed, 0, height);
    }
    if (this.keys.A.isDown) {
      this.miras[0].x = Phaser.Math.Clamp(
        this.miras[0].x - speed,
        leftBoundary,
        rightBoundaryPlayer1
      );
    }
    if (this.keys.D.isDown) {
      this.miras[0].x = Phaser.Math.Clamp(
        this.miras[0].x + speed,
        leftBoundary,
        rightBoundaryPlayer1
      );
    }

    // Jugador 2: Mover con flechas direccionales
    if (this.keys.UP.isDown) {
      this.miras[1].y = Phaser.Math.Clamp(this.miras[1].y - speed, 0, height);
    }
    if (this.keys.DOWN.isDown) {
      this.miras[1].y = Phaser.Math.Clamp(this.miras[1].y + speed, 0, height);
    }
    if (this.keys.LEFT.isDown) {
      this.miras[1].x = Phaser.Math.Clamp(
        this.miras[1].x - speed,
        leftBoundaryPlayer2,
        rightBoundary
      );
    }
    if (this.keys.RIGHT.isDown) {
      this.miras[1].x = Phaser.Math.Clamp(
        this.miras[1].x + speed,
        leftBoundaryPlayer2,
        rightBoundary
      );
    }
  }

  // Método para disparar balas desde el tirachinas
  fireBullet(mira, slingshot) {
    const bullet = this.bullets.get(slingshot.x, slingshot.y); // Obtener una bala del grupo
    this.chargeSlingshot.play();
    this.shoot.play();

    if (bullet) {
      bullet.setActive(true);
      bullet.setVisible(true);

      // Calcular el ángulo entre el tirachinas y la mira
      const angle = Phaser.Math.Angle.Between(
        slingshot.x,
        slingshot.y,
        mira.x,
        mira.y
      );

      // Establecer la velocidad en X e Y basado en el ángulo
      const velocityX = Math.cos(angle) * 700;
      const velocityY = Math.sin(angle) * 700;

      // Aplicar la velocidad a la bala
      bullet.setVelocity(velocityX, velocityY);
    }
  }

  createFallingObject(x, y, type) {
    let fallingObject = this.physics.add.sprite(x, y, type);

    // Aplicar física y comportamiento de caída
    fallingObject.setCollideWorldBounds(true);
    fallingObject.body.allowGravity = true;
    fallingObject.body.gravity.y = 300;
    fallingObject.setDepth(8);

    // Inicializar velocidad
    fallingObject.setVelocityX(0); // Asegurarse de que la velocidad inicial sea 0

    this.fallingObjects.add(fallingObject); // Añadir el objeto al grupo
    const cintaSpeed = 270;
    // Colisión con la cinta de movimiento derecha
    this.physics.add.collider(
      fallingObject,
      this.cintaMovimientoDerecha,
      () => {
        fallingObject.isOnCinta = true; // Marcar como en contacto con la cinta
        fallingObject.setVelocityX(-cintaSpeed); // Aumentar velocidad a la derecha
      },
      null,
      this
    );

    // Colisión con la cinta de movimiento izquierda
    this.physics.add.collider(
      fallingObject,
      this.cintaMovimientoIzquierda,
      () => {
        fallingObject.isOnCinta = true; // Marcar como en contacto con la cinta
        fallingObject.setVelocityX(cintaSpeed); // Aumentar velocidad a la izquierda
      },
      null,
      this
    );

    // Detectar cuando el objeto sale de las cintas
    this.physics.add.overlap(
      fallingObject,
      [this.cintaMovimientoDerecha, this.cintaMovimientoIzquierda],
      (fallingObj, cinta) => {
        // Solo se aplica si se está en contacto con la cinta
        if (!fallingObj.body.touching.down) {
          // Se está saliendo de la cinta
          fallingObj.isOnCinta = false; // Actualizar estado
          fallingObj.setVelocityX(0); // Detener movimiento en X
          fallingObj.setVelocityY(fallingObj.body.velocity.y); // Mantener la velocidad de caída
        }
      },
      null,
      this
    );
  }

  // Colisión entre bala y ladrillo
  onBulletHitBrick(bullet, brick) {
    if (brick instanceof Brick) {
      brick.hit(); // Cambia el color del ladrillo o lo destruye
      let num = Phaser.Math.Between(0, 1);
      num === 1 ? this.bagFall1.play() : this.bagFall2.play();
      this.hit.play();
      bullet.destroyBullet(); // Llama al método de la clase Bullets
      console.log("Bala destruida al chocar con un ladrillo");
      return true;
    } else {
      console.warn("El objeto no es una instancia de Brick:", brick);
    }
    return false;
  }

  update_points(amount) {
    this.points += amount;
    this.scene.get("hudCoop").update_points(this.points);
  }

  addTime(seconds) {
    this.game_over_timeout += seconds;
    this.scene.get("hudCoop").update_timeout(this.game_over_timeout);
    if (this.game_over_timeout > 10) {
      this.lastSeconds.stop();
    }
  }

  showTimerAdder(time, isPositive) {
    if (isPositive) {
      this.addingTimer = `+ ${time}`
    } else {
      this.addingTimer = `- ${time}`
    }
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    const adderTimer = this.add
    .text(width * 0.5, height * 0.6, `${this.addingTimer.toString()}s`, {
      fontSize: "35px",
      color: "#fff",
      fontFamily: "'Press Start 2P'",
      fontWeight: "bold",
      shadow: {
        color: "#000000",
        fill: true,
        offsetX: 3,
        offsetY: 3,
      },
    })
    .setOrigin(0.5)
    .setDepth(15);

  this.tweens.add({
    targets: adderTimer,
    scale: { from: 2.5, to: 4.2 }, // Agrandar el texto
    alpha: { from: 1, to: 0 }, // Desaparecer el texto
    duration: 1800, // Duración de la animación (1 segundo)
    ease: "Power2",
    onComplete: () => {
      adderTimer.destroy(); // Eliminar el texto después de la animación
    },
  });
  }
}
