precision mediump float;

uniform float time;
uniform float wave[5];
uniform float width;
uniform float height;

uniform sampler2D testImage;

// Simplex 2D noise
//
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float noise(vec2 v){
    float value = snoise(v);
    if (v.x > -2.0 && v.x < 2.0)
    {
        value *= 0.2;
    }
    return value;
}

void main(void) {

    float signalToNoise = 0.5;
    float colorOffset = 0.7;

    float n0 = noise(vec2(time * 0.17,time * 0.31));
    float offset = n0 * 100.0;

    float y = gl_FragCoord.y/gl_FragCoord.w;

    float hOff = -50.0 + 50.0 * sin(wave[0] + y * 0.01) + 33.0 * sin(wave[1] + y * (y >= wave[2] && y <= wave[3] ? wave[4]: 0.013));

    float x = (gl_FragCoord.x + hOff)/gl_FragCoord.w;

    vec3 noiseColor = vec3(
        noise(vec2(x * 0.2 + offset, y * 0.2) - offset),
        noise(vec2(x * 0.2 + offset + colorOffset, y * 0.2) - offset),
        noise(vec2(x * 0.2 + offset, y * 0.2) - offset + colorOffset)
    );

    float tx = ((gl_FragCoord.x + hOff) / width);
    float ty = 1.0 - (gl_FragCoord.y / height);

    gl_FragColor = vec4(noiseColor * (1.0 - signalToNoise) + texture2D(testImage, vec2(tx,ty)).xyz * signalToNoise, 1);
}

