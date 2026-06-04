#version 300 es
precision highp float;

in vec2 aPos;
in vec2 aTexCoord;

uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;

out vec2 vTexCoord;

void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    vec2 scaled = rotated * uScale;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
