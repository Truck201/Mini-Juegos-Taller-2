export function initAnimationsPopcorn(scene) {
  // Popcorn
  scene.anims.create({
    key: "PopcornAnim1",
    frames: scene.anims.generateFrameNumbers("popcorn1Sprites", {
      start: 0,
      end: 4,
    }),
    frameRate: 7,
    repeat: -1, // La animación se repite indefinidamente
  });

  // Glases
  scene.anims.create({
    key: "PopcornAnim2",
    frames: scene.anims.generateFrameNumbers("popcorn2Sprites", {
      start: 0,
      end: 4,
    }),
    frameRate: 7,
    repeat: -1,
  });

  // Glases
  scene.anims.create({
    key: "PopcornAnim3",
    frames: scene.anims.generateFrameNumbers("popcorn3Sprites", {
      start: 0,
      end: 4,
    }),
    frameRate: 7,
    repeat: -1,
  });
}
