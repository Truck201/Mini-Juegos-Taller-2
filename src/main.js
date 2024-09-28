import "@fontsource/press-start-2p";

import { Boot } from "./scenes/Boot";
import { Preloader } from "./scenes/Preloader";
import { PauseMenu } from "./scenes/PauseMenu";
import { MainMenu } from "./scenes/MainMenu";
import { MenuOpciones } from "./scenes/MenuOpciones";
import { Hud } from "./scenes/HUD1vs1";
import { Game1v1 } from "./scenes/Game1v1";
import { RecolectScene } from "./scenes/RecolectScene";
import { HudShop } from "./scenes/HudShop";
import { Shop } from "./scenes/Shop";
import { BattleScene } from "./scenes/BattleScene";
import { HudBattle } from "./scenes/HudBattle";
import { GameOver } from "./scenes/GameOver";
import { BaseScene } from "./lib/FontsBase";

const config = {
  type: Phaser.WEBGL,
  width: window.innerWidth, // Ajusta el ancho al 90% del ancho de la ventana
  height: window.innerHeight, // Ajusta la altura al 90% de la altura de la ventana
  parent: "game-container",

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
    RecolectScene,
    MenuOpciones,
    Hud,
    Shop,
    HudShop,
    BattleScene,
    HudBattle,
    BaseScene,
  ],
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
