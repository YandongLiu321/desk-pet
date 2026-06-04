#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform vec4 uTextColor;
uniform vec4 uOutlineColor;
uniform float uOutlineWidth;
void main() {
    float dist = texture(uMainTex, vTexCoord).r;
    float inner = 0.5;
    float outer = inner - uOutlineWidth;
    float alpha = smoothstep(outer, inner, dist);
    float outline = smoothstep(outer - 0.05, outer, dist) * (1.0 - alpha);
    outColor = uTextColor * alpha + uOutlineColor * outline;
}
