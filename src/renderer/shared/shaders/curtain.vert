#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aTexCoord;
uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;
uniform float uTime;
uniform float uSwingSpeed;
uniform float uSwingStrength;
uniform float uSwingTimeOffset;
out vec2 vTexCoord;
void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    float sway = sin(uTime * uSwingSpeed + uSwingTimeOffset) * uSwingStrength * (1.0 - aTexCoord.y);
    rotated.x += sway * 100.0;
    vec2 scaled = rotated * uScale;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
