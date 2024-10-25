import { Scene } from "phaser";
import { Bullets } from "../entitities/bullets";
import { WallBrick } from "../entitities/wall";
import { SlingShot } from "../entitities/slingshot";
import { Brick } from "../entitities/bricks";
import { PedidoManager } from "../functions/PedidoManager";
import { BridgeManager } from "../functions/BridgeManager";
import { initialAnims } from "../functions/animsToCooperative";

export class GameCooperative extends Scene {
  constructor() {
    super("GameCoop");

    this.miras = []; // Agregar array para las miras de ambos jugadores
    this.keys = {}; // Inicializa el objeto keys aquí
    this.lastKeyPressTime = 0;

    // Variables para rastrear si los elementos correctos fueron entregados
    this.pochocloEntregado = false;
    this.condimentoEntregado = false;
  }

  init(data) {
    this.points = data.points1 || 0; // Puntaje inicial
    this.game_over_timeout = 35; // Tiempo límite de 30 segundos

    initialAnims(this);

    this.scene.launch("hudCoop", {
      remaining_time: this.game_over_timeout,
      points1: this.points1,
      points2: this.points2,
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
        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout < 0) {
          setTimeout(() => {
            this.scene.stop("hudCoop");
            this.scene.stop("Game1vs1");

            // this.scene.start("GameOverCoop", {
            //   points1: this.points1,
            //   points2: this.points2,
            //   language: this.language,
            // });
          }, 980);
        }
      },
    });
  }

  create() {
    const width = this.game.scale.width;
    const height = this.game.scale.height;

    // Crear el puente
    this.bridgeLeft = this.add
      .sprite(this.scale.width * 0.465, this.scale.height * 0.86, "bridgeLeft")
      .setOrigin(0.5);

    this.bridgeRight = this.add
      .sprite(this.scale.width * 0.535, this.scale.height * 0.86, "bridgeRight")
      .setOrigin(0.5);

    // Inicializar PedidoManager y BridgeManager
    this.pedidoManager = new PedidoManager(this);
    this.bridgeManagerLeft = new BridgeManager(this, this.bridgeLeft);
    this.bridgeManagerRight = new BridgeManager(this, this.bridgeRight);

    // Cinta de movimiento derecha
    this.cintaMovimientoDerecha = this.add
      .sprite(width * 0.8, height * 0.82, "cinta")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(3);
    this.physics.add.existing(this.cintaMovimientoDerecha); // Agrega física al sprite
    this.cintaMovimientoDerecha.body.allowGravity = false;
    this.cintaMovimientoDerecha.body.setImmovable(true);

    // Establecer el tamaño del cuerpo de colisión basado en el tamaño del sprite
    this.cintaMovimientoDerecha.body.setSize(
      this.cintaMovimientoDerecha.width,
      this.cintaMovimientoDerecha.height
    );
    this.cintaMovimientoDerecha.body.setOffset(0, 0);

    // Cinta de movimiento izquierda
    this.cintaMovimientoIzquierda = this.add
      .sprite(width * 0.2, height * 0.82, "cinta")
      .setAlpha(1)
      .setOrigin(0.5)
      .setDepth(3);
    this.physics.add.existing(this.cintaMovimientoIzquierda); // Agrega física al sprite
    this.cintaMovimientoIzquierda.body.allowGravity = false;
    this.cintaMovimientoIzquierda.body.setImmovable(true);

    // Establecer el tamaño del cuerpo de colisión basado en el tamaño del sprite
    this.cintaMovimientoIzquierda.body.setSize(
      this.cintaMovimientoIzquierda.width,
      this.cintaMovimientoIzquierda.height
    );
    this.cintaMovimientoIzquierda.body.setOffset(0, 0);

    this.cintaMovimientoIzquierda.anims.play("MovCintaLeft", true);
    this.cintaMovimientoDerecha.anims.play("MovCintaRight", true);

    // Crear la mira para ambos jugadores
    this.miras.push(this.createMira(width * 0.25, height * 0.5)); // Jugador 1
    this.miras.push(this.createMira(width * 0.75, height * 0.5)); // Jugador 2

    this.wall = new WallBrick(this, 3, 6);

    // Crear grupo para las balas
    this.bullets = this.physics.add.group({
      classType: Bullets,
      maxSize: 10,
      runChildUpdate: true,
      velocityX: 0,
      allowGravity: false,
      collideWorldBounds: false,
    });

    this.fallingObjects = this.physics.add.group({
      runChildUpdate: true,
      velocityY: 570,
      collideWorldBounds: true,
    });

    this.physics.add.overlap(
      this.fallingObjects,
      this.bridgeManagerLeft.bridge,
      this.handleFallingObjectCollision,
      null,
      this
    );

    this.physics.add.overlap(
      this.fallingObjects,
      this.bridgeManagerRight.bridge,
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
        }
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { cooperativeScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

    // Crear los tirachinas
    this.slingShot1 = new SlingShot(this, width * 0.25, height * 0.9, true); // Tirachinas para Jugador 1
    this.slingShot2 = new SlingShot(this, width * 0.75, height * 0.9, false); // Tirachinas para Jugador 2
  }

  // Método para manejar la colisión entre un fallingObject y el puente
  handleFallingObjectCollision(bridge, fallingObject) {
    const currentPedido = this.pedidoManager.getCurrentPedido();
    let pochoclo = this.pedidoManager.getSpriteName(currentPedido.pochoclo);
    let condimento = this.pedidoManager.getSpriteName(currentPedido.condimento);
    console.log(" objeto -> " + fallingObject.texture.key);
    console.log(" pochoclo -> " + pochoclo);
    console.log(" condimento -> " + condimento);
    console.log(" bridge -> " + bridge);
    // Si el objeto es el pedido correcto
    if (fallingObject.texture.key === pochoclo && !this.pochocloEntregado) {
      this.update_points(10); // Sumar 10 puntos
      this.addTime(5); // Añadir 5 segundos al tiempo
      this.pedidoManager.removePedidoItem("pochoclo");
      this.pochocloEntregado = true; // Marcar que el pochoclo ha sido entregado
      console.log("Pedido correcto! POCHOCLO");
    } else if (
      fallingObject.texture.key === condimento &&
      !this.condimentoEntregado
    ) {
      this.update_points(10); // Sumar 10 puntos
      this.addTime(5); // Añadir 5 segundos al tiempo
      this.pedidoManager.removePedidoItem("condimento");
      this.condimentoEntregado = true; // Marcar que el condimento ha sido entregado
      console.log("Pedido correcto! CONDIMENTO");
    } else {
      this.update_points(-5); // Restar 5 puntos

      // Verifica cuál puente colisionó y aplica la animación correspondiente
      if (bridge === this.bridgeLeft) {
        this.bridgeLeft.anims.play("OpBridgeLeft", true); // Abre el puente a la izquierda
        this.bridgeLeft.once("animationcomplete", () => {
          this.bridgeLeft.setTexture(`bridgeLeft`);
        });
      } else if (bridge === this.bridgeRight) {
        this.bridgeRight.anims.play("OpBridgeRight", true); // Abre el puente a la derecha
        this.bridgeRight.once("animationcomplete", () => {
          this.bridgeRight.setTexture(`bridgeRight`);
        });
      }
    }

    fallingObject.destroy(); // Destruir el objeto caído

    // Si ambos, pochoclo y condimento, han sido entregados
    if (this.pochocloEntregado && this.condimentoEntregado) {
      this.update_points(100); // Sumar 100 puntos por completar el pedido
      this.addTime(10); // Añadir 10 segundos al tiempo
      console.log("Pedido completo! +100 puntos, +10 segundos");

      // Reiniciar los marcadores de entrega
      this.pochocloEntregado = false;
      this.condimentoEntregado = false;
    }
  }

  // Método para crear la mira de un jugador
  createMira(x, y) {
    const mira = this.add.sprite(x, y, "bulletSprite").setDepth(10); // Asigna un sprite para la mira
    mira.setInteractive();
    return mira;
  }

  update(time, delta) {
    // Mover miras
    this.handleMiraMovement();

    // Revisar los elementos sobre el puente
    this.bridgeManagerLeft.checkItems();
    this.bridgeManagerRight.checkItems();

    // Actualizar las balas
    this.bullets.children.each((bullet) => {
      if (bullet.active && bullet.y < 25) {
        bullet.body.enable = false;
        bullet.destroy(); // Destruir balas que salgan de la pantalla
      }
    });

    // Disparar para Jugador 1
    if (Phaser.Input.Keyboard.JustDown(this.keys.SPACE)) {
      this.fireBullet(this.miras[0], this.slingShot1);
    }

    // Disparar para Jugador 2
    if (Phaser.Input.Keyboard.JustDown(this.keys.ENTER)) {
      this.fireBullet(this.miras[1], this.slingShot2);
    }

    this.wall.checkAndRegenerateWall();
  }

  handleMiraMovement() {
    // Jugador 1: Mover con WASD
    if (this.keys.W.isDown) {
      this.miras[0].y -= 5;
    }
    if (this.keys.S.isDown) {
      this.miras[0].y += 5;
    }
    if (this.keys.A.isDown) {
      this.miras[0].x -= 5;
    }
    if (this.keys.D.isDown) {
      this.miras[0].x += 5;
    }

    // Jugador 2: Mover con flechas
    if (this.keys.UP.isDown) {
      this.miras[1].y -= 5;
    }
    if (this.keys.DOWN.isDown) {
      this.miras[1].y += 5;
    }
    if (this.keys.LEFT.isDown) {
      this.miras[1].x -= 5;
    }
    if (this.keys.RIGHT.isDown) {
      this.miras[1].x += 5;
    }
  }

  // Método para disparar balas desde el tirachinas
  fireBullet(mira, slingshot) {
    const bullet = this.bullets.get(slingshot.x, slingshot.y); // Obtener una bala del grupo

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

    // Inicializar velocidad
    fallingObject.setVelocityX(0); // Asegurarse de que la velocidad inicial sea 0

    this.fallingObjects.add(fallingObject); // Añadir el objeto al grupo

    // Colisión con la cinta de movimiento derecha
    this.physics.add.collider(
      fallingObject,
      this.cintaMovimientoDerecha,
      () => {
        fallingObject.isOnCinta = true; // Marcar como en contacto con la cinta
        fallingObject.setVelocityX(-320); // Aumentar velocidad a la derecha
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
        fallingObject.setVelocityX(320); // Aumentar velocidad a la izquierda
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
  }
}
