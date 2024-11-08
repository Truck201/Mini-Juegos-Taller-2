export function SoundsCoop(scene) {
    const audioFiles = [
      
      { key: "charge", path: "playCoop/SFX-charge" },
      { key: "hitPopcorn1", path: "playCoop/SFX-CollectPopcorn" },
      { key: "hitPopcorn2", path: "playCoop/SFX-CollectPopcorn2" },
      { key: "delivered", path: "playCoop/SFX-delivered" },
      { key: "bagFall1", path: "playCoop/SFX-fallBag" },
      { key: "bagFall2", path: "playCoop/SFX-bagFall2" },
      { key: "hit", path: "playCoop/SFX-hit" },
      { key: "lastSeconds", path: "playCoop/SFX-LastSeconds" },
      { key: "looseChance", path: "playCoop/SFX-looseChance" },
      { key: "loosePoints", path: "playCoop/SFX-loosePoints" },
      { key: "shoot", path: "playCoop/SFX-shoot" },
      { key: "winnerSound", path: "playCoop/SFX-winnerSound" },
      { key: "winTimer", path: "playCoop/SFX-winTime" },

      { key: "music-v4", path: "music/Musica-V5" },
      { key: "music-v5", path: "music/Musica-V6" },
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
  