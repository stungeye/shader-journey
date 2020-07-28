#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
// st = texture coordinates   pct = % from 0.0 to 1.0
float plotIt(vec2 st, float pct){
  const float halfSmoothWidth = 0.006;
  return  smoothstep(pct - halfSmoothWidth, pct, st.y)
          - smoothstep(pct, pct + halfSmoothWidth, st.y);
}

void main() {
  const vec3 plotColour = vec3(1., 0., 1.); // Plot colour.
  vec2 st = gl_FragCoord.xy / u_resolution.xy; // Normalize texture coords from 0.0 to 1.0.

  float y = sin(st.x * PI + u_time); // y is a sinusoid based on x position and time.
        y = 0.5 * y + 0.5;           // Scale and offset y to center plot.

  float plot = plotIt(st, y);          // Create a plot of y.

 
  float colour  = y;  // Black to white background gradient. 
        colour -= plot;   // Remove some of gradient "below" where plot will be drawn.
        colour  = max(colour, 0.0); // Negative values become zero.
      
  vec3 colours = vec3(colour)
                 + vec3(plot) * plotColour;

  gl_FragColor = vec4(colours, 1.0);  // Set pixel colour.
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.