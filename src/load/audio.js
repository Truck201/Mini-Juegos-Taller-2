export function Sounds(scene) {
  const audioFiles = [
    { key: "breakTicket", path: "languageChoose/SFX-brokeFlag" },
    { key: "selectFlag", path: "languageChoose/SFX-selectFlag" },

    { key: "hooverSelection1", path: "mainMenu/SFX-selections1" },
    { key: "hooverSelection2", path: "mainMenu/SFX-selections2" },
    { key: "hooverSelection3", path: "mainMenu/SFX-selections3" },
    { key: "select", path: "mainMenu/SFX-select" },

    { key: "charging", path: "playCoop/SFX-charge" },
    { key: "loseChance", path: "playCoop/SFX-looseChance" },
    { key: "winner", path: "playCoop/SFX-winnerSound" },

    { key: "appearPopcorn1", path: "recolect/SFX-appearPochoclo1" },
    { key: "appearPopcorn2", path: "recolect/SFX-appearPochoclo2" },
    { key: "screamCartoon", path: "recolect/SFX-cartoonScream" }, // add
    { key: "eagleScream", path: "recolect/SFX-eagleSound" }, // add
    { key: "collectPopcorn", path: "recolect/SFX-collectPopcorn" },
    { key: "looseCombo", path: "recolect/SFX-loseCombo" },
    { key: "winCombo", path: "recolect/SFX-winCombo" },

    { key: "urbanSounds", path: "shop/SFX-urbanSound" },
    { key: "sellSound", path: "shop/SFX-sellSound" },
    { key: "chooseAnItem", path: "shop/SFX-chooseAnItem" },
    { key: "dogBark1", path: "shop/SFX-barkDoggo1" },
    { key: "dogBark2", path: "shop/SFX-barkDoggo2" },
    { key: "dogBark3", path: "shop/SFX-barkDoggo3" },
    { key: "buySomething", path: "shop/SFX-buy" },
    { key: "noCash", path: "shop/SFX-noMoney" },
    { key: "starterSoundShop", path: "shop/SFX-startShop" },

    { key: "doCritical1", path: "battle/SFX-critical1" },
    { key: "doCritical2", path: "battle/SFX-critical2" },
    { key: "pickSword", path: "battle/SFX-pickSword" },
    { key: "takeDamage", path: "battle/SFX-takeDamage" },
    { key: "winnerSound", path: "battle/SFX-winnerSound" }, // REVISAR

    { key: "missSound", path: "battle/SFX-missSound" },
    { key: "heartBeats", path: "battle/SFX-heartbeat" },
    { key: "collisionSword", path: "battle/SFX-fallSword" },

    { key: "winRainSwords", path: "battle/SFX-winRainSword" },
    { key: "winRainPopcorn", path: "battle/SFX-winRainPopcorn" },
    { key: "winMedieval", path: "battle/SFX-winMedieval" },

    { key: "fallingBonus", path: "battle/medieval/SFX-fallingBonus" },
    { key: "fallShield", path: "battle/medieval/SFX-fallShield" },
    { key: "fallHeart", path: "battle/medieval/SFX-fallHeart" },
    { key: "isShelded", path: "battle/medieval/SFX-isShelded" },
    { key: "pickHeart", path: "battle/medieval/SFX-pickHeart" },
    { key: "setInmune", path: "battle/medieval/SFX-pickShield" },
    { key: "popcorn1Sound", path: "battle/rainPopcorn/SFX-popcorn1" },
    { key: "popcorn2Sound", path: "battle/rainPopcorn/SFX-popcorn2" },
    { key: "popcorn3Sound", path: "battle/rainPopcorn/SFX-popcorn3" },

    { key: "whiteNoise", path: "television/SFX-whiteNoise" },

    { key: "goBackSound", path: "kidKorn/SFX-goBack" },
    { key: "goInSound", path: "kidKorn/SFX-goIn" },

    { key: "combo1", path: "combo/SFX-comboHit1" },
    { key: "combo2", path: "combo/SFX-comboHit2" },
    { key: "combo3", path: "combo/SFX-comboHit3" },
    { key: "combo4", path: "combo/SFX-comboHit4" },
    { key: "combo5", path: "combo/SFX-comboHit5" },

    { key: "sadLuhoSound", path: "characters/SFX-sadLuho" },
    { key: "embarassLuho", path: "characters/SFX-embarassLuho" }, 
    { key: "angryLuho", path: "characters/SFX-angryLuho" }, 
    { key: "happyLuho", path: "characters/SFX-smileLuho" }, 

    { key: "angryMimbo", path: "characters/SFX-angryMimbo" }, 
    { key: "happyMimbo1", path: "characters/SFX-happyMimbo2" }, 
    { key: "happyMimbo2", path: "characters/SFX-happyMimbo1" }, 
    { key: "cryMimbo", path: "characters/SFX-cryMimbo" }, 

    { key: "dialoguesSound", path: "dialogues/SFX-voiceDialogue" },

    { key: "MusicV1", path: "music/Musica-V" },
    { key: "MusicV2", path: "music/Musica-V" },
    { key: "MusicV3", path: "music/Musica-V" },
    { key: "MusicV4", path: "music/Musica-V" },
  ];


  audioFiles.forEach(({ key, path }) => {
    // Carga en dos formatos para mayor compatibilidad
    scene.load.audio(key, [`/assets/audio/${path}.ogg`]);
  });

  // Manejo de errores de carga de audio
  scene.load.on("fileerror", (file) => {
    console.error(`Error loading file: ${file.src}`);
  });
}
