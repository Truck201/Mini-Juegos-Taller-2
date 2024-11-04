export function initialAnimsBattle(scene) {
  if (!scene.anims.exists("Thunderbolt-Light")) {
    scene.anims.create({
      key: "Thunderbolt-Light",
      frames: scene.anims.generateFrameNumbers("thunderbolt", {
        start: 0,
        end: 5,
      }),
      frameRate: 12.5,
    });
    console.log("Que ondaa, funciona?  -->  ")
  }
}
