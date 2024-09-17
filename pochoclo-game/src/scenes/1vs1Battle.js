import { Scene } from "phaser";
import { Particles } from "../entitities/particles";
import { MoveBar } from "../entitities/movebar";
// scenes/BattleScene.js
export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
  }

  points1 = 0; // Puntos para el jugador 1
  points2 = 0; // Puntos para el jugador 2
  game_over_timeout = 30; // Tiempo inicial en segundos
  timer_event;

  init(data) {
    // Reset points
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 30; // Tiempo límite de 30 segundos

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("Hud", {
      remaining_time: this.game_over_timeout,
      points1: this.points1,
      points2: this.points2,
    });

    // Temporizador
    this.timer_event = this.time.addEvent({
      delay: 1000,  // Ejecutar cada segundo
      loop: true,
      callback: () => {
        this.game_over_timeout--;

        // Actualizar el tiempo en la escena del HUD
        this.scene.get("Hud").update_timeout(this.game_over_timeout);

        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout <= 0) {
          this.scene.stop("Hud");
          this.scene.start("GameOver");  // Cambia a la escena GameOver
        }
      },
    });
  }

  create() {
    let barHeigth = 95;
    let width = this.game.config.width;
    let height = this.game.config.height;

    // create animations Personaje
    this.anims.create({
      key: "appear",
      frames: this.anims.generateFrameNumbers("pochoclo-anims", {
        start: 0,
        end: 7,
      }),
      frameRate: 10,
    });

    // Crear la barra principal
    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 840, barHeigth, 0x272736);

    const myColors = [0x5f574f, 0xfff1e8, 0x121213, 0x3ca370, 0xffe478]; // 0 GRIS , 1 BLANCO, 2 NEGRO , 3 VERDE, 4 AMARILLO
    let color1 = true;
    let border = 30.2;

    // Array para almacenar los recolectables
    this.collectibles = [];
    // Variable para almacenar el recolectable en colisión
    this.collidingCollectible = null;

    for (let i = 0; i < 28; i++) {
      let keysX = width / 4.6 + i * border;
      let keysY = barraY;
      let rect;

      if (color1) {
        // Fondo
        rect = this.add.rectangle(keysX, keysY, border, barHeigth, myColors[0]); // Barra color
        color1 = false;
      } else {
        rect = this.add.rectangle(keysX, keysY, border, barHeigth, myColors[0]); // Barra color
        color1 = true;
      }

      // Crear el rectángulo pequeño en medio de la barra principal
      let collectibleRect = this.physics.add
        .sprite(
          keysX, // Posición en X centrada
          barraY - 30, // Misma posición Y que la barra principal
          "pochoclo"
        )
        .setScale(0.68);

      // Añadir el recolectable al array
      this.collectibles.push(collectibleRect);

      collectibleRect.anims.play("appear", true);

      // Cuando la animación termine, cambiar la textura a una imagen estática
      collectibleRect.on("animationcomplete", () => {
        collectibleRect.setTexture("pochoclo"); // Cambiar a la imagen estática
      });

      collectibleRect.setImmovable(true);
      collectibleRect.body.allowGravity = false;
    }

    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 432,
      barraY,
      20,
      105,
      3.4,
      0xff004d,
      {
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      },
      true,
      this.mainBar
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 432,
      barraY,
      20,
      105,
      3.4,
      0x29adff,
      {
        left: Phaser.Input.Keyboard.KeyCodes.LEFT,
        right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      },
      false,
      this.mainBar
    );

    // Añadir detección de colisión para recolectables
    this.physics.add.overlap(
      this.movingBar1.bar,
      this.collectibles,
      this.collectItem,
      null,
      this
    );

    this.physics.add.overlap(
      this.movingBar2.bar,
      this.collectibles,
      this.collectItem,
      null,
      this
    );

    // Configurar las teclas para destruir recolectables
    this.spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    ); // Jugador 1
    this.enterKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.ENTER
    ); // Jugador 2
  }

  update() {
    this.movingBar1.update();
    this.movingBar2.update();

    // Si se presiona espacio, jugador 1 destruye un recolectable
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.collectItem(this.movingBar1.bar);
    }

    // Si se presiona enter, jugador 2 destruye un recolectable
    if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {
      this.collectItem(this.movingBar2.bar);
    }
  }

  update_points(points) {
    this.points += points;
    this.scene.get("Hud").update_points(this.points);
  }

  collectItem(movingBar) {
    // Buscar el recolectable que está en la posición de la barra móvil
    let collectibleIndex = this.collectibles.findIndex((c) =>
      Phaser.Geom.Intersects.RectangleToRectangle(
        movingBar.getBounds(),
        c.getBounds()
      )
    );

    if (collectibleIndex !== -1) {
      let collectible = this.collectibles[collectibleIndex];

      if (collectible && !collectible.isDestroyed) {
        collectible.isDestroyed = true; // Marcar el recolectable como destruido

        collectible.destroy(); // Destruir el recolectable

        // Eliminar el recolectable del array
        this.collectibles.splice(collectibleIndex, 1);

        let width = this.game.config.width;
        // Incrementar puntaje según la barra que lo recolecta
        if (movingBar === this.movingBar1.bar) {
          this.points1++;  // Incrementar el puntaje del jugador 1
          this.scene.get("Hud").update_points(1, this.points1);  // Actualizar el HUD

          // Crear partículas que se mueven hacia el punto (10, 10)
          new Particles(
            this,
            collectible.x,
            collectible.y,
            width / 10,
            200,
            true
          );
        } else if (movingBar === this.movingBar2.bar) {
          this.points2++;  // Incrementar el puntaje del jugador 2
          this.scene.get("Hud").update_points(2, this.points2);  // Actualizar el HUD

          // Crear partículas que se mueven hacia el punto (10, 10)
          new Particles(
            this,
            collectible.x,
            collectible.y,
            width / 1.12,
            200,
            false
          );
        }
      }
    }
  }
}
