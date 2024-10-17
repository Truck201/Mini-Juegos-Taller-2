class TVStaticFx extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game,
      name: "TVStaticFx",
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

              // Función para generar ruido de estática
              float random(vec2 uv) {
                  return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
              }

              void main(void) {
                  vec2 uv = outTexCoord;
                  vec4 color = texture2D(uMainSampler, uv);

                  // Efecto de barrido vertical y horizontal
                  float verticalScan = scanline(uv.y, 0.5, 0.05);  // Aumentamos la velocidad y el ancho del barrido
                  float horizontalScan = scanline(uv.x, 0.3, 0.05); // Aumentamos la velocidad y el ancho del barrido

                  // Alternar entre el barrido horizontal y vertical
                  float scan = mix(verticalScan, horizontalScan, step(0.5, mod(time * 0.7, 1.0)));

                  // Añadir ruido de estática
                  float noise = random(uv * time * 0.1) * 0.3;

                  // Simular movimientos ocasionales de temblor en el televisor
                  float shakeAmount = sin(time * 5.0) * 0.005; // Ligero temblor en los bordes
                  uv.x += shakeAmount * step(0.95, fract(sin(time * 0.2) * 43758.5453)); // Temblor ocasional

                  // Ajustar brillo y aplicar ruido y temblor
                  color.rgb *= 0.7 + 0.3 * scan + noise;  // Aumentamos la variación en el brillo con estática

                  gl_FragColor = vec4(color.rgb, 1.0);
              }
          `,
    });
  }

  onPreRender() {
    this.set1f("time", this.game.loop.time / 1000); // Tiempo para controlar el barrido, estática y temblor
  }
}

export default TVStaticFx;
