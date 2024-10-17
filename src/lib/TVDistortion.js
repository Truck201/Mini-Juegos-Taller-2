class TVDistortionFx extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game,
            name: "TVDistortionFx",
            fragShader: `
                precision mediump float;

                uniform float     time;
                uniform vec2      resolution;
                uniform sampler2D uMainSampler;
                varying vec2      outTexCoord;

                void main(void) {
                    vec2 uv = outTexCoord;

                    // Desplazar colores para el efecto de RGB desalineado
                    float r = texture2D(uMainSampler, uv + vec2(0.002, 0.0)).r;
                    float g = texture2D(uMainSampler, uv).g;
                    float b = texture2D(uMainSampler, uv - vec2(0.002, 0.0)).b;

                    // Efecto de ruido
                    float noise = fract(sin(dot(uv.xy ,vec2(12.9898,78.233))) * 43758.5453) * 0.1;

                    // Distorsión en ondas
                    uv.y += sin(uv.x * 10.0 + time) * 0.02;

                    // Añadir ruido a los colores
                    vec3 color = vec3(r + noise, g + noise, b + noise);

                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });
    }

    onPreRender() {
        this.set1f("time", this.game.loop.time / 1000); // Actualizar el tiempo
    }
}

export default TVDistortionFx;
