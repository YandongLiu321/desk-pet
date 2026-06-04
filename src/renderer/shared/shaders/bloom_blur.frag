#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec2 uTexelSize;
uniform float uDirection;
void main() {
    vec2 dir = uDirection < 0.5 ? vec2(uTexelSize.x, 0.0) : vec2(0.0, uTexelSize.y);
    vec4 result = vec4(0.0);
    float weights[5] = float[](0.227027, 0.1945946, 0.1216216, 0.054054, 0.016216);
    result += texture(uMainTex, vTexCoord) * weights[0];
    for (int i = 1; i < 5; i++) {
        float fi = float(i);
        result += texture(uMainTex, vTexCoord + dir * fi) * weights[i];
        result += texture(uMainTex, vTexCoord - dir * fi) * weights[i];
    }
    outColor = result;
}
