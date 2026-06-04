#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform float uBloomThreshold;
void main() {
    vec4 color = texture(uMainTex, vTexCoord);
    float brightness = dot(color.rgb, vec3(0.2126, 0.7152, 0.0722));
    outColor = brightness > uBloomThreshold ? color : vec4(0.0);
}
