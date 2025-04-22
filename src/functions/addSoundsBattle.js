export function BattleSounds(scene) {
  // Default Battle Sounds
  scene.critical1 = scene.sound.add("doCritical1", { volume: 0.24 });
  scene.critical2 = scene.sound.add("doCritical2", { volume: 0.24 });
  scene.missSound = scene.sound.add("missSound", { volume: 0.22 });
  scene.hearbeats = scene.sound.add("heartBeats", { volume: 0.092 });
  scene.pickSword = scene.sound.add("pickSword", { volume: 0.09 });
  scene.takeDamageSound = scene.sound.add("takeDamage", { volume: 0.079 });
  scene.collisionSword = scene.sound.add("collisionSword", { volume: 0.15 });

  scene.winnerSound = scene.sound.add("winnerSound", { volume: 0.18 });
  scene.winnerPopcornRain = scene.sound.add("winRainPopcorn", { volume: 0.18 });
  scene.winnerSwordRain = scene.sound.add("winRainSwords", { volume: 0.18 });
  scene.winnerMedieval = scene.sound.add("winMedieval", { volume: 0.18 });

  scene.fallingBonus = scene.sound.add("fallingBonus", { volume: 0.1 });

  // Characters
  scene.angryLuho = scene.sound.add("angryLuho", { volume: 0.18 }); // añadir
  scene.happyLuho = scene.sound.add("happyLuho", { volume: 0.2 }); // añadir
  scene.sadLuho = scene.sound.add("sadLuhoSound", { volume: 0.18 });

  scene.cryMimbo = scene.sound.add("cryMimbo", { volume: 0.11 }); // añadir
  scene.angryMimbo = scene.sound.add("angryMimbo", { volume: 0.11 }); // añadir
  scene.happyMimbo1 = scene.sound.add("happyMimbo1", { volume: 0.11 }); // añadir
  scene.happyMimbo2 = scene.sound.add("happyMimbo2", { volume: 0.11 }); // añadir

  // Popcorn Rain
  scene.popcorn1Sound = scene.sound.add("popcorn1Sound", {
    volume: 0.15,
  });
  scene.popcorn2Sound = scene.sound.add("popcorn2Sound", {
    volume: 0.15,
  });

  scene.popcorn3Sound = scene.sound.add("popcorn3Sound", {
    volume: 0.15,
  });

  scene.collectPopcorn = scene.sound.add("collectPopcorn", {
    volume: 0.14,
  });

  // Medieval
  scene.collisionShield = scene.sound.add("fallShield", { volume: 0.08 });
  scene.collisionHeart = scene.sound.add("fallHeart", { volume: 0.09 });

  scene.isShelded = scene.sound.add("isShelded", { volume: 0.08 });
  scene.pickHeart = scene.sound.add("pickHeart", { volume: 0.25 });
  scene.inmune = scene.sound.add("setInmune", { volume: 0.007 });

  scene.music1 = scene.sound.add("MusicV4", { volume: 0.1, loop: true });
}
