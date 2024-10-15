export function animationsScene(scene) {
  // Target
  const targetAnim = [
    scene.anims.create({
      key: "AnimsTarget",
      frames: scene.anims.generateFrameNumbers("Diana", {
        start: 0,
        end: 2,
      }),
      frameRate: 9,
    }),
  ];

  const bagsAnims = [
    scene.anims.create({
      key: "BFBlue",
      frames: scene.anims.generateFrameNumbers("AnimsBlueBag", {
        start: 0,
        end: 3,
      }),
      frameRate: 11.5,
    }),

    scene.anims.create({
      key: "BFPurple",
      frames: scene.anims.generateFrameNumbers("AnimsPurpleBag", {
        start: 0,
        end: 3,
      }),
      frameRate: 11.5,
    }),

    scene.anims.create({
      key: "BFOrange",
      frames: scene.anims.generateFrameNumbers("AnimsOrangeBag", {
        start: 0,
        end: 3,
      }),
      frameRate: 11.5,
    }),

    scene.anims.create({
      key: "BFRose",
      frames: scene.anims.generateFrameNumbers("AnimsRoseBag", {
        start: 0,
        end: 3,
      }),
      frameRate: 11.5,
    }),

    scene.anims.create({
      key: "BFGreen",
      frames: scene.anims.generateFrameNumbers("AnimsGreenBag", {
        start: 0,
        end: 3,
      }),
      frameRate: 11.5,
    }),
  ];

  return { targetAnim, bagsAnims };
}
