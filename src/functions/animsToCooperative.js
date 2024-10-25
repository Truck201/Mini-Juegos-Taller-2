export function initialAnims(scene) {
  if (!scene.anims.exists("MovCintaLeft")) {
    scene.anims.create({
      key: "MovCintaLeft",
      frames: scene.anims.generateFrameNumbers("cintaIzq", {
        start: 0,
        end: 3,
      }),
      frameRate: 7,
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
      frameRate: 7,
      repeat: -1,
    });
  }

  if (!scene.anims.exists("OpBridgeLeft")) {
    scene.anims.create({
      key: "OpBridgeLeft",
      frames: scene.anims.generateFrameNumbers("AnimsBridgeLeft", {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
    });
  }

  if (!scene.anims.exists("OpBridgeRight")) {
    scene.anims.create({
      key: "OpBridgeRight",
      frames: scene.anims.generateFrameNumbers("AnimsBridgeRight", {
        start: 0,
        end: 5,
      }),
      frameRate: 7,
    });
  }
}
