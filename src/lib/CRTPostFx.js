class CRTPostFx extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor(game) {
        super({
            game,
            name: "CRTPostFx",
            fragShader: `
                precision mediump float;

                uniform float     time;
                uniform vec2      resolution;
                uniform sampler2D uMainSampler;
                varying vec2      outTexCoord;

                // Función para generar ruido
                float random(vec2 co) {
                    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
                }

                void main(void) {
                    vec2 uv = outTexCoord;

                    // Desplazamiento vertical basado en el tiempo
                    uv.y += mod(time * 0.5, 1.0);

                    // Desplazamiento horizontal aleatorio basado en el tiempo
                    float randomShift = 0.02 * sin(time * 10.0);
                    uv.x += randomShift;

                    // Efecto de distorsión horizontal
                    uv.x += 0.05 * sin(uv.y * 30.0 + time * 5.0);

                    // Generar ruido
                    float noise = random(uv + time) * 0.2;

                    // Añadir líneas horizontales
                    float scanline = sin(uv.y * resolution.y * 0.5) * 0.1;

                    // Ajustar el color verde para las franjas
                    float r = texture2D(uMainSampler, uv + vec2(0.005, 0.0)).r;
                    float g = texture2D(uMainSampler, uv).g * 1.5; // Aumentar el verde
                    float b = texture2D(uMainSampler, uv - vec2(0.005, 0.0)).b;

                    // Combinar efectos
                    vec3 color = vec3(r, g, b) + noise + scanline;

                    gl_FragColor = vec4(color, 1.0);
                }
            `
        });
        this._hueSpeed = 0.001;
    }

    onPreRender() {
        this.set1f("time", this.game.loop.time / 1000); // Actualizamos el tiempo cada frame
    }

    get hueSpeed() {
        return this._hueSpeed;
    }

    set hueSpeed(value) {
        this._hueSpeed = value;
    }

    update(time, delta) {
        this.set1f("time", time / 1000);
    }
}

export default CRTPostFx;