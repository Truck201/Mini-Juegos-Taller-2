import { Scene } from "phaser";

export class PreloaderBattle extends Scene {
  constructor() {
    super("PreloadBattle");
  }

  init(data) {
    this.selectedItems = data.purchasedItems;
    this.selected1Player = data.selectedItemsPlayer1;
    this.selected2Player = data.selectedItemsPlayer2;
  }

  preload() {
    // Battle
    // Sword
    this.load.image(
      "static-sword",
      "/assets/versus/battle/events/static-sword.png"
    );

    this.load.spritesheet(
      "b-sword",
      "/assets/versus/battle/events/idle-brkn-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "idle-sword",
      "/assets/versus/battle/events/idle-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "r-sword",
      "/assets/versus/battle/events/rotate-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    // Heart
    this.load.image(
      "static-heart",
      "/assets/versus/battle/events/static-heart.png"
    );

    this.load.spritesheet(
      "idle-heart",
      "/assets/versus/battle/events/idle-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    this.load.spritesheet(
      "flying-heart",
      "/assets/versus/battle/events/flying-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    // Shield
    this.load.image(
      "static-shield",
      "/assets/versus/battle/events/static-shield.png"
    );

    this.load.spritesheet(
      "idle-shield",
      "/assets/versus/battle/events/idle-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );

    this.load.spritesheet(
      "r-shield",
      "/assets/versus/battle/events/rotate-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );

    // Popcorn Event Rain
    this.load.image("popcorn1", "/assets/versus/anims/popcorn.png");
    this.load.image("popcorn2", "/assets/versus/anims/popcorn.png");
    this.load.image("popcorn3", "/assets/versus/anims/popcorn.png");

    // Animación Evento Rain[Popcorn]
    this.load.spritesheet(
      "popcorn1Sprites",
      "/assets/versus/battle/events/pochoclo-clasico.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      "popcorn2Sprites",
      "/assets/versus/battle/events/pochoclo-morado.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      "popcorn3Sprites",
      "/assets/versus/battle/events/pochoclo-naranja.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    // Sprite Health Static
    this.load.image(
      "healthStatic",
      "/assets/versus/battle/vida/hearth.png"
    );
    this.load.image(
      "healthStaticDeath",
      "/assets/versus/battle/vida/dead-hearth.png"
    );

    // SpriteSheet Hearth
    this.load.spritesheet(
      "healthBarIdle",
      "/assets/versus/battle/vida/idle-hearth.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    // Spritesheet Thunder
    this.load.spritesheet(
      "thunderbolt",
      "/assets/versus/battle/thunder.png",
      {
        frameWidth: 68,
        frameHeight: 240,
      }
    );

    // Anims HealthBar
    this.load.spritesheet(
      "healthBarExtra1",
      "/assets/versus/battle/vida/xtra-vida1.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra2",
      "/assets/versus/battle/vida/xtra-vida2.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra3",
      "/assets/versus/battle/vida/xtra-vida3.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra4",
      "/assets/versus/battle/vida/xtra-vida4.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra5",
      "/assets/versus/battle/vida/xtra-vida5.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    // Barra de vida
    this.load.image(
      "healthBar5",
      "/assets/versus/battle/vida/vida5.png"
    );
    this.load.image(
      "healthBar4",
      "/assets/versus/battle/vida/vida4.png"
    );
    this.load.image(
      "healthBar3",
      "/assets/versus/battle/vida/vida3.png"
    );
    this.load.image(
      "healthBar2",
      "/assets/versus/battle/vida/vida2.png"
    );
    this.load.image(
      "healthBar1",
      "/assets/versus/battle/vida/vida1.png"
    );
    this.load.image(
      "healthBarNo",
      "/assets/versus/battle/vida/vida0.png"
    );

    // Hearts on top Bar
    this.load.image(
      "HeartLive",
      "/assets/versus/battle/vida/hearth.png"
    );

    this.load.image(
      "HeartDeath",
      "/assets/versus/battle/vida/dead-hearth.png"
    );

    this.load.spritesheet(
      "AnimsHeart",
      "/assets/versus/battle/vida/idle-hearth.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "AnimsHeartDeath",
      "/assets/versus/battle/vida/dead-hearth-sheet.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    this.load.on("complete", () => {
      this.scene.start("battleScene", {
        purchasedItems: this.selectedItems,
        selectedItemsPlayer1: this.selected1Player,
        selectedItemsPlayer2: this.selected2Player,
      });
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    const defaultText = this.add
      .text(width * 0.5, height * 0.4, "Cargando", {
        fontSize: "25px",
        fontFamily: "'Press Start 2P'",
        fill: "#ffffff",
      })
      .setOrigin(0.5);

    let loadingText = "Cargando";
    let dotCount = 0;

    this.time.addEvent({
      delay: 220, // 1 segundo
      callback: () => {
        dotCount = (dotCount + 1) % 4; // Ciclo entre 0 y 3
        defaultText.setText(loadingText + ".".repeat(dotCount));
      },
      loop: true,
    });
  }
}
