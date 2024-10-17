class TVScanlineFx extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game,
      name: "TVScanlineFx",
      fragShader: `
                precision mediump float;

                uniform float     time;
                uniform vec2      resolution;
                uniform sampler2D uMainSampler;
                varying vec2      outTexCoord;

                // Función para generar un efecto de barrido
                float scanline(float y, float speed, float width) {
                    return smoothstep(0.0, width, abs(mod(y + speed * time, 1.0)));
                }

                void main(void) {
                    vec2 uv = outTexCoord;
                    vec4 color = texture2D(uMainSampler, uv);

                    // Crear un barrido vertical más notorio
                    float verticalScan = scanline(uv.y, 0.5, 0.05);  // Aumentamos la velocidad y el ancho del barrido
                    float horizontalScan = scanline(uv.x, 0.3, 0.05); // Aumentamos la velocidad y el ancho del barrido

                    // Alternar entre el barrido horizontal y vertical
                    float scan = mix(verticalScan, horizontalScan, step(0.5, mod(time * 0.7, 1.0))); // Hacer el cambio más dinámico

                    // Aumentar el impacto del brillo durante el barrido
                    color.rgb *= 0.7 + 0.3 * scan;  // Aumentamos la variación en el brillo

                    gl_FragColor = vec4(color.rgb, 1.0);
                }
            `,
    });
  }

  onPreRender() {
    this.set1f("time", this.game.loop.time / 1000); // Tiempo para controlar el barrido
  }
}

export default TVScanlineFx;
