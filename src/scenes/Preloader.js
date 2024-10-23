import { Scene } from "phaser";
import WebFont from "webfontloader";
import { getLanguageConfig, getTranslations } from "../services/translations";
import { Sounds } from "../load/audio";

export class Preloader extends Scene {
  #language;
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

    // Agregar Lenguaje
    this.#language = getLanguageConfig();

    Sounds(this);

    // ChooseLanguage
    this.load.spritesheet(
      "boleteriaBackground",
      "../public/assets/versus/boleteria/lenguaje.png",
      {
        frameWidth: 1920,
        frameHeight: 1080,
      }
    );

    this.load.image(
      "Argentina",
      "../public/assets/versus/boleteria/flag-arg-simple.png"
    );
    this.load.image(
      "EstadosUnidos",
      "../public/assets/versus/boleteria/flag-eeuu-simple.png"
    );

    this.load.spritesheet(
      "CUT-ARG",
      "../public/assets/versus/boleteria/flag-arg.png",
      {
        frameWidth: 228,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "CUT-EEUU",
      "../public/assets/versus/boleteria/flag-eeuu.png",
      {
        frameWidth: 228,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-ARG",
      "../public/assets/versus/boleteria/flag-arg-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "IDLE-EEUU",
      "../public/assets/versus/boleteria/flag-eeuu-simple.png",
      {
        frameWidth: 212,
        frameHeight: 92,
      }
    );

    //  Main Menu
    // LOGO
    this.load.image("logo", "../public/assets/versus/menu/logo.png");
    this.load.image(
      "menu-background",
      "../public/assets/versus/escenario/principal.png"
    ); // /public/assets/versus/escenario/principal.png   image.png

    // Televisión
    this.load.image("TeleImagen", "../public/assets/versus/menu/tv.png"); // Derrota

    // Onomatopeyas
    this.load.image("boom1", "../public/assets/versus/television/OYS-boom.png"); // Onomatopeyas
    this.load.image(
      "boom2",
      "../public/assets/versus/television/OYS-boom2.png"
    );
    this.load.image(
      "boom3",
      "../public/assets/versus/television/OYS-boom3.png"
    );
    this.load.image(
      "boom4",
      "../public/assets/versus/television/OYS-boom4.png"
    );
    this.load.image(
      "crash1",
      "../public/assets/versus/television/OYS-crash.png"
    );
    this.load.image(
      "crash2",
      "../public/assets/versus/television/OYS-crash2.png"
    );
    this.load.image(
      "ready1",
      "../public/assets/versus/television/OYS-getReady.png"
    );
    this.load.image(
      "ready2",
      "../public/assets/versus/television/OYS-ready.png"
    );
    this.load.image(
      "hello",
      "../public/assets/versus/television/OYS-hello.png"
    );
    this.load.image(
      "kaboom",
      "../public/assets/versus/television/OYS-kaboom.png"
    );
    this.load.image("oh", "../public/assets/versus/television/OYS-oh.png");
    this.load.image("ouch", "../public/assets/versus/television/OYS-ouch.png");
    this.load.image(
      "pfoom",
      "../public/assets/versus/television/OYS-pfoom.png"
    );
    this.load.image(
      "whack",
      "../public/assets/versus/television/OYS-whack.png"
    );

    // Barra Audio Master
    this.load.image(
      "sliderHandle",
      "../public/assets/versus/menu/anillo_volumen.png"
    ); // Derrota
    this.load.image(
      "sliderBar",
      "../public/assets/versus/menu/barra_volumen.png"
    ); // Daño

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

    // //Globos de Texto
    // this.load.image(
    //   "globoTextoL",
    //   "../public/assets/versus/kid-korn/izquierda.png"
    // );
    // this.load.image(
    //   "globoTextoR",
    //   "../public/assets/versus/kid-korn/derecha.png"
    // );

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
        frameWidth: 1000,
        frameHeight: 1000,
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

    // Dialogues
    this.load.json(
      "kidKornDialogues_en-US.json",
      "../public/data/kidKornDialogues_en-US.json"
    );
    this.load.json(
      "kidKornDialogues_es-AR.json",
      "../public/data/kidKornDialogues_es-AR.json"
    );
    this.load.json(
      "kidKornDialogues_fr-FR.json",
      "../public/data/kidKornDialogues_fr-FR.json"
    );

    //   Emociones
    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Victoria
    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Derrota
    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Daño

    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Victoria
    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Derrota
    this.load.image("logo", "../public/assets/versus/menu/logo.png"); // Daño

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

    //   Opacidad
    this.load.image("l-opacidad", "../public/assets/versus/opacidad.png");

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
    this.load.image("flare", "../public/assets/versus/particles/particles.png"); //  2      particles.png    blue-particle.png
    this.load.image(
      "flare2",
      "../public/assets/versus/particles/particles2.png"
    );
    this.load.image(
      "flare3",
      "../public/assets/versus/particles/particles3.png"
    ); //  1      particles3.png  red-particle.png

    // Battle
    // Stats
    this.load.image("IcoDam", "../public/assets/versus/battle/damage.png");

    this.load.image("IcoDef", "../public/assets/versus/battle/defense.png");

    this.load.image("IcoCrt", "../public/assets/versus/battle/critical.png");

    this.load.image("IcoHp", "../public/assets/versus/battle/life.png");

    this.load.image("IcoSp", "../public/assets/versus/battle/speed.png");

    // Sword
    this.load.image(
      "static-sword",
      "../public/assets/versus/battle/events/static-sword.png"
    );

    this.load.spritesheet(
      "b-sword",
      "../public/assets/versus/battle/events/idle-brkn-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "idle-sword",
      "../public/assets/versus/battle/events/idle-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    this.load.spritesheet(
      "r-sword",
      "../public/assets/versus/battle/events/rotate-sword.png",
      {
        frameWidth: 52,
        frameHeight: 168,
      }
    );

    // Heart
    this.load.image(
      "static-heart",
      "../public/assets/versus/battle/events/static-heart.png"
    );

    this.load.spritesheet(
      "idle-heart",
      "../public/assets/versus/battle/events/idle-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    this.load.spritesheet(
      "flying-heart",
      "../public/assets/versus/battle/events/flying-heart.png",
      {
        frameWidth: 104,
        frameHeight: 84,
      }
    );

    // Shield
    this.load.image(
      "static-shield",
      "../public/assets/versus/battle/events/static-shield.png"
    );

    this.load.spritesheet(
      "idle-shield",
      "../public/assets/versus/battle/events/idle-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );

    this.load.spritesheet(
      "r-shield",
      "../public/assets/versus/battle/events/rotate-shield.png",
      {
        frameWidth: 80,
        frameHeight: 100,
      }
    );

    // Popcorn Event Rain
    this.load.image("popcorn1", "../public/assets/versus/anims/popcorn.png");
    this.load.image("popcorn2", "../public/assets/versus/anims/popcorn.png");
    this.load.image("popcorn3", "../public/assets/versus/anims/popcorn.png");

    // Animación Evento Rain[Popcorn]
    this.load.spritesheet(
      "popcorn1Sprites",
      "../public/assets/versus/battle/events/pochoclo-clasico.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      "popcorn2Sprites",
      "../public/assets/versus/battle/events/pochoclo-morado.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    this.load.spritesheet(
      "popcorn3Sprites",
      "../public/assets/versus/battle/events/pochoclo-naranja.png",
      {
        frameWidth: 92,
        frameHeight: 80,
      }
    );

    // Sprite Health Static
    this.load.image(
      "healthStatic",
      "../public/assets/versus/battle/vida/hearth.png"
    );
    this.load.image(
      "healthStaticDeath",
      "../public/assets/versus/battle/vida/dead-hearth.png"
    );

    // SpriteSheet Hearth
    this.load.spritesheet(
      "healthBarIdle",
      "../public/assets/versus/battle/vida/idle-hearth.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    // Anims HealthBar
    this.load.spritesheet(
      "healthBarExtra1",
      "../public/assets/versus/battle/vida/xtra-vida1.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra2",
      "../public/assets/versus/battle/vida/xtra-vida2.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra3",
      "../public/assets/versus/battle/vida/xtra-vida3.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra4",
      "../public/assets/versus/battle/vida/xtra-vida4.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    this.load.spritesheet(
      "healthBarExtra5",
      "../public/assets/versus/battle/vida/xtra-vida5.png",
      {
        frameWidth: 88,
        frameHeight: 328,
      }
    );

    // Barra de vida
    this.load.image(
      "healthBar5",
      "../public/assets/versus/battle/vida/vida5.png"
    );
    this.load.image(
      "healthBar4",
      "../public/assets/versus/battle/vida/vida4.png"
    );
    this.load.image(
      "healthBar3",
      "../public/assets/versus/battle/vida/vida3.png"
    );
    this.load.image(
      "healthBar2",
      "../public/assets/versus/battle/vida/vida2.png"
    );
    this.load.image(
      "healthBar1",
      "../public/assets/versus/battle/vida/vida1.png"
    );
    this.load.image(
      "healthBarNo",
      "../public/assets/versus/battle/vida/vida0.png"
    );

    // Hearts on top Bar
    this.load.image(
      "HeartLive",
      "../public/assets/versus/battle/vida/hearth.png"
    );

    this.load.image(
      "HeartDeath",
      "../public/assets/versus/battle/vida/dead-hearth.png"
    );

    this.load.spritesheet(
      "AnimsHeart",
      "../public/assets/versus/battle/vida/idle-hearth.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    this.load.spritesheet(
      "AnimsHeartDeath",
      "../public/assets/versus/battle/vida/dead-hearth-sheet.png",
      {
        frameWidth: 80,
        frameHeight: 92,
      }
    );

    // Juego COPERATIVISMO SUNCHALE chunchale
    // Background
    this.load.image(
      "BackgroundCoop",
      "../public/assets/coop/escenarios/fondo.png"
    );

    // Cinta de Movimiento
    this.load.image("cinta", "../public/assets/coop/escenarios/cinta.png");

    // ANIMACIONES Bolsas
    this.load.spritesheet(
      "AnimsBlueBag",
      "../public/assets/coop/animacion-bolsas/bolsa-azul.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsPurpleBag",
      "../public/assets/coop/animacion-bolsas/bolsa-morada.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsOrangeBag",
      "../public/assets/coop/animacion-bolsas/bolsa-naranja.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsRoseBag",
      "../public/assets/coop/animacion-bolsas/bolsa-rosa.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    this.load.spritesheet(
      "AnimsGreenBag",
      "../public/assets/coop/animacion-bolsas/bolsa-verde.png",
      {
        frameWidth: 216,
        frameHeight: 348,
      }
    );

    // Pedidos de Misión
    this.load.image(
      "PedidosAzul",
      "../public/assets/coop/bolsas-pedidos/pedido-azul.png"
    );

    this.load.image(
      "PedidosMorado",
      "../public/assets/coop/bolsas-pedidos/pedido-morada.png"
    );

    this.load.image(
      "PedidosNaranja",
      "../public/assets/coop/bolsas-pedidos/pedido-naranja.png"
    );

    this.load.image(
      "PedidosRosa",
      "../public/assets/coop/bolsas-pedidos/pedido-rosa.png"
    );

    this.load.image(
      "PedidosVerde",
      "../public/assets/coop/bolsas-pedidos/pedido-verde.png"
    );

    // Bolsitas Vacias
    this.load.image(
      "EmptyBlue",
      "../public/assets/coop/bolsitas-vacias/empty-azul.png"
    );

    this.load.image(
      "EmptyPurple",
      "../public/assets/coop/bolsitas-vacias/empty-morada.png"
    );

    this.load.image(
      "EmptyOrange",
      "../public/assets/coop/bolsitas-vacias/empty-naranja.png"
    );

    this.load.image(
      "EmptyRose",
      "../public/assets/coop/bolsitas-vacias/empty-rosa.png"
    );

    this.load.image(
      "EmptyGreen",
      "../public/assets/coop/bolsitas-vacias/empty-verde.png"
    );

    // Diana
    this.load.image(
      "StaticTarget",
      "../public/assets/coop/diana/static-diana.png"
    );

    this.load.spritesheet("Diana", "../public/assets/coop/diana/diana.png", {
      frameWidth: 112,
      frameHeight: 132,
    });

    // Resorteras
    this.load.image(
      "StaticResortera",
      "../public/assets/coop/resortera/static-resortera.png"
    );

    this.load.spritesheet(
      "MiraResortera",
      "../public/assets/coop/resortera/resortera-idle.png",
      {
        frameWidth: 140,
        frameHeight: 275,
      }
    );

    this.load.spritesheet(
      "MiraResortera",
      "../public/assets/coop/resortera/resortera-shooting.png",
      {
        frameWidth: 140,
        frameHeight: 275,
      }
    );

    // Tirachinas
    this.load.image(
      "TirachinasRoja",
      "../public/assets/coop/tirachinas/gomera-azul.png"
    );

    this.load.image(
      "TirachinasAzul",
      "../public/assets/coop/tirachinas/gomera-roja.png"
    );

    this.load.image(
      "bulletSprite",
      "../public/assets/coop/tirachinas/municion.png"
    );

    WebFont.load({
      google: {
        families: ["Press Start 2P"],
      },
      active: () => {
        console.log("Fuentes cargadas.");
      },
    });
  }

  create() {
    let width = this.game.scale.width;
    let height = this.game.scale.height;

    getTranslations(this.#language, () =>
      this.scene.start("ChooseLanguage", { language: this.#language })
    );

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
