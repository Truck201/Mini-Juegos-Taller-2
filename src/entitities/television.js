import { CRTShaderPipeline } from "../lib/CRTShadersPipeline";
export class Television {
  constructor(scene, isInMenu) {
    this.scene = scene;

    this.y = this.scene.scale.height * 0.4;
    this.x = this.scene.scale.width / 2;

    if (isInMenu) {
      this.scale = 0.5;
      this.y = this.scene.scale.height * 0.34
    } else if (!isInMenu) {
      this.scale = 0.18;
    }

    // Sprite Television
    this.television = this.scene.physics.add
      .sprite(this.x, this.y, "l-opacidad")
      .setScale(this.scale)
      .setAlpha(0.4)
      .setDepth(80);

    this.television.setImmovable;
    this.television.body.allowGravity = false;
    this.television.setDepth(1);

    // Solo aplica el pipeline si está disponible
    if (this.crtPipeline) {
      this.television.setPipeline("crt");
    }

    this.text = this.scene.add
      .text(this.x - 15, this.y - 50, "", {
        fontSize: "70px",
        color: "#fff1e8",
      })
      .setDepth(1);

    // Asegúrate de que el shader ha sido cargado
    if (this.scene.cache.shader.has("crtShader")) {
      // Usa sys.renderer para acceder al renderer
      if (this.scene.sys.renderer && this.scene.sys.renderer.addPipeline) {
        this.crtPipeline = this.scene.sys.renderer.addPipeline(
          "crt",
          new CRTShaderPipeline(this.scene)
        );
      } else {
        console.error(
          "Renderer no está disponible o addPipeline no es una función."
        );
      }
    } else {
      console.warn("El shader CRT no ha sido cargado todavía.");
    }
  }

  updateText(remainingTime) {
    if (remainingTime <= 3 && remainingTime != -1) {
      this.text.setText(`${remainingTime}`); // Actualizar el texto con el tiempo restante
    } else if (remainingTime === 0) {
      this.text.setText("0");
    } else {
      this.text.setText(""); // Limpiar el texto si el tiempo es mayor a 3 o menor que 0
    }
  }

  update(time, delta) {
    if (this.crtPipeline) {
      this.crtPipeline.setFloat1("time", time / 1000);
    }
  }
}
