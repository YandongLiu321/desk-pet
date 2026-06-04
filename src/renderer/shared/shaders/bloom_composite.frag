#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uSceneTex;
uniform sampler2D uBloomTex;
uniform float uBloomStrength;
void main() {
    vec4 scene = texture(uSceneTex, vTexCoord);
    vec4 bloom = texture(uBloomTex, vTexCoord);
    outColor = scene + bloom * uBloomStrength;
}
