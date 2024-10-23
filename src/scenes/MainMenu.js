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
  }

  init(data) {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    this.allicons = [];
    this.language = data.language || getLanguageConfig();
  }

  create() {
    let width = this.scale.width; //Definir la mitad del Ancho
    let height = this.scale.height; //Definir la mitad del Alto

    // Añadimos los sonidos
    this.HooverSelect1 = this.sound.add("hooverSelection1", { volume: 0.08 });
    this.HooverSelect2 = this.sound.add("hooverSelection2", { volume: 0.08 });
    this.HooverSelect3 = this.sound.add("hooverSelection3", { volume: 0.08 });

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
      `../public/data/kidKornDialogues_${this.language}.json`
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
      playVersusButton.setScale(1.3); // Vuelve al tamaño original
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
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
      playCooperativeButton.setScale(1.3); // Vuelve al tamaño original
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 900, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          optionsButton.setText("");
          playVersusButton.setText("");
          playCooperativeButton.setText("");
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
      optionsButton.setScale(0.9); // Vuelve al tamaño original
      this.cameras.main.zoomTo(1.8, 1200);
      this.cameras.main.fadeOut(1200, 0, 0, 0);
      // this.add.image(width / 2, height / 2, '').setScale(0.37); //Explosión
      this.time.addEvent({
        delay: 1200, // demora 1 segundo en iniciar
        loop: true,
        callback: () => {
          optionsButton.setText("");
          playVersusButton.setText("");
          playCooperativeButton.setText("");
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

    this.cameras.main.setAlpha(1); // Restaurar la opacidad normal

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

    // Crear el ícono que se moverá
    this.movingIcon = this.add
      .image(
        Phaser.Math.Between(0, width), // Posición inicial X aleatoria
        Phaser.Math.Between(0, height), // Posición inicial Y aleatoria
        "logo"
      )
      .setScale(0.5);

    // Movimiento del ícono por la pantalla con posiciones y duraciones aleatorias
    this.tweens.add({
      targets: this.movingIcon,
      x: Phaser.Math.Between(0, width), // Posición final X aleatoria
      y: Phaser.Math.Between(0, height), // Posición final Y aleatoria
      duration: Phaser.Math.Between(2000, 6000), // Duración aleatoria del movimiento
      repeat: -1,
      yoyo: true,
      ease: "Sine.easeInOut", // Movimiento más suave
    });

    // Guardar el ícono en el array
    this.allicons.push(this.movingIcon);

    // Agregar opacidad a la pantalla
    this.cameras.main.setAlpha(0.5);
  }

  toOptionsScene() {
    this.scene.start("opcionesScene"); //Ir a escena Opciones
  }

  transitionToVersus() {
    // Crear el efecto de zoom out
    this.cameras.main.zoomTo(0.6, 1300); // Reducir el zoom en 1 segundo (1000 ms)   0.4179

    // Esperar un poco antes de iniciar la siguiente escena
    this.time.delayedCall(1500, () => {
      this.scene.start("Game1vs1", {
        dialogues: this.dialogues,
        language: this.language,
      }); //Ir a escena Main
    });
    console.log(this.language)
  }

  transitionToCoperative() {
    this.cameras.main.zoomTo(1.4179, 1300);

    // Esperar un poco antes de iniciar la siguiente escena
    this.time.delayedCall(1500, () => {
      this.scene.start("startCoop"); //Ir a escena Main
    });
  }
}
