class BlurEffect extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game,
      name: "BlurEffect",
      fragShader: `
                precision mediump float;

                uniform sampler2D uMainSampler;
                uniform vec2 uResolution;
                uniform float uBlurAmount;

                void main() {
                    vec2 texCoord = gl_FragCoord.xy / uResolution.xy;
                    
                    vec4 color = vec4(0.0);
                    
                    for (int x = -2; x <= 2; x++) {
                        for (int y = -2; y <= 2; y++) {
                            color += texture2D(uMainSampler, texCoord + vec2(float(x), float(y)) * uBlurAmount / uResolution);
                        }
                    }
    
                    gl_FragColor = color / 25.0; // Promedia los 25 colores muestreados
                }

            `,
    });
  }

  onPreRender() {
    this.set1f("time", this.game.loop.time / 1000); // Actualizar el tiempo
  }
}

export default BlurEffect;
