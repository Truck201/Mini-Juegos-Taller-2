import CRTPostFx from "../lib/CRTPostFx";
import TVDistortionFx from "../lib/TVDistortion";
import { BaseScene } from "../lib/FontsBase";
import { Television } from "../entitities/television";
import { getLanguageConfig, getPhrase } from "../services/translations";
import TVStaticFx from "../lib/TVScanEffect";
export class MainMenu extends BaseScene {
  constructor() {
    super("MainMenu");
    this.movingIcon = null;
    this.allicons = null;
    this.opacityLayer = null;
  }

  init(data) {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.allicons = [];
    this.language = data.language || getLanguageConfig();
  }

  create() {
    let width = this.scale.width; //Definir la mitad del Ancho
    let height = this.scale.height; //Definir la mitad del Alto

    this.randomSprite = ["logo1", "logo2", "logo3", "logo4", "logo5"];

    this.logojuego = this.add
      .sprite(width * 0.5, height * 0.47, "logoJuego")
      .setDepth(140).setOrigin(0.5);

    // Primer tween: Expande el logo de 1.2 a 1.6 en 2 segundos
    this.tweens.add({
      targets: this.logojuego,
      scale: { from: 0.6, to: 0.76 },
      duration: 800,
      ease: "Sine.easeInOut",
      onComplete: () => {
        // Segundo tween: Reduce el logo hasta desaparecer
        this.tweens.add({
          targets: this.logojuego,
          scale: 0.23,
          alpha: { from: 1, to: 0.9 },
          y: height * 0.7,
          duration: 400, // Duración de la desaparición (1 segundo)
          ease: "Sine.easeIn",
          // onComplete: () => {
          //   this.logojuego.destroy(); // Eliminar el texto después de la animación
          // },
        });
      },
    });

    // Añadimos los sonidos
    this.HooverSelect1 = this.sound.add("hooverSelection1", { volume: 0.08 });
    this.HooverSelect2 = this.sound.add("hooverSelection2", { volume: 0.08 });
    this.HooverSelect3 = this.sound.add("hooverSelection3", { volume: 0.08 });

    this.mainMenuMusic = this.sound.add("MusicV3", {
      volume: 0.08,
      loop: true,
    });
    this.mainMenuMusic.play();

    this.selected = this.sound.add("select");

    // Añadir los efectos shader a la cámara
    this.crtEffect = this.game.renderer.pipelines.addPostPipeline(
      "CRTPostFx",
      CRTPostFx
    );
    this.distortionEffect = this.game.renderer.pipelines.addPostPipeline(
      "TVDistortionFx",
      TVDistortionFx
    );
    this.staticEffect = this.game.renderer.pipelines.addPostPipeline(
      "TVStaticFx",
      TVStaticFx
    );

    // Aplicar el efecto CRT a la cámara principal
    // this.cameras.main.setPostPipeline(TVStaticFx);

    // Cargar los diálogos del archivo correspondiente según el idioma seleccionado
    const dialoguesPath = `kidKornDialogues_${this.language}`;
    console.log(`Cargando diálogos desde: ${dialoguesPath}`);

    this.load.json(
      dialoguesPath,
      `/data/kidKornDialogues_${this.language}.json` // ../public
    );
    this.load.once("complete", () => {
      this.dialogues = this.cache.json.get(dialoguesPath);
      console.log("Cargaron Dialogos"); // Iniciar la lógica de tu escena una vez que los diálogos estén cargados
    });
    this.load.start(); // Iniciar la carga del JSON

    //Title
    this.background = this.add
      .sprite(width * 0.48, height * 0.65, "menu-background")
      .setScale(2.9)
      .setDepth(3);

    // Agregar una capa semi-transparente en lugar de modificar la cámara
    this.opacityLayer = this.add
      .rectangle(width / 2, height / 2, width, height, 0x000000, 0.3)
      .setDepth(2)
      .setVisible(false); // Mantenerlo invisible inicialmente

    //Button Versus
    const playVersusButton = this.createText(
      width / 2,
      height * 0.34,
      getPhrase("JugarContra")
    )
      .setScale(1.4)
      .setInteractive()
      .setDepth(3)
      .setOrigin(0.5);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    playVersusButton.setInteractive();

    // Aplicar el segundo shader al botón de Versus
    playVersusButton.setPipeline("TVDistortionFx");

    //Button Animations Hover, Down, Out
    playVersusButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      this.HooverSelect3.play();
      playVersusButton.setScale(1.7);
    });

    playVersusButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      playVersusButton.setScale(1.4);
    });

    playVersusButton.on("pointerdown", () => {
      this.selected.play();
      optionsButton.destroy();
      playVersusButton.destroy();
      playCooperativeButton.destroy();
      this.time.addEvent({
        delay: 900, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          this.transitionToVersus(); //Llama la escena Game 1vs1
        },
      });
    });

    //Button Cooperative
    const playCooperativeButton = this.createText(
      width / 2,
      height * 0.42,
      getPhrase("JugarCoop")
    )
      .setScale(1.4)
      .setInteractive()
      .setDepth(3)
      .setOrigin(0.5);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    playCooperativeButton.setInteractive();

    //Button Animations Hover, Down, Out
    playCooperativeButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      playCooperativeButton.setScale(1.7);
      this.HooverSelect2.play();
    });

    playCooperativeButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      playCooperativeButton.setScale(1.4);
      this.HooverSelect2.stop();
    });

    playCooperativeButton.on("pointerdown", () => {
      optionsButton.destroy();
      playVersusButton.destroy();
      playCooperativeButton.destroy();
      this.time.addEvent({
        delay: 900, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          this.transitionToCoperative(); //Llama la escena Coop
        },
      });
    });

    // Control de inactividad
    this.inactivityTimer = this.time.addEvent({
      delay: 11000, // 1 minuto
      callback: this.showIconScreen,
      callbackScope: this,
      loop: true,
    });

    // Detectar movimiento del mouse
    this.input.on("pointermove", () => {
      this.resetInactivityTimer();
    });

    //Button
    const optionsButton = this.createText(
      width / 2,
      height * 0.5,
      getPhrase("Opciones")
    )
      .setDepth(3)
      .setOrigin(0.5);
    //this.add.image(width / 2, height / 2, '').setScale(0.15);
    optionsButton.setInteractive();

    // Aplicar el segundo shader al botón de Opciones
    optionsButton.setPipeline("TVDistortionFx");

    //Button Animations Hover, Down, Out
    optionsButton.on("pointerover", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      optionsButton.setScale(1.1);
      this.HooverSelect1.play();
    });

    optionsButton.on("pointerout", () => {
      // Cambia el tamaño de la imagen al pasar el mouse
      optionsButton.setScale(1);
      this.HooverSelect1.stop();
    });

    optionsButton.on("pointerdown", () => {
      optionsButton.destroy();
      playVersusButton.destroy();
      playCooperativeButton.destroy();
      this.cameras.main.zoomTo(1.8, 1200);
      this.cameras.main.fadeOut(1200, 0, 0, 0);
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 1200, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          this.toOptionsScene(); //Llama la escena Main
        },
      });
    });

    this.television = new Television(this, true);
  }

  resetInactivityTimer() {
    // Si hay objetos en el array allicons, eliminarlos
    if (this.allicons.length > 0) {
      this.allicons.forEach((icon) => {
        icon.destroy(); // Destruir cada objeto en el array
      });
      this.allicons = []; // Vaciar el array después de destruir los objetos
    }

    // Hacer invisible la capa de opacidad en lugar de ajustar la cámara
    this.opacityLayer.setVisible(false);

    // Reiniciar el temporizador de inactividad
    this.inactivityTimer.reset({
      delay: 11000,
      callback: this.showIconScreen,
      callbackScope: this,
      loop: true,
    });
  }

  showIconScreen() {
    let width = this.scale.width;
    let height = this.scale.height;

    let index = Phaser.Math.Between(0, 4);
    const logoSpritePick = this.randomSprite[index];

    // Crear el ícono que se moverá
    this.movingIcon = this.add
      .image(
        Phaser.Math.Between(0, width), // Posición inicial X aleatoria
        Phaser.Math.Between(0, height), // Posición inicial Y aleatoria
        logoSpritePick
      )
      .setDepth(1)
      .setScale(0.97);

    // Movimiento del ícono por la pantalla con posiciones y duraciones aleatorias
    this.tweens.add({
      targets: this.movingIcon,
      x: Phaser.Math.Between(width * 0.11, width * 0.89), // Posición final X aleatoria
      y: Phaser.Math.Between(height * 0.107, height * 0.107), // Posición final Y aleatoria
      duration: Phaser.Math.Between(2000, 6000), // Duración aleatoria del movimiento
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut", // Movimiento más suave
    });

    // Guardar el ícono en el array
    this.allicons.push(this.movingIcon);

    // // Agregar opacidad a la pantalla
    // this.cameras.main.setAlpha(0.7);

    // Mostrar la capa de opacidad al activar la pantalla de íconos
    this.opacityLayer.setVisible(true);
  }

  toOptionsScene() {
    this.mainMenuMusic.stop();
    this.scene.start("opcionesScene", { language: this.language }); //Ir a escena Opciones
  }

  transitionToVersus() {
    // Crear el efecto de zoom out
    this.cameras.main.zoomTo(0.6, 1300); // Reducir el zoom en 1 segundo (1000 ms)   0.4179

    // Esperar un poco antes de iniciar la siguiente escena
    this.time.delayedCall(1500, () => {
      this.mainMenuMusic.stop();
      this.scene.start("PreloadVersus", {
        dialogues: this.dialogues,
        language: this.language,
      }); //Ir a escena Main
    });
    console.log(this.language);
  }

  transitionToCoperative() {
    this.cameras.main.zoomTo(1.4179, 1300);
    this.mainMenuMusic.stop();
    // Esperar un poco antes de iniciar la siguiente escena
    this.time.delayedCall(1500, () => {
      this.scene.start("PreloadCoop", {
        language: this.language,
      }); //Ir a escena Main
    });
  }
}
