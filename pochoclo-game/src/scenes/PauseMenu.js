import { Scene } from 'phaser';

export class PauseMenu extends Scene {
    
    constructor() {
      super({ key: 'PauseMenu' });
      this.lastKeyPressTime = 0;
    }
  
    create(data) {
      this.mainScene = data.mainScene;
  
      // Agregar texto al menú de pausa
      this.add.text(100, 100, 'Juego Pausado', {
        fontSize: '32px',
        fill: '#fff',
      });
  
      // Agregar un botón para volver al menú principal
      const mainMenuButton = this.add
        .text(100, 200, 'Volver al Menú Principal', {
          fontSize: '24px',
          fill: '#fff',
        })
        .setInteractive()
        .on('pointerdown', () => {
          this.mainScene.scene.stop('recolectScene');
          this.mainScene.scene.stop('Hud');
          this.mainScene.scene.stop();
          this.mainScene.scene.start('MainMenu');
          this.scene.stop();
        });
  
      mainMenuButton.on('pointerover', () => {
        // Cambia el tamaño de la imagen al pasar el mouse
        mainMenuButton.setScale(1.07);
      });
  
      mainMenuButton.on('pointerout', () => {
        // Cambia el tamaño de la imagen al pasar el mouse
        mainMenuButton.setScale(1);
      });
  
      this.add.text(100, 320, 'Reanude Game press Esc', {
        fontSize: '24px',
        fill: '#fff',
      });
  
      this.input.keyboard.on('keydown-ESC', () => {
        const currentTime = this.time.now;
        this.isPaused = false
        if (currentTime - this.lastKeyPressTime > 250) {
          this.lastKeyPressTime = currentTime;
          this.mainScene.scene.resume();
          this.scene.resume('recolectScene')
          this.scene.stop('PauseMenu');
          console.log('Reanude Game');
        }
      });
    }
  }