import { Scene } from 'phaser';

export class GameCoOp extends Scene
{
    constructor ()
    {
        super('GameCo-Op');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor(0xfffff);

        this.add.image(512, 384, 'background').setAlpha(0.5);

        this.add.text(512, 384, 'Game Cooperative', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.input.once('pointerdown', () => {

            this.scene.start('GameOver');

        });
    }
}
