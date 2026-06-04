#version 300 es
precision highp float;
in vec3 aInstanceData;
uniform mat3 uViewProj;
uniform vec2 uParticleSize;
out float vAlpha;
void main() {
    vec2 pos = aInstanceData.xy;
    float progress = aInstanceData.z;
    vec3 clip = uViewProj * vec3(pos, 1.0);
    gl_Position = vec4(clip.xy, 0.0, 1.0);
    gl_PointSize = mix(uParticleSize.x, uParticleSize.y, progress);
    vAlpha = 1.0 - progress;
}
