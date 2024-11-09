import { Scene } from "phaser";

export class PreloaderCooperative extends Scene {
  constructor() {
    super("PreloadCoop");
  }

  init(data) {
    this.language = data.language;
  }

  preload() {
    // Juego COPERATIVISMO SUNCHALE chunchale
    //  Personajes
    this.load.image("mimbo", "/assets/versus/mimbo/mimbo.png"); // Neutral
    this.load.image("luho", "/assets/versus/luho/luho.png"); // Neutral

    this.load.spritesheet(
      "Damage-Mimbo",
      "/assets/versus/mimbo/mimbo-dano.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DAÑO
    this.load.spritesheet("Damage-Luho", "/assets/versus/luho/luho-dano.png", {
      frameWidth: 232, // 90
      frameHeight: 216, // 114
    }); // DAÑO

    this.load.spritesheet(
      "Defeat-Mimbo",
      "/assets/versus/mimbo/mimbo-derrota.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DERROTA
    this.load.spritesheet(
      "Defeat-Luho",
      "/assets/versus/luho/luho-derrota.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DERROTA

    this.load.spritesheet(
      "Victory-Mimbo",
      "/assets/versus/mimbo/mimbo-victoria.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // VICTORIA
    this.load.spritesheet(
      "Victory-Luho",
      "/assets/versus/luho/luho-victoria.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // VICTORIA

    this.load.spritesheet(
      "Neutral-Mimbo",
      "/assets/versus/mimbo/mimbo-neutral.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // NEUTRAL
    this.load.spritesheet(
      "Neutral-Luho",
      "/assets/versus/luho/luho-neutral.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // NEUTRAL

    // Background
    this.load.image("BackgroundCoop", "/assets/coop/escenarios/background.png");

    // Game Over
    this.load.image(
      "fondoPuntajeAmarillo",
      "/assets/versus/escenario/puntajes-amarillo.png"
    );

    // Background Spritesheet
    this.load.spritesheet(
      "backgroundAnimsTutorial",
      "/assets/coop/escenarios/backgroundSpritesheet.png",
      {
        frameWidth: 1920,
        frameHeight: 1080,
      }
    );

    this.load.spritesheet(
      "backgroundAnims",
      "/assets/coop/escenarios/backgroundFondo.png",
      {
        frameWidth: 1920,
        frameHeight: 1080,
      }
    );

    // Cinta de Movimiento
    this.load.image("cinta", "/assets/coop/escenarios/cinta-1.png");

    this.load.spritesheet("cintaIzq", "/assets/coop/escenarios/cinta-izq.png", {
      frameWidth: 856,
      frameHeight: 128,
    });

    this.load.spritesheet("cintaDer", "/assets/coop/escenarios/cinta-der.png", {
      frameWidth: 856,
      frameHeight: 128,
    });

    // character
    this.load.spritesheet("mothman", "/assets/versus/tienda/mothman.png", {
      frameWidth: 160,
      frameHeight: 188,
    });

    // Bolsas
    // ANIMACIONES Bolsas
    this.load.spritesheet(
      "AnimsBlueBag",
      "/assets/coop/animacion-bolsas/bolsa-azul.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsPurpleBag",
      "/assets/coop/animacion-bolsas/bolsa-morada.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsOrangeBag",
      "/assets/coop/animacion-bolsas/bolsa-naranja.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsRoseBag",
      "/assets/coop/animacion-bolsas/bolsa-rosa.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsGreenBag",
      "/assets/coop/animacion-bolsas/bolsa-verde.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    // Pedidos de Misión
    this.load.image(
      "EmptyBlueWithSugar",
      "/assets/coop/bolsas-pedidos/EmptyBlueSugar.png"
    );

    this.load.image(
      "EmptyBlueWithSpicy",
      "/assets/coop/bolsas-pedidos/EmptyBlueSpicy.png"
    );

    this.load.image(
      "EmptyBlueWithSalt",
      "/assets/coop/bolsas-pedidos/EmptyBlueSalt.png"
    );

    this.load.image(
      "EmptyRoseWithSugar",
      "/assets/coop/bolsas-pedidos/EmptyRoseSugar.png"
    );

    this.load.image(
      "EmptyRoseWithSpicy",
      "/assets/coop/bolsas-pedidos/EmptyRoseSpicy.png"
    );

    this.load.image(
      "EmptyRoseWithSalt",
      "/assets/coop/bolsas-pedidos/EmptyRoseSalt.png"
    );

    this.load.image(
      "EmptyGreenWithSugar",
      "/assets/coop/bolsas-pedidos/EmptyGreenSugar.png"
    );

    this.load.image(
      "EmptyGreenWithSpicy",
      "/assets/coop/bolsas-pedidos/EmptyGreenSpicy.png"
    );

    this.load.image(
      "EmptyGreenWithSalt",
      "/assets/coop/bolsas-pedidos/EmptyGreenSalt.png"
    );

    this.load.image(
      "EmptyOrangeWithSugar",
      "/assets/coop/bolsas-pedidos/EmptyOrangeSugar.png"
    );

    this.load.image(
      "EmptyOrangeWithSpicy",
      "/assets/coop/bolsas-pedidos/EmptyOrangeSpicy.png"
    );

    this.load.image(
      "EmptyOrangeWithSalt",
      "/assets/coop/bolsas-pedidos/EmptyOrangeSalt.png"
    );

    // Slot de color Objects Brick
    this.load.image("slotRed", "/assets/coop/bolsas-pedidos/slotRed.png");

    this.load.image("slotBlue", "/assets/coop/bolsas-pedidos/slotBlue.png");

    // Pedido Actual
    this.load.image("CurrentDelivers", "/assets/coop/bolsas-pedidos/box.png");

    this.load.spritesheet(
      "ArrowsDelivers",
      "/assets/coop/bolsas-pedidos/arrowDelivers.png",
      {
        frameWidth: 360,
        frameHeight: 52,
      }
    );

    // Bolsitas Vacias
    this.load.image("EmptyBlue", "/assets/coop/bolsitas-vacias/empty-azul.png");

    this.load.image(
      "EmptyOrange",
      "/assets/coop/bolsitas-vacias/empty-naranja.png"
    );

    this.load.image("EmptyRose", "/assets/coop/bolsitas-vacias/empty-rosa.png");

    this.load.image(
      "EmptyGreen",
      "/assets/coop/bolsitas-vacias/empty-verde.png"
    );

    // Puente
    this.load.image("BridgeSprite", "/assets/coop/box/bridgeStatic.png");

    // Resorteras
    this.load.image(
      "resortera-static",
      "/assets/coop/resortera/static-resortera.png"
    );

    this.load.spritesheet(
      "resorteraIdle",
      "/assets/coop/resortera/resortera-idle.png",
      {
        frameWidth: 140,
        frameHeight: 275,
      }
    );

    this.load.spritesheet(
      "resorteraShoot",
      "/assets/coop/resortera/resortera-shooting.png",
      {
        frameWidth: 140,
        frameHeight: 275,
      }
    );

    // Money
    this.load.image("Cash", "/assets/coop/cash/static-cash.png");

    this.load.spritesheet("FlyingCash", "/assets/coop/cash/move-cash.png", {
      frameWidth: 140,
      frameHeight: 72,
    });

    // SAL AZUCA
    this.load.image("sugar", "/assets/coop/ingrediente/popcorn-1.png");
    this.load.image("spicy", "/assets/coop/ingrediente/popcorn-2.png");
    this.load.image("salt", "/assets/coop/ingrediente/popcorn-3.png");

    // Miras
    this.load.image(
      "miraPlayerOne",
      "/assets/coop/tirachinas/static-mira-red.png"
    );
    this.load.image(
      "miraPlayerTwo",
      "/assets/coop/tirachinas/static-mira-blue.png"
    );

    // Tirachinas
    this.load.image(
      "TirachinasRoja",
      "/assets/coop/tirachinas/gomera-azul.png"
    );

    this.load.image(
      "TirachinasAzul",
      "/assets/coop/tirachinas/gomera-roja.png"
    );

    this.load.image("bulletSprite", "/assets/coop/tirachinas/municion.png");

    this.load.on("complete", () => {
      this.scene.start("startCoop", {
        language: this.language,
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
