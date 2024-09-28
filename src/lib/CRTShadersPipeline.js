// src/lib/CRTShadersPipeline.js

import Phaser from "phaser";

export class CRTShaderPipeline extends Phaser.Renderer.WebGL.Pipelines
  .MultiPipeline {
  constructor(game) {
    super({
      game: game,
      renderer: game.renderer,
      fragShader: `
                precision mediump float;
                uniform sampler2D uMainSampler[%count%]; // Para múltiples texturas
                uniform float time;
                varying vec2 outTexCoord;

                void main(void) {
                    vec2 uv = outTexCoord;

                    // Efecto de distorsión
                    uv.x += 0.005 * sin(uv.y * 30.0 + time * 5.0);
                    
                    // Desplazamiento RGB
                    vec4 color;
                    color.r = texture2D(uMainSampler[0], uv + vec2(0.002, 0.0)).r;
                    color.g = texture2D(uMainSampler[0], uv).g;
                    color.b = texture2D(uMainSampler[0], uv - vec2(0.002, 0.0)).b;

                    // Añadir ruido estático
                    float noise = fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453);
                    color.rgb += noise * 0.02;

                    // Efecto de líneas de barrido (scanlines)
                    float scanline = sin(uv.y * 800.0) * 0.05;
                    color.rgb -= scanline;

                    gl_FragColor = color;
                }
            `,
    });
  }

  onPreRender() {
    this.set1f("time", this.game.loop.time / 1000); // Actualizamos el tiempo cada frame
  }
}
