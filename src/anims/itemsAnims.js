export function initAnimations(scene) {
    // Popcorn
    scene.anims.create({
      key: "popcorn-idle",
      frames: scene.anims.generateFrameNumbers("popcorn", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1, // La animación se repite indefinidamente
    });

    // Glases
    scene.anims.create({
      key: "glasses-idle",
      frames: scene.anims.generateFrameNumbers("glasses", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Candy
    scene.anims.create({
      key: "candy-idle1",
      frames: scene.anims.generateFrameNumbers("candy1", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "candy-idle2",
      frames: scene.anims.generateFrameNumbers("candy2", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "candy-idle3",
      frames: scene.anims.generateFrameNumbers("candy3", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Helados
    scene.anims.create({
      key: "icecream-idle1",
      frames: scene.anims.generateFrameNumbers("icecream1", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "icecream-idle2",
      frames: scene.anims.generateFrameNumbers("icecream2", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    scene.anims.create({
      key: "icecream-idle3",
      frames: scene.anims.generateFrameNumbers("icecream3", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Energizante
    scene.anims.create({
      key: "energizing-idle",
      frames: scene.anims.generateFrameNumbers("energizing", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Ojo de cuthulu
    scene.anims.create({
      key: "cuthulu-idle",
      frames: scene.anims.generateFrameNumbers("cuthulu", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Hacha
    scene.anims.create({
      key: "axe-idle",
      frames: scene.anims.generateFrameNumbers("axe", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Paleta
    scene.anims.create({
      key: "palete-idle",
      frames: scene.anims.generateFrameNumbers("palete", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Hamburgesa
    scene.anims.create({
      key: "burger-idle",
      frames: scene.anims.generateFrameNumbers("burger", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Chocolate
    scene.anims.create({
      key: "chocolate-idle",
      frames: scene.anims.generateFrameNumbers("chocolate", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });

    // Pizza
    scene.anims.create({
      key: "pizza-idle",
      frames: scene.anims.generateFrameNumbers("pizza", {
        start: 0,
        end: 3,
      }),
      frameRate: 4,
      repeat: -1,
    });
  }