export function Sounds(scene) {
  const audioFiles = [
    { key: "breakTicket", path: "languageChoose/SFX-brokeFlag" },
    { key: "hooverSelection1", path: "mainMenu/SFX-selections1" },
    { key: "hooverSelection2", path: "mainMenu/SFX-selections2" },
    { key: "hooverSelection3", path: "mainMenu/SFX-selections3" },
    { key: "select", path: "mainMenu/SFX-select" },
    { key: "charging", path: "playCoop/SFX-charge" },
    { key: "loseChance", path: "playCoop/SFX-looseChance" },
    { key: "winner", path: "playCoop/SFX-winnerSound" },
    { key: "appearPopcorn1", path: "recolect/SFX-appearPochoclo1" },
    { key: "appearPopcorn2", path: "recolect/SFX-appearPochoclo2" },
    { key: "collectPopcorn", path: "recolect/SFX-collectPopcorn" },
    { key: "looseCombo", path: "recolect/SFX-loseCombo" },
    { key: "winCombo", path: "recolect/SFX-winCombo" },
    { key: "urbanSounds", path: "shop/SFX-urbanSound" },
    { key: "sellSound", path: "shop/SFX-sellSound" },
    { key: "chooseAnItem", path: "shop/SFX-chooseAnItem" },
    { key: "dogBark", path: "shop/SFX-barkDoggo" },
    { key: "buySomething", path: "shop/SFX-buy" },
    { key: "noCash", path: "shop/SFX-noMoney" },
    { key: "starterSoundShop", path: "shop/SFX-startShop" },
    { key: "doCritical1", path: "battle/SFX-critical1" },
    { key: "doCritical2", path: "battle/SFX-critical2" },
    { key: "pickSword", path: "battle/SFX-pickSword" },
    { key: "takeDamage", path: "battle/SFX-takeDamage" },
    { key: "winnerSound", path: "battle/SFX-winnerSound" },
    { key: "isShelded", path: "battle/medieval/SFX-isShelded" },
    { key: "pickHeart", path: "battle/medieval/SFX-pickHeart" },
    { key: "setInmune", path: "battle/medieval/SFX-pickShield" },
    { key: "popcorn1Sound", path: "battle/rainPopcorn/SFX-popcorn1" },
    { key: "popcorn2Sound", path: "battle/rainPopcorn/SFX-popcorn2" },
    { key: "popcorn3Sound", path: "battle/rainPopcorn/SFX-popcorn3" },
    { key: "whiteNoise", path: "television/SFX-whiteNoise" },
    { key: "goBackSound", path: "kidKorn/SFX-goBack" },
    { key: "goInSound", path: "kidKorn/SFX-goIn" },
    { key: "sadLuhoSound", path: "characters/SFX-sadLuho" },
    { key: "dialoguesSound", path: "dialogues/SFX-voiceDialogue" },
  ];

  audioFiles.forEach(({ key, path }) => {
    // Carga en dos formatos para mayor compatibilidad
    scene.load.audio(key, [`../public/assets/audio/${path}.ogg`]);
  });

  // Manejo de errores de carga de audio
  scene.load.on("fileerror", (file) => {
    console.error(`Error loading file: ${file.src}`);
  });
}
