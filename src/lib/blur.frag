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
