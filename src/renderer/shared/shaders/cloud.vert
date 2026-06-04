#version 300 es
precision highp float;
in vec2 aPos;
in vec2 aTexCoord;
uniform mat3 uViewProj;
uniform vec2 uPosition;
uniform vec2 uScale;
uniform float uRotation;
uniform vec2 uPanOffset;
uniform float uTime;
uniform float uDeformStrength;
uniform float uDeformSpeed;
out vec2 vTexCoord;
void main() {
    float c = cos(uRotation);
    float s = sin(uRotation);
    vec2 rotated = vec2(aPos.x * c - aPos.y * s, aPos.x * s + aPos.y * c);
    vec2 offset = uPanOffset;
    offset.x += sin(uTime * uDeformSpeed + aPos.y * 0.01) * uDeformStrength * 100.0;
    offset.y += cos(uTime * uDeformSpeed * 1.3 + aPos.x * 0.01) * uDeformStrength * 50.0;
    vec2 scaled = rotated * uScale + offset;
    vec2 worldPos = scaled + uPosition;
    vec3 clip = uViewProj * vec3(worldPos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    vTexCoord = aTexCoord;
}
