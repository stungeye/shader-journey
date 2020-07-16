#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265358979

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){ // (st = texture coordinates) (pct = % from 0.0 to 1.0)
  const float width_factor = 0.007;
  return  smoothstep(pct - width_factor, pct, st.y)
          - smoothstep(pct, pct + width_factor, st.y);
}

void main() {
  const vec3 plot_colour = vec3(1.,0.,1.); // Plot colour.
  vec2 st = gl_FragCoord.xy / u_resolution.xy; // Normalize texture coords from 0.0 to 1.0.

  float y = sin(st.x * PI + u_time); // y is a sinusoid based on x position and time.
        y = 0.5 * y + 0.5;           // Scale and offset y to center plot.

  float plot = plot(st, y);          // Create a plot of y.

  vec3 colour = vec3(y, y, y);       // Black to white background gradient. Also: vec3(y)
       colour *= colour - plot;      // Remove gradient "below" where plot will be draw.
       colour += plot * plot_colour; // Paint the xy-plot.

  gl_FragColor = vec4(colour, 1.0);  // Set pixel colour.
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.