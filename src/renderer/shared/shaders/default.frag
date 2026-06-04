#version 300 es
precision highp float;

in vec2 vTexCoord;
out vec4 outColor;

uniform sampler2D uMainTex;
uniform vec4 uColorFilter;
uniform float uAlpha;

void main() {
    vec4 texColor = texture(uMainTex, vTexCoord);
    outColor = texColor * uColorFilter * vec4(1.0, 1.0, 1.0, uAlpha);
}
