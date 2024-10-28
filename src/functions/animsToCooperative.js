export function initialAnims(scene) {
  if (!scene.anims.exists("MovCintaLeft")) {
    scene.anims.create({
      key: "MovCintaLeft",
      frames: scene.anims.generateFrameNumbers("cintaIzq", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("MovCintaRight")) {
    scene.anims.create({
      key: "MovCintaRight",
      frames: scene.anims.generateFrameNumbers("cintaDer", {
        start: 0,
        end: 3,
      }),
      frameRate: 12,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("CashFlying")) {
    scene.anims.create({
      key: "CashFlying",
      frames: scene.anims.generateFrameNumbers("FlyingCash", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1
    });
  }

  if (!scene.anims.exists("arrows-idle")) {
    scene.anims.create({
      key: "arrows-idle",
      frames: scene.anims.generateFrameNumbers("ArrowsDelivers", {
        start: 0,
        end: 1,
      }),
      frameRate: 7,
      repeat: -1
    });
  }
}
