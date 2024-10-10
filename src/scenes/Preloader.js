import { Scene } from "phaser";
import WebFont from "webfontloader";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  A simple progress bar. This is the outline of the bar.
    //this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);
    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    //const bar = this.add.rectangle(512-230, 384, 4, 28, 0xffffff);
    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    //this.load.on('progress', (progress) => {
    //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
    //bar.width = 4 + (460 * progress);
    //});
  }

  preload() {
    //this.load.image('logo', 'logo.png');
    this.load.glsl("crtShader", "../src/crtShaders.flag");
    console.log(this.game.renderer);

    this.load.on("complete", () => {
      if (this.cache.shader.has("crtShader")) {
        console.log("Shader loaded successfully!");
      } else {
        console.error("Failed to load shader.");
      }
    });

    //  Main Menu
    // LOGO
    this.load.image("logo", "../public/assets/menu/logo.png");
    this.load.image(
      "menu-background",
      "../public/assets/escenario/principal.png"
    ); // /public/assets/escenario/principal.png   image.png

    // Barra Audio Master
    this.load.image("sliderHandle", "../public/assets/menu/anillo_volumen.png"); // Derrota
    this.load.image("sliderBar", "../public/assets/menu/barra_volumen.png"); // Daño

    //  Game
    this.load.image("escenario", "../public/assets/escenario/principal.png");
    //  Personajes
    this.load.image("mimbo", "../public/assets/mimbo/mimbo.png"); // Neutral
    this.load.image("luho", "../public/assets/luho/luho.png"); // Neutral

    //Globos de Texto
    this.load.image("globoTextoL", "../public/assets/kid-korn/izquierda.png");
    this.load.image("globoTextoR", "../public/assets/kid-korn/derecha.png");

    // Kid Korn
    this.load.image("kid-kornS", "../public/assets/kid-korn/korn-defrente.png");
    this.load.image("kid-kornB", "../public/assets/kid-korn/korn-frente.png");
    this.load.image("kid-kornL", "../public/assets/kid-korn/korn-izq.png");
    this.load.image("kid-kornR", "../public/assets/kid-korn/kron-derecha.png");

    // Dialogues
    this.load.json("kidKornDialogues", "../public/data/DKidKorn.json");

    //   Emociones
    this.load.image("logo", "../public/assets/menu/logo.png"); // Victoria
    this.load.image("logo", "../public/assets/menu/logo.png"); // Derrota
    this.load.image("logo", "../public/assets/menu/logo.png"); // Daño

    this.load.image("logo", "../public/assets/menu/logo.png"); // Victoria
    this.load.image("logo", "../public/assets/menu/logo.png"); // Derrota
    this.load.image("logo", "../public/assets/menu/logo.png"); // Daño

    //   Pochoclos
    this.load.image("pochoclo", "../public/assets/barra/static-pororo1.png");
    this.load.image("pochoclo2", "../public/assets/barra/static-pororo.png");

    //   Anims
    this.load.spritesheet(
      "pochoclo-anims",
      "../public/assets/anims/plop-pororo1.png",
      {
        frameWidth: 92, // 90
        frameHeight: 80, // 114
      }
    );

    //   Main Barra Sprite
    this.load.image("imagen-barra", "../public/assets/barra/barra-1v1.png");
    this.load.image("anilla-azul", "../public/assets/barra/barra-azul.png");
    this.load.image("anilla-roja", "../public/assets/barra/barra-roja.png");

    //   Opacidad
    this.load.image("l-opacidad", "../public/assets/opacidad.png");

    //  Tienda
    this.load.image("low-points", "../public/assets/tienda/poco.png");
    this.load.image("medium-points", "../public/assets/tienda/medio.png");
    this.load.image("high-points", "../public/assets/tienda/rebalsa.png");

    this.load.spritesheet("polilla", "../public/assets/tienda/pollilla.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("toby", "../public/assets/tienda/toby.png", {
      frameWidth: 148,
      frameHeight: 72,
    });
    this.load.spritesheet("mothman", "../public/assets/tienda/mothman.png", {
      frameWidth: 160,
      frameHeight: 188,
    });
    this.load.spritesheet(
      "alcantarilla",
      "../public/assets/tienda/alcantarilla.png",
      {
        frameWidth: 20,
        frameHeight: 4,
      }
    );

    this.load.image(
      "backgroundShop",
      "../public/assets/tienda/shop-background.png"
    );

    // ITEMS DE LA TIENDA
    // Popcorn (7% EC)
    this.load.spritesheet(
      "popcorn",
      "../public/assets/tienda/idle-pororo.png",
      {
        frameWidth: 65,
        frameHeight: 64,
      }
    );

    // Lentes (++ Anchor)
    this.load.spritesheet("glasses", "../public/assets/tienda/lentes1.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Caramelos  (+1 HP) (+5 VEL) (Medio)
    this.load.spritesheet("candy1", "../public/assets/tienda/caramelo1.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    this.load.spritesheet("candy2", "../public/assets/tienda/caramelo2.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    this.load.spritesheet("candy3", "../public/assets/tienda/caramelo3.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Helados  (+15% EC)
    this.load.spritesheet("icecream1", "../public/assets/tienda/heladoA.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    this.load.spritesheet("icecream2", "../public/assets/tienda/heladoB.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    this.load.spritesheet("icecream3", "../public/assets/tienda/heladoC.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Energizante (+10 VEL)
    this.load.spritesheet("energizing", "../public/assets/tienda/lata2.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Ojo de cuthulu (15% CRT)
    this.load.spritesheet("cuthulu", "../public/assets/tienda/ojo1.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Hacha (+2 DMG CARO)
    this.load.spritesheet("axe", "../public/assets/tienda/hacha1.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Paleta  (+5 VEL) (+1 DMG)
    this.load.spritesheet("palete", "../public/assets/tienda/chupetin2.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Hamburgesa (+3 HP)  (CARO)
    this.load.spritesheet("burger", "../public/assets/tienda/hamburguesa.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Chocolate (+4 VEL) (+7% EC)
    this.load.spritesheet(
      "chocolate",
      "../public/assets/tienda/chocolate.png",
      {
        frameWidth: 80,
        frameHeight: 96,
      }
    );

    // Pizza (+1 DMG) (+1 HP)
    this.load.spritesheet("pizza", "../public/assets/tienda/pizza.png", {
      frameWidth: 80,
      frameHeight: 96,
    });

    // Partículas
    this.load.image("flare", "../public/assets/particles/particles.png"); //  2      particles.png    blue-particle.png
    this.load.image("flare2", "../public/assets/particles/particles2.png");
    this.load.image("flare3", "../public/assets/particles/particles3.png"); //  1      particles3.png  red-particle.png

    // Battle
    // Sword
    this.load.image(
      "static-sword",
      "../public/assets/battle/events/static-sword.png"
    );

    this.load.spritesheet(
      "b-sword",
      "../public/assets/battle/events/idle-brkn-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "idle-sword",
      "../public/assets/battle/events/idle-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "r-sword",
      "../public/assets/battle/events/rotate-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    // Heart
    this.load.image(
      "static-heart",
      "../public/assets/battle/events/static-heart.png"
    );

    this.load.spritesheet(
      "idle-heart",
      "../public/assets/battle/events/idle-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    this.load.spritesheet(
      "flying-heart",
      "../public/assets/battle/events/flying-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    // Shield
    this.load.image(
      "static-shield",
      "../public/assets/battle/events/static-shield.png"
    );

    this.load.spritesheet(
      "idle-shield",
      "../public/assets/battle/events/idle-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );

    this.load.spritesheet(
      "r-shield",
      "../public/assets/battle/events/rotate-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );


    // Popcorn Event Rain
    this.load.image("popcorn1", "../public/assets/anims/popcorn.png");

    this.load.image("popcorn2", "../public/assets/anims/popcorn.png");

    this.load.image("popcorn3", "../public/assets/anims/popcorn.png");

    // Left
    this.load.spritesheet(
      "healthBarLeftAnims",
      "../public/assets/battle/vida/pj1-xtra.png",
      {
        frameWidth: 324,
        frameHeight: 84,
      }
    );
    this.load.image(
      "healthBarL1",
      "../public/assets/battle/vida/pj1_vida5.png"
    );
    this.load.image(
      "healthBarL2",
      "../public/assets/battle/vida/pj1_vida4.png"
    );
    this.load.image(
      "healthBarL3",
      "../public/assets/battle/vida/pj1_vida3.png"
    );
    this.load.image(
      "healthBarL4",
      "../public/assets/battle/vida/pj1_vida2.png"
    );
    this.load.image(
      "healthBarL5",
      "../public/assets/battle/vida/pj1_vida1.png"
    );
    this.load.image(
      "healthBarLNo",
      "../public/assets/battle/vida/pj1_no-vida.png"
    );

    // Right
    this.load.spritesheet(
      "healthBarRightAnims",
      "../public/assets/battle/vida/pj2-xtra.png",
      {
        frameWidth: 316,
        frameHeight: 84,
      }
    );
    this.load.image(
      "healthBarR1",
      "../public/assets/battle/vida/pj2_vida5.png"
    );
    this.load.image(
      "healthBarR2",
      "../public/assets/battle/vida/pj2_vida4.png"
    );
    this.load.image(
      "healthBarR3",
      "../public/assets/battle/vida/pj2_vida3.png"
    );
    this.load.image(
      "healthBarR4",
      "../public/assets/battle/vida/pj2_vida2.png"
    );
    this.load.image(
      "healthBarR5",
      "../public/assets/battle/vida/pj2_vida1.png"
    );
    this.load.image(
      "healthBarRNo",
      "../public/assets/battle/vida/pj2_no-vida.png"
    );

    WebFont.load({
      google: {
        families: ["Press Start 2P"],
      },
      active: () => {
        console.log("Fuentes cargadas.");
        this.gotoMainScene();
      },
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

  gotoMainScene() {
    this.time.delayedCall(1200, () => {
      this.scene.start("Shop");
    });
  }
}
