#version 300 es
precision highp float;
in float vAlpha;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uStartColor;
uniform vec4 uEndColor;
void main() {
    vec4 texColor = texture(uMainTex, gl_PointCoord);
    outColor = texColor * mix(uStartColor, uEndColor, 1.0 - vAlpha) * vAlpha;
}
