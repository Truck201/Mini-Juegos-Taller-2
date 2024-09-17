import  { BattleScene }  from './scenes/1vs1Battle';
import { Boot } from './scenes/Boot';
import { Game1v1 } from './scenes/Game1v1';
import { GameOver } from './scenes/GameOver';
import { Hud } from './scenes/HUD1vs1';
import { MainMenu } from './scenes/MainMenu';
import { MenuOpciones } from './scenes/MenuOpciones';
import { PauseMenu }  from './scenes/PauseMenu';
import { Preloader } from './scenes/Preloader';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config = {
    type: Phaser.AUTO,
    width: window.innerWidth, // Ajusta el ancho al 90% del ancho de la ventana
    height: window.innerHeight, // Ajusta la altura al 90% de la altura de la ventana
    parent: 'game-container',
    backgroundColor: '#5c5b5b',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
        gravity: { y: 240 },
        debug: false,
      },
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game1v1,
        GameOver,
        PauseMenu,
        BattleScene,
        MenuOpciones,
        Hud,
    ]
};

// Create a new Phaser game instance
window.game = new Phaser.Game(config);

// Adjust the game size when the window is resized
window.addEventListener("resize", () => {
  game.scale.resize(window.innerWidth * 1, window.innerHeight * 1);
});

// Add event listener for F11 key press
window.addEventListener("keydown", (event) => {
  if (event.key === "F11") {
    event.preventDefault(); // Prevent the default action of F11
    game.scale.resize(window.innerWidth * 1, window.innerHeight * 1);
  }
});

export default new Phaser.Game(config);
