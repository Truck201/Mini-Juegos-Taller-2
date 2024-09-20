import { Scene } from "phaser";
import { Particles } from "../entitities/particles";
import { MoveBar } from "../entitities/movebar";
import { Character } from "../entitities/character";
import { PopCorn } from "../entitities/popcorn";
import { Television } from "../entitities/television";
// scenes/BattleScene.js
export class BattleScene extends Scene {
  constructor() {
    super("battleScene");
  }

  points1 = 0; // Puntos para el jugador 1
  points2 = 0; // Puntos para el jugador 2
  game_over_timeout; // Tiempo inicial en segundos
  timer_event;

  comboCount1 = 0; // Contador de combo para el jugador 1
  comboCount2 = 0; // Contador de combo para el jugador 2
  comboTimer1; // Temporizador de combo para el jugador 1
  comboTimer2; // Temporizador de combo para el jugador 2
  comboDuration = 3000; // Duración del combo (3 segundos)

  init(data) {
    // Reset points
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 10; // Tiempo límite de 30 segundos

    // Lanzar la escena del HUD, pasando el tiempo y los puntajes iniciales
    this.scene.launch("Hud", {
      remaining_time: this.game_over_timeout,
      points1: this.points1,
      points2: this.points2,
    });

    // Temporizador
    this.timer_event = this.time.addEvent({
      delay: 1000, // Ejecutar cada segundo
      loop: true,
      callback: () => {
        this.game_over_timeout--;

        // Actualizar el tiempo en la escena del HUD
        this.scene.get("Hud").update_timeout(this.game_over_timeout);

        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout <= 0) {
          this.scene.get("Hud").update_cameras();

          setTimeout(() => {
            this.scene.stop("Hud");
            this.scene.start("GameOver"); // Cambia a la escena GameOver
          }, 980);
        }
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.television = new Television(this);

    // Crear instancias de Character
    this.player1 = new Character(this, "mimbo", true, true); // Jugador 1
    this.player2 = new Character(this, "luho", false, true); // Jugador 2

    // Crear la barra principal
    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add.rectangle(barraX, barraY, 840, 95, 0x272736);
    this.imagenBar = this.add.sprite(barraX, barraY, "imagen-barra");
    this.imagenBar.setScale(0.685);

    let border = 30.2;

    // Array para almacenar los recolectables
    this.collectibles = [];

    for (let i = 0; i < 28; i++) {
      let keysX = width / 4.6 + i * border;
      let barraY = (height * 4.3) / 5;

      // Crear el rectángulo pequeño en medio de la barra principal
      let collectibleSprite = new PopCorn(this, keysX, barraY - 30, "pochoclo");

      // Añadir el recolectable al array
      this.collectibles.push(collectibleSprite);
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
      this.collectibles.map((c) => c.collectable),
      this.collectItem,
      null,
      this
    );

    this.physics.add.overlap(
      this.movingBar2.bar,
      this.collectibles.map((c) => c.collectable),
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

    // Resetear combos al iniciar la escena
    this.player1.resetCombo();
    this.player2.resetCombo();
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

    // Actualizar el texto de la televisión según el tiempo restante
    this.television.updateText(this.game_over_timeout);
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
          this.points1++; // Incrementar el puntaje del jugador 1
          this.scene.get("Hud").update_points(1, this.points1); // Actualizar el HUD

          this.player1.handleCombo(1);

          // Crear partículas que se mueven hacia el punto (10, 10)
          new Particles(
            this,
            collectible.x,
            collectible.y,
            width / 10,
            200,
            true
          );
          // Agregar función de Emoción
        } else if (movingBar === this.movingBar2.bar) {
          this.points2++; // Incrementar el puntaje del jugador 2
          this.scene.get("Hud").update_points(2, this.points2); // Actualizar el HUD

          this.player1.handleCombo(2);

          // Crear partículas que se mueven hacia el punto (10, 10)
          new Particles(
            this,
            collectible.x,
            collectible.y,
            width / 1.12,
            200,
            false
          );
          // Agregar función de Emoción
        }
      }
    }
  }
}
