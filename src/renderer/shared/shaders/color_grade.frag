#version 300 es
precision highp float;
in vec2 vTexCoord;
out vec4 outColor;
uniform sampler2D uMainTex;
uniform sampler2D uLUT;
void main() {
    vec3 color = texture(uMainTex, vTexCoord).rgb;
    float bIndex = color.b * 15.0;
    float tileX = mod(bIndex, 16.0);
    float tileY = floor(bIndex / 16.0);
    vec2 lutCoord = vec2(
        (tileX * 16.0 + color.r * 15.0) / 256.0,
        (tileY * 16.0 + color.g * 15.0) / 16.0
    );
    outColor = vec4(texture(uLUT, lutCoord).rgb, 1.0);
}
