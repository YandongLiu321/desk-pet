#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uColorFilter;
uniform float uAlpha;
uniform float uTime;
uniform float uFlowStrength;
uniform float uFlowSpeed;
void main() {
    vec2 flowOffset = vec2(
        sin(uTime * uFlowSpeed + vTexCoord.y * 20.0) * uFlowStrength * 0.02,
        cos(uTime * uFlowSpeed * 0.7 + vTexCoord.x * 20.0) * uFlowStrength * 0.02
    );
    vec4 texColor = texture(uMainTex, vTexCoord + flowOffset);
    outColor = texColor * uColorFilter * vec4(1.0, 1.0, 1.0, uAlpha);
}
