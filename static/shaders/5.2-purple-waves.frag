#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.1415926535897

uniform vec2 u_resolution;
uniform float u_time;

// A fun time with trig.
float function(float x) {
    float time = mod(u_time, 100. * PI);
    x *= 20. * (sin(time / 50.));
    return sin(x * sin(time * .2)) * sin(6. * x + cos(time * time * .001)) * .5  + .5;
}

void main() { 
  vec2 st        = gl_FragCoord.xy / u_resolution.xy; // Normalize texture coords 0.0 to 1.0.
  float gradient = function(st.x);                    // Gradient value from function. 
  vec3 colour    = vec3(1., 0., 0.)                   // Base colour.
                   + vec3(0., .3, gradient);          // Tinted gradient colour.
                 
  gl_FragColor = vec4(colour, 1.);  // Set pixel colour.
}

// Kyle Geske - stungeye.com - Unlicense 2020 - https://unlicense.org
// This is free and unencumbered software released into the public domain