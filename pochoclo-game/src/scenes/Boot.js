import { Scene } from 'phaser';

export class Boot extends Scene
{
    constructor ()
    {
        super('Boot');
    }

    preload ()
    {
        //  The Boot Scene is typically used to load in any assets you require for your Preloader, such as a game logo or background.
        //  The smaller the file size of the assets, the better, as the Boot Scene itself has no preloader.

        //  Game 
        //  Personajes
        this.load.image('mimbo', '../public/assets/mimbo/mimbo.png');
        this.load.image('luho', '../public/assets/luho/luho.png');

        //   Pochoclos con colores
        this.load.image('pochoclo', '../public/assets/barra/static-pororo.png');

        this.load.spritesheet('pochoclo-anims', '../public/assets/anims/plop-pororo.png', {
            frameWidth: 90 ,
            frameHeight: 114,
        });
   
        //   Opacidad
        this.load.image('l-opacidad', '../public/assets/opacidad.png');

        //  Tienda
        this.load.spritesheet('pororo-tienda', '../public/assets/tienda/idle-pororo.png', {
            frameWidth: 48,
            frameHeight: 51,
        });
        
        this.load.spritesheet('caramelo', '../public/assets/tienda/caramelo-azul.png', {
            frameWidth: 60,
            frameHeight: 72,
        });

        this.load.spritesheet('pizza', '../public/assets/tienda/zapi.png', {
            frameWidth: 72,
            frameHeight: 69,
        });

        // Partículas
        this.load.image("flare", "../public/assets/particles/particles.png");
        this.load.image("flare2", "../public/assets/particles/particles2.png");
        this.load.image("flare3", "../public/assets/particles/particles3.png");
    }

    create ()
    {
        this.scene.start('Preloader');
    }
}
