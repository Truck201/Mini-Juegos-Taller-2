import { BaseScene } from "../lib/FontsBase";
export class AtributeText extends BaseScene {
  constructor(scene, positionX, positionY) {
    super({ key: "atributeText" });
    this.scene = scene;
    this.positionX = positionX;
    this.positionY = positionY;

    this.create();
  }

  create() {
    let width = this.positionX;
    let height = this.positionY;

    console.log("CREANDO EL FUCKING HUD");

    const width1 = width * 0.115;
    const width2 = width * 0.885;

    const height1 = height * 0.4;
    const height2 = height * 0.48;
    const height3 = height * 0.56;
    const height4 = height * 0.64;
    const height5 = height * 0.72;

    // Textos De Atributos 1
    this.scene.player1HPText = this.createTextToScene(
      this.scene,
      width1,
      height1,
      `${this.scene.player1HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height1, "IcoHp", true);

    this.scene.speedText1 = this.createTextToScene(
      this.scene,
      width1,
      height2,
      `${this.scene.player1Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height2, "IcoSp", true);

    this.createTextToScene(
      this.scene,
      width1,
      height3,
      `${this.scene.player1EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height3, "IcoDef", true); // 0.68  // 0.78

    this.scene.damageText1 = this.createTextToScene(
      this.scene,
      width1,
      height4,
      `${this.scene.player1Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height4, "IcoDam", true);

    this.scene.criticalText1 = this.createTextToScene( this.scene,
      width1,
      height5,
      `${this.scene.player1CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width1, height5, "IcoCrt", true);

    // Textos De Atributos 2
    this.scene.player2HPText = this.createTextToScene( this.scene,
      width2,
      height1,
      `${this.scene.player2HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height1, "IcoHp", false);

    this.scene.speedText2 = this.createTextToScene( this.scene,
      width2,
      height2,
      `${this.scene.player2Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height2, "IcoSp", false);

    this.createTextToScene( this.scene,
      width2,
      height3,
      `${this.scene.player2EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height3, "IcoDef", false);

    this.scene.damageText2 = this.createTextToScene( this.scene,
      width2,
      height4,
      `${this.scene.player2Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height4, "IcoDam", false);

    this.scene.criticalText2 = this.createTextToScene( this.scene,
      width2,
      height5,
      `${this.scene.player2CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(3);

    this.createTextWithIcon(width2, height5, "IcoCrt", false);
  }

  createTextWithIcon(x, y, iconKey, isPlayerOne) {
    if (isPlayerOne) {
      x = x - 73;
    }

    if (!isPlayerOne) {
      x = x + 73;
    }

    const iconObject = this.scene.add
      .sprite(x, y, iconKey)
      .setScale(0.9)
      .setDepth(3)
      .setOrigin(0.5); // Ajusta la posición y el tamaño del ícono
    return iconObject;
  }
}
