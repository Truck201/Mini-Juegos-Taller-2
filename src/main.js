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
import { LanguageScene } from "./scenes/LanguageChoose";

const config = {
  type: Phaser.WEBGL,
  width: 1920, // Ajusta el ancho al 90% del ancho de la ventana    window.innerWidth
  height: 1080, // Ajusta la altura al 90% de la altura de la ventana    window.innerHeight
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
    LanguageScene,
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

export default new Phaser.Game(config);
