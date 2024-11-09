import { Scene } from "phaser";
import { Particles } from "../functions/particles";
import { MoveBar } from "../entitities/movebar";
import { Character } from "../entitities/character";
import { PopCorn } from "../entitities/popcorn";
import { Television } from "../entitities/television";
import { ComboPersonajes } from "../functions/combo";
import { KidKorn } from "../entitities/kidkorn";

export class RecolectScene extends Scene {
  constructor() {
    super("recolectScene");
    this.backgroundMusic = null; // Asegurarse de tener la referencia disponible
    this.lastKeyPressTime = 0;
    this.lastKidKornTime = 0; // Añadir esta variable
  }

  points1 = 0; // Puntos para el jugador 1
  points2 = 0; // Puntos para el jugador 2
  game_over_timeout; // Tiempo inicial en segundos
  timer_event;

  comboCount1 = 0; // Contador de combo para el jugador 1
  comboCount2 = 0; // Contador de combo para el jugador 2
  comboTimer1; // Temporizador de combo para el jugador 1
  comboTimer2; // Temporizador de combo para el jugador 2
  comboDuration = 60000; // Duración del combo (3 segundos)

  popcornTimer; // Temporizador para la aparición de pochoclos

  init(data) {
    // Reset points
    this.points1 = data.points1 || 0; // Puntaje inicial jugador 1
    this.points2 = data.points2 || 0; // Puntaje inicial jugador 2
    this.game_over_timeout = 40; // Tiempo límite de 30 segundos
    this.dialogues = data.dialogues;
    this.language = data.language;

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
              language: this.language,
            }); // Cambia a la escena Shop
          }, 980);
        }

        if (this.game_over_timeout === 10) {
          this.kidKorn.showKidKornBig(); // Mostrar KidKorn cuando queden 10 segundos
        }
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    // Añadimos sonidos
    this.appearPopcorn1 = this.sound.add("appearPopcorn1", { volume: 0.09 });
    this.appearPopcorn2 = this.sound.add("appearPopcorn2", { volume: 0.09 });
    this.collectPopcorn = this.sound.add("collectPopcorn", { volume: 0.09 });
    // this.popcornBuff = this.sound.add("");

    this.television = new Television(this, false);

    this.kidKorn = new KidKorn(this, this.dialogues);

    // Iniciar el temporizador aleatorio para que KidKorn aparezca
    this.kidKorn.startKidKornAppearance();

    let background = this.add.sprite(width * 0.5, height * 0.5, "escenario");
    background.setDepth(2);
    background.setScale(1.15);

    let shadows = this.add.sprite(width * 0.5, height * 0.5, "shadowTotal");
    shadows.setDepth(3);
    shadows.setScale(1.15);

    // Crear la barra principal
    let barraX = width / 2; // Posición Barra en X
    let barraY = (height * 4) / 5; // Posición de alto en las barras Y

    this.imagenBar = this.add
      .sprite(barraX, barraY, "imagen-barra")
      .setScale(1.5)
      .setDepth(10);

    let border = 35;

    // Array para almacenar los recolectables
    this.collectibles = [];

    for (let i = 0; i < 28; i++) {
      let keysX = width / 5.83 + i * border;
      let barraY = (height * 4) / 5;
      let n = Phaser.Math.Between(0, 11);

      if (n > 9) {
        // Crear el rectángulo pequeño en medio de la barra principal
        let collectibleSprite = new PopCorn(this, keysX, barraY, "pochoclo");
        this.appearPopcorn2.play();
        // Añadir el recolectable al array
        this.collectibles.push(collectibleSprite);
      }
    }

    // Crear instancias de Character
    const player1 = new Character(this, "mimbo", true, false); // Jugador 1
    const player2 = new Character(this, "luho", false, false); // Jugador 2

    this.player1 = player1;
    this.player2 = player2;

    player1.change_emotion("Mimbo", 0, player1);
    player2.change_emotion("Luho", 0, player2);

    this.combo1 = new ComboPersonajes(this, 1);
    this.combo1.create();

    this.combo2 = new ComboPersonajes(this, 2);
    this.combo2.create();

    // Crear barras móviles usando la clase MoveBar
    this.movingBar1 = new MoveBar(
      this,
      barraX - 760,
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
      this.imagenBar,
      1.2
    );

    this.movingBar2 = new MoveBar(
      this,
      barraX + 760,
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
      this.imagenBar,
      1.2
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

    this.input.keyboard.on("keydown-ESC", () => {
      const currentTime = this.time.now;
      // Verificar si ha pasado suficiente tiempo desde la última pulsación
      if (currentTime - this.lastKeyPressTime > 250) {
        // 700 ms de delay
        this.lastKeyPressTime = currentTime;
        this.scene.pause("recolectScene");
        // Pausar la música de la escena recolectScene
        const recolectScene = this.scene.get("recolectScene");
        if (recolectScene.backgroundMusic) {
          recolectScene.backgroundMusic.pause();
        }
        console.log("Pause Game");
        this.scene.launch("PauseMenu", { mainScene: this });
        this.scene.bringToTop("PauseMenu");
      }
    });

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
      delay: Phaser.Math.Between(6000, 9000),
      loop: true,
      callback: () => {
        if (this.game_over_timeout > 0) {
          this.generateMultiplePopcorn(); // Generar pochoclos
        }
      },
    });
  }

  generateMultiplePopcorn() {
    let numberOfPopcorn = Phaser.Math.Between(3, 5); // Generar
    let minDistance = 55; // Distancia mínima entre pochoclos
    let generatedPositions = []; // Array para almacenar las posiciones generadas

    for (let i = 0; i < numberOfPopcorn; i++) {
      let randomX;
      let isFarEnough;

      // Generar una posición aleatoria y verificar que no colisione con otras
      for (let attempt = 0; attempt < 10; attempt++) {
        // Hasta 10 intentos para encontrar una posición válida
        randomX = Phaser.Math.Between(
          this.imagenBar.x - this.imagenBar.width / 2 - 165,
          this.imagenBar.x + this.imagenBar.width / 2 + 165
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

        let barraY = this.imagenBar.y;

        // Crear temporizador para generar cada pochoclo en un tiempo aleatorio
        this.time.delayedCall(
          Phaser.Math.Between(300, 900),
          () => {
            let newPopcorn = new PopCorn(this, randomX, barraY, "pochoclo");
            this.collectibles.push(newPopcorn); // Añadir al array de recolectables
            let num = Phaser.Math.Between(0, 1);
            if (num <= 0.5) {
              this.appearPopcorn1.play();
            } else if (num > 0.5) {
              this.appearPopcorn2.play();
            }
          },
          null,
          this
        );
      }
    }
  }

  startGeneratingPopcorn(param) {
    // Generar pochoclos adicionales durante los 6 segundos en que KidKorn está en la pantalla
    this.popcornTimer = this.time.addEvent({
      delay: 600, // Generar cada medio segundo
      loop: true,
      callback: () => {
        if (this.game_over_timeout > 0) {
          this.generateMultiplePopcorn(); // Generar pochoclos mientras KidKorn está presente
        }
      },
    });

    if (param) {
      // Detener la generación de pochoclos después de 6 segundos
      this.time.delayedCall(4200, () => {
        this.popcornTimer.remove(); // Detener la generación de pochoclos
      });
    } else if (!param) {
      // Detener la generación de pochoclos después de 6 segundos
      this.time.delayedCall(1800, () => {
        this.popcornTimer.remove(); // Detener la generación de pochoclos
      });
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

        this.collectPopcorn.play();
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
