import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
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

    //  Main Menu
    // LOGO
    this.load.image('logo', '../public/assets/menu/logo.png');
    this.load.image('menu-background', '../public/assets/escenario/image.png');

    //  Game
    this.load.image('escenario', '../public/assets/escenario/principal.png');
    //  Personajes
    this.load.image('mimbo', '../public/assets/mimbo/mimbo.png'); // Neutral
    this.load.image('luho', '../public/assets/luho/luho.png');  // Neutral

    // Kid Korn
    this.load.image('kid-korn1', '../public/assets/kid-korn/korn-defrente.png');
    this.load.image('kid-korn2', '../public/assets/kid-korn/korn-frente.png');
    this.load.image('kid-kornFrente', '../public/assets/kid-korn/korn-izq.png');
    this.load.image('kid-kornFrente2', '../public/assets/kid-korn/kron-derecha.png');

    //   Emociones
    this.load.image('logo', '../public/assets/menu/logo.png'); // Victoria
    this.load.image('logo', '../public/assets/menu/logo.png'); // Derrota
    this.load.image('logo', '../public/assets/menu/logo.png'); // Daño
    
    this.load.image('logo', '../public/assets/menu/logo.png'); // Victoria
    this.load.image('logo', '../public/assets/menu/logo.png'); // Derrota
    this.load.image('logo', '../public/assets/menu/logo.png'); // Daño

    //   Pochoclos
    this.load.image('pochoclo', '../public/assets/barra/static-pororo.png');
    //   Anims
    this.load.spritesheet(
      'pochoclo-anims',
      '../public/assets/anims/plop-pororo.png',
      {
        frameWidth: 90,
        frameHeight: 114,
      }
    );

    //   Main Barra Sprite
    this.load.image('imagen-barra', '../public/assets/barra/barra-1v1.png');
    this.load.image('anilla-azul', '../public/assets/barra/barra-azul.png');
    this.load.image('anilla-roja', '../public/assets/barra/barra-roja.png');

    //   Opacidad
    this.load.image('l-opacidad', '../public/assets/opacidad.png');

    //  Tienda
    this.load.image('background', '../public/assets/tienda/background.png')
    this.load.spritesheet(
      'popcorn',
      '../public/assets/tienda/idle-pororo.png',
      {
        frameWidth: 65,
        frameHeight: 64,
      }
    );

    this.load.spritesheet(
      'candy',
      '../public/assets/tienda/caramelo-azul.png',
      {
        frameWidth: 60,
        frameHeight: 70,
      }
    );

    this.load.spritesheet('pizza', '../public/assets/tienda/zapi.png', {
      frameWidth: 60,
      frameHeight: 68,
    });

    // Partículas
    this.load.image('flare', '../public/assets/particles/particles.png');
    this.load.image('flare2', '../public/assets/particles/particles2.png');
    this.load.image('flare3', '../public/assets/particles/particles3.png');
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start('MainMenu');
  }
}
