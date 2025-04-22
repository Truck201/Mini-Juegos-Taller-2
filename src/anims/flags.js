export function initAnimations(scene) {
  scene.anims.create({
    key: "Idle-Boleteria",
    frames: scene.anims.generateFrameNumbers("boleteriaBackground", {
      start: 0,
      end: 1,
    }),
    frameRate: 5,
    repeat: -1, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Crush-ARG",
    frames: scene.anims.generateFrameNumbers("CUT-ARG", {
      start: 0,
      end: 1,
    }),
    frameRate: 2,
    repeat: false, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Crush-EEUU",
    frames: scene.anims.generateFrameNumbers("CUT-EEUU", {
      start: 0,
      end: 1,
    }),
    frameRate: 2,
    repeat: false, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Crush-Play",
    frames: scene.anims.generateFrameNumbers("CUT-PLAY", {
      start: 0,
      end: 1,
    }),
    frameRate: 2,
    repeat: false, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Idle-ARG",
    frames: scene.anims.generateFrameNumbers("IDLE-ARG", {
      start: 0,
      end: 0,
    }),
    frameRate: 9,
    repeat: false, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Idle-EEUU",
    frames: scene.anims.generateFrameNumbers("IDLE-EEUU", {
      start: 0,
      end: 0,
    }),
    frameRate: 2,
    repeat: false, // La animación se repite indefinidamente
  });

  scene.anims.create({
    key: "Idle-Play",
    frames: scene.anims.generateFrameNumbers("IDLE-PLAY", {
      start: 0,
      end: 0,
    }),
    frameRate: 2,
    repeat: false, // La animación se repite indefinidamente
  });
}
