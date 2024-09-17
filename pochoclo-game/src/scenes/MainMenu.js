import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create() {
        let width = this.scale.width; //Definir la mitad del Ancho
        let height = this.scale.height; //Definir la mitad del Alto
        let miImagen; //Definir una Variable en la escena
    
        //Title
        this.background = this.add.sprite(width / 2, height / 2, "l-opacidad").setScale(2);
    
        //Button
        miImagen = this.add.text(100, 240, 'Play', { fontSize: '33px', fill: '#fff' });
        //this.add.image(width / 2, height / 2, "").setScale(0.15);
        miImagen.setInteractive();
    
        //Button Animations Hover, Down, Out
        miImagen.on("pointerover", () => {
          // Cambia el tamaño de la imagen al pasar el mouse
          miImagen.setScale(1.1);
          console.log("on");
        });
    
        miImagen.on("pointerout", () => {
          // Cambia el tamaño de la imagen al pasar el mouse
          miImagen.setScale(1);
          console.log("off");
        });
    
        miImagen.on("pointerdown", () => {
          miImagen.setScale(1.2); // Vuelve al tamaño original
          console.log("active");
          // this.add.image(width / 2, height / 2, "").setScale(0.37); //Explosión
          this.time.addEvent({
            delay: 900, // demora 1 segundo en iniciar
            loop: true,
            callback: () => {
              this.transitionToNextScene(); //Llama la escena Main
            },
          });
        });
    
    
        let options; // Botón de opciones
    
        //Button
        options = this.add.text(100, 310, 'Options', { fontSize: '27px', fill: '#fff' });
        //this.add.image(width / 2, height / 2, "").setScale(0.15);
        options.setInteractive();
    
        //Button Animations Hover, Down, Out
        options.on("pointerover", () => {
          // Cambia el tamaño de la imagen al pasar el mouse
          options.setScale(1.1);
        });
    
        options.on("pointerout", () => {
          // Cambia el tamaño de la imagen al pasar el mouse
          options.setScale(1);
        });
    
        options.on("pointerdown", () => {
          options.setScale(0.9); // Vuelve al tamaño original
          console.log("active");
          // this.add.image(width / 2, height / 2, "").setScale(0.37); //Explosión
          this.time.addEvent({
            delay: 300, // demora 1 segundo en iniciar
            loop: true,
            callback: () => {
              this.toOptionsScene(); //Llama la escena Main
            },
          });
        });
    
      }
    
    
      toOptionsScene() {
        this.scene.start("opcionesScene"); //Ir a escena Opciones
      }
    
      transitionToNextScene() {
        // Crear el efecto de zoom out
        this.cameras.main.zoomTo(0.4179, 1300); // Reducir el zoom en 1 segundo (1000 ms)
    
        // Esperar un poco antes de iniciar la siguiente escena
        this.time.delayedCall(1500, () => {
          this.scene.start("Game1vs1"); //Ir a escena Main
        });
      }
    
    }