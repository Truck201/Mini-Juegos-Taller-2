import { Scene } from "phaser";
import { Particles } from "../entitities/particles";
import { MoveBar } from "../entitities/movebar";
import { Character } from "../entitities/character";
import { PopCorn } from "../entitities/popcorn";
import { Television } from "../entitities/television";
import { ComboPersonajes } from "../entitities/combo";

export class RecolectScene extends Scene {
  constructor() {
    super("recolectScene");
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

  popcornTimer; // Temporizador para la aparición de pochoclos

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
        if (this.game_over_timeout >= 0) {
          this.game_over_timeout--;

        // Actualizar el tiempo en la escena del HUD
        this.scene.get("Hud").update_timeout(this.game_over_timeout);
        }
        // Comprobar si el tiempo ha terminado
        if (this.game_over_timeout < 0) {
          setTimeout(() => {
            this.scene.stop("Hud");
            this.scene.stop("Game1vs1");
            this.scene.stop("recolectScene");
            this.scene.start("Shop", {
              points1: this.points1,
              points2: this.points2,
            }); // Cambia a la escena Shop
          }, 1300);
        }
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    this.television = new Television(this);

    let background = this.add.sprite(width / 2, height / 2 + 65, "escenario");
    background.setDepth(1);

    // Crear la barra principal
    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4.3) / 5; // Posición de alto en las barras Y
    this.mainBar = this.add
      .rectangle(barraX, barraY, 1000, 95, 0x272736)
      .setDepth(2);
    this.imagenBar = this.add
      .sprite(barraX, barraY, "imagen-barra")
      .setDepth(2);

    let border = 35;

    // Array para almacenar los recolectables
    this.collectibles = [];

    for (let i = 0; i < 28; i++) {
      let keysX = width / 5.83 + i * border;
      let barraY = (height * 4.3) / 5;
      let n = Phaser.Math.Between(0, 11);

      if (n > 9) {
        // Crear el rectángulo pequeño en medio de la barra principal
        let collectibleSprite = new PopCorn(this, keysX, barraY, "pochoclo");

        // Añadir el recolectable al array
        this.collectibles.push(collectibleSprite);
      }
    }

    // Crear instancias de Character
    this.player1 = new Character(this, "mimbo", true); // Jugador 1
    this.player2 = new Character(this, "luho", false); // Jugador 2

    this.combo1 = new ComboPersonajes(this, 1);
    this.combo1.create();

    this.combo2 = new ComboPersonajes(this, 2);
    this.combo2.create();
    
    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 500,
      barraY,
      20,
      105,
      9.6,
      "anilla-roja",
      {
        left: Phaser.Input.Keyboard.KeyCodes.A,
        right: Phaser.Input.Keyboard.KeyCodes.D,
      },
      true,
      this.mainBar
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 500,
      barraY,
      20,
      105,
      9.6,
      "anilla-azul",
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
    this.combo1.resetCombo();
    this.combo2.resetCombo();

    // Inicializar el temporizador para generar pochoclos
    this.startPopcornTimer();
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

  startPopcornTimer() {
    this.popcornTimer = this.time.addEvent({
      delay: Phaser.Math.Between(1300, 4000),
      loop: true,
      callback: () => {
        if (this.game_over_timeout > 0) {
          this.generateMultiplePopcorn(); // Generar pochoclos
        }
      },
    });
  }

  generateMultiplePopcorn() {
    let numberOfPopcorn = Phaser.Math.Between(3, 7); // Generar
    let minDistance = 50; // Distancia mínima entre pochoclos
    let generatedPositions = []; // Array para almacenar las posiciones generadas

    for (let i = 0; i < numberOfPopcorn; i++) {
      let randomX;
      let isFarEnough;

      // Generar una posición aleatoria y verificar que no colisione con otras
      for (let attempt = 0; attempt < 10; attempt++) {
        // Hasta 10 intentos para encontrar una posición válida
        randomX = Phaser.Math.Between(
          this.mainBar.x - this.mainBar.width / 2,
          this.mainBar.x + this.mainBar.width / 2
        );
        isFarEnough = true;

        // Verificar si la posición está lejos de las posiciones ya generadas
        for (let j = 0; j < generatedPositions.length; j++) {
          if (Math.abs(randomX - generatedPositions[j]) < minDistance) {
            isFarEnough = false;
            break;
          }
        }

        if (isFarEnough) {
          break; // Si se encontró una posición válida, salir del bucle
        }
      }

      // Guardar la posición si es válida
      if (isFarEnough) {
        generatedPositions.push(randomX);

        let barraY = this.mainBar.y;

        // Crear temporizador para generar cada pochoclo en un tiempo aleatorio
        this.time.delayedCall(
          Phaser.Math.Between(400, 1100),
          () => {
            let newPopcorn = new PopCorn(this, randomX, barraY, "pochoclo");
            this.collectibles.push(newPopcorn); // Añadir al array de recolectables
          },
          null,
          this
        );
      }
    }
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

          this.combo1.handleCombo(1);

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

          this.combo2.handleCombo(2);

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