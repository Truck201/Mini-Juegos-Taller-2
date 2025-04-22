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

    this.createTextToScene(
      this.scene,
      width * 0.22,
      height * 0.078,
      " A D\nSpace"
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextToScene(
      this.scene,
      width * 0.78,
      height * 0.078,
      " \u2190 \u2192\nIntro"
    )
      .setOrigin(0.5)
      .setDepth(8);

    const width1 = width * 0.115;
    const width2 = width * 0.885;

    const height1 = height * 0.32;
    const height2 = height * 0.39;
    const height3 = height * 0.46;
    const height4 = height * 0.53;
    const height5 = height * 0.6;
    const height6 = height * 0.67;

    // Textos De Atributos 1
    this.scene.player1HPText = this.createTextToScene(
      this.scene,
      width1,
      height1,
      `${this.scene.player1HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height1, "hp_icon", true);

    this.scene.speedText1 = this.createTextToScene(
      this.scene,
      width1,
      height2,
      `${this.scene.player1Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height2, "speed_icon", true);

    this.createTextToScene(
      this.scene,
      width1,
      height3,
      `${this.scene.player1EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height3, "evade_icon", true); // 0.68  // 0.78

    this.scene.damageText1 = this.createTextToScene(
      this.scene,
      width1,
      height4,
      `${this.scene.player1Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height4, "damage_icon", true);

    this.scene.criticalText1 = this.createTextToScene(
      this.scene,
      width1,
      height5,
      `${this.scene.player1CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height5, "crt_icon", true);

    this.scene.anchorText1 = this.createTextToScene(
      this.scene,
      width1,
      height6,
      `${this.scene.player1Anchor.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width1, height6, "anchor_icon", true);

    // Textos De Atributos 2
    this.scene.player2HPText = this.createTextToScene(
      this.scene,
      width2,
      height1,
      `${this.scene.player2HP.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height1, "hp_icon", false);

    this.scene.speedText2 = this.createTextToScene(
      this.scene,
      width2,
      height2,
      `${this.scene.player2Speed.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height2, "speed_icon", false);

    this.createTextToScene(
      this.scene,
      width2,
      height3,
      `${this.scene.player2EvadeChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height3, "evade_icon", false);

    this.scene.damageText2 = this.createTextToScene(
      this.scene,
      width2,
      height4,
      `${this.scene.player2Damage.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height4, "damage_icon", false);

    this.scene.criticalText2 = this.createTextToScene(
      this.scene,
      width2,
      height5,
      `${this.scene.player2CriticalChance.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height5, "crt_icon", false);

    this.scene.anchorText2 = this.createTextToScene(
      this.scene,
      width2,
      height6,
      `${this.scene.player2Anchor.toString().padStart(2, "0")}`
    )
      .setOrigin(0.5)
      .setDepth(8);

    this.createTextWithIcon(width2, height6, "anchor_icon", false);
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
      .setDepth(8)
      .setOrigin(0.5); // Ajusta la posición y el tamaño del ícono
    return iconObject;
  }
}
