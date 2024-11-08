export function addSoundsCooperative(scene) {
    // Default 
    scene.chargeSlingshot = scene.sound.add("charge", { volume: 0.1 });
    scene.hitPopcorn1 = scene.sound.add("hitPopcorn1", { volume: 0.1 });
    scene.hitPopcorn2 = scene.sound.add("hitPopcorn2", { volume: 0.1 });
    scene.deliveredSound = scene.sound.add("delivered", { volume: 0.09 });
    scene.bagFall1 = scene.sound.add("bagFall1", { volume: 0.09 });
    scene.bagFall2 = scene.sound.add("bagFall2", { volume: 0.09 });
    scene.hit = scene.sound.add("hit", { volume: 0.09 });
    scene.lastSeconds = scene.sound.add("lastSeconds", { volume: 0.09 });
    scene.looseChance = scene.sound.add("looseChance", { volume: 0.09 });
    scene.loosePoints = scene.sound.add("loosePoints", { volume: 0.09 });
    scene.shoot = scene.sound.add("shoot", { volume: 0.09 });
    scene.winnerSound = scene.sound.add("winnerSound", { volume: 0.09 });
    scene.winTimer = scene.sound.add("winTimer", { volume: 0.09 });

    // Personajes
    scene.sadLuho = scene.sound.add("sadLuhoSound", { volume: 0.12 });
    scene.embarassLuho = scene.sound.add("embarassLuho", { volume: 0.12 }); 
    scene.angryLuho = scene.sound.add("angryLuho", { volume: 0.07 }); 
    scene.happyLuho = scene.sound.add("happyLuho", { volume: 0.15 }); 

    scene.cryMimbo = scene.sound.add("cryMimbo", { volume: 0.09 }); 
    scene.angryMimbo = scene.sound.add("angryMimbo", { volume: 0.09 }); 
    scene.happyMimbo1 = scene.sound.add("happyMimbo1", { volume: 0.15 }); 
    scene.happyMimbo2 = scene.sound.add("happyMimbo2", { volume: 0.15 }); 

    // Music
    scene.backgroundMusic = scene.sound.add("music-v5", { volume: 0.09, loop: true,});


  }
  