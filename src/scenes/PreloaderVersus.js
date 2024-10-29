import { Scene } from "phaser";

export class PreloaderVersus extends Scene {
  constructor() {
    super("PreloadVersus");
  }

  init(data) {
    this.dialogues = data.dialogues;
    this.language = data.language;
  }

  preload() {
    //  Game
    this.load.image(
      "escenario",
      "../public/assets/versus/escenario/principal.png"
    );

    this.load.image(
      "shadowTotal",
      "../public/assets/versus/escenario/sombras.png"
    );
    //  Personajes
    this.load.image("mimbo", "../public/assets/versus/mimbo/mimbo.png"); // Neutral
    this.load.image("luho", "../public/assets/versus/luho/luho.png"); // Neutral

    this.load.spritesheet(
      "Damage-Mimbo",
      "../public/assets/versus/mimbo/mimbo-dano.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DAÑO
    this.load.spritesheet(
      "Damage-Luho",
      "../public/assets/versus/luho/luho-dano.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DAÑO

    this.load.spritesheet(
      "Defeat-Mimbo",
      "../public/assets/versus/mimbo/mimbo-derrota.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DERROTA
    this.load.spritesheet(
      "Defeat-Luho",
      "../public/assets/versus/luho/luho-derrota.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // DERROTA

    this.load.spritesheet(
      "Victory-Mimbo",
      "../public/assets/versus/mimbo/mimbo-victoria.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // VICTORIA
    this.load.spritesheet(
      "Victory-Luho",
      "../public/assets/versus/luho/luho-victoria.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // VICTORIA

    this.load.spritesheet(
      "Neutral-Mimbo",
      "../public/assets/versus/mimbo/mimbo-neutral.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // NEUTRAL
    this.load.spritesheet(
      "Neutral-Luho",
      "../public/assets/versus/luho/luho-neutral.png",
      {
        frameWidth: 232, // 90
        frameHeight: 216, // 114
      }
    ); // NEUTRAL
    // Kid Korn
    this.load.image(
      "kid-kornS",
      "../public/assets/versus/kid-korn/korn-defrente.png"
    );
    this.load.image(
      "kid-kornB",
      "../public/assets/versus/kid-korn/korn-frente.png"
    );
    this.load.image(
      "kid-kornL",
      "../public/assets/versus/kid-korn/korn-izq.png"
    );
    this.load.image(
      "kid-kornR",
      "../public/assets/versus/kid-korn/kron-derecha.png"
    );

    // Anims
    // Explot Big KK
    this.load.spritesheet(
      "BigKorn",
      "../public/assets/versus/kid-korn/BigKornAnims.png",
      {
        frameWidth: 780,
        frameHeight: 1164,
      }
    );
    // idle KK
    this.load.spritesheet(
      "KidKornLeftAnims",
      "../public/assets/versus/kid-korn/idle-korn-izq.png",
      {
        frameWidth: 660,
        frameHeight: 796,
      }
    );

    this.load.spritesheet(
      "KidKornRightAnims",
      "../public/assets/versus/kid-korn/idle-korn-der.png",
      {
        frameWidth: 660,
        frameHeight: 796,
      }
    );
    // Explo KK
    this.load.spritesheet(
      "KKExploteRightAnims",
      "../public/assets/versus/kid-korn/exp-korn-der.png",
      {
        frameWidth: 660,
        frameHeight: 796,
      }
    );

    this.load.spritesheet(
      "KKExploteLeftAnims",
      "../public/assets/versus/kid-korn/exp-korn-izq.png",
      {
        frameWidth: 660,
        frameHeight: 796,
      }
    );

    //   Pochoclos
    this.load.image(
      "pochoclo",
      "../public/assets/versus/barra/static-pororo1.png"
    );
    this.load.image(
      "pochoclo2",
      "../public/assets/versus/barra/static-pororo.png"
    );

    //   Anims
    this.load.spritesheet(
      "pochoclo-anims",
      "../public/assets/versus/anims/plop-pororo1.png",
      {
        frameWidth: 92, // 90
        frameHeight: 80, // 114
      }
    );

    //   Main Barra Sprite
    this.load.image(
      "imagen-barra",
      "../public/assets/versus/barra/barra-1v1.png"
    );
    this.load.image(
      "anilla-azul",
      "../public/assets/versus/barra/barra-azul.png"
    );
    this.load.image(
      "anilla-roja",
      "../public/assets/versus/barra/barra-roja.png"
    );

    //  Tienda
    this.load.image("low-points", "../public/assets/versus/tienda/poco.png");
    this.load.image(
      "medium-points",
      "../public/assets/versus/tienda/medio.png"
    );
    this.load.image(
      "high-points",
      "../public/assets/versus/tienda/rebalsa.png"
    );

    this.load.spritesheet(
      "polilla",
      "../public/assets/versus/tienda/pollilla.png",
      {
        frameWidth: 16,
        frameHeight: 16,
      }
    );
    this.load.spritesheet("toby", "../public/assets/versus/tienda/toby.png", {
      frameWidth: 148,
      frameHeight: 72,
    });
    this.load.spritesheet(
      "mothman",
      "../public/assets/versus/tienda/mothman.png",
      {
        frameWidth: 160,
        frameHeight: 188,
      }
    );
    this.load.spritesheet(
      "alcantarilla",
      "../public/assets/versus/tienda/alcantarilla.png",
      {
        frameWidth: 20,
        frameHeight: 4,
      }
    );

    this.load.image(
      "backgroundShop",
      "../public/assets/versus/tienda/shop-background.png"
    );

    // ITEMS DE LA TIENDA
    // Popcorn (7% EC)
    this.load.spritesheet(
      "popcorn",
      "../public/assets/versus/tienda/idle-pororo.png",
      {
        frameWidth: 65,
        frameHeight: 64,
      }
    );

    // Lentes (++ Anchor)
    this.load.spritesheet(
      "glasses",
      "../public/assets/versus/tienda/lentes1.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Caramelos  (+1 HP) (+5 VEL) (Medio)
    this.load.spritesheet(
      "candy1",
      "../public/assets/versus/tienda/caramelo1.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    this.load.spritesheet(
      "candy2",
      "../public/assets/versus/tienda/caramelo2.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    this.load.spritesheet(
      "candy3",
      "../public/assets/versus/tienda/caramelo3.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Helados  (+15% EC)
    this.load.spritesheet(
      "icecream1",
      "../public/assets/versus/tienda/heladoA.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    this.load.spritesheet(
      "icecream2",
      "../public/assets/versus/tienda/heladoB.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    this.load.spritesheet(
      "icecream3",
      "../public/assets/versus/tienda/heladoC.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Energizante (+10 VEL)
    this.load.spritesheet(
      "energizing",
      "../public/assets/versus/tienda/lata2.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Ojo de cuthulu (15% CRT)
    this.load.spritesheet(
      "cuthulu",
      "../public/assets/versus/tienda/ojo1.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Hacha (+2 DMG CARO)
    this.load.spritesheet("axe", "../public/assets/versus/tienda/hacha1.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Paleta  (+5 VEL) (+1 DMG)
    this.load.spritesheet(
      "palete",
      "../public/assets/versus/tienda/chupetin2.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Hamburgesa (+3 HP)  (CARO)
    this.load.spritesheet(
      "burger",
      "../public/assets/versus/tienda/hamburguesa.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Chocolate (+4 VEL) (+7% EC)
    this.load.spritesheet(
      "chocolate",
      "../public/assets/versus/tienda/chocolate.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Pizza (+1 DMG) (+1 HP)
    this.load.spritesheet("pizza", "../public/assets/versus/tienda/pizza.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Partículas
    this.load.image("flare", "../public/assets/versus/particles/particles.png");
    this.load.image(
      "flare2",
      "../public/assets/versus/particles/particles2.png"
    );
    this.load.image(
      "flare3",
      "../public/assets/versus/particles/particles3.png"
    );

    this.load.on("complete", () => {
      this.scene.start("Game1vs1", {
        dialogues: this.dialogues,
        language: this.language,
      }); //Ir a escena Main
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
