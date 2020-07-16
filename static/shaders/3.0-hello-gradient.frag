#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;

// Color gradient based on a 2D coordinate.
// Takes a vec2 (x, y) coordinate. Returns a vec4 (r, g, b, a) color.
vec4 gradient(vec4 coord) {
  // Normalized pixel coordinates (from 0 to 1) using the image
  // dimensions pulled from vec2 iResolution.
  vec2 uv = coord.xy / u_resolution.xy;

  // Return vec4 (r, g, b, a) with red gradated by the pixel's x coord.
  // Green, blue, and alpha are kept constant.
  return vec4(uv.x, 0.364, 0.499, 1.0);

  // Or, involve both the x and y axis:
  // return vec4(uv.x, uv.y, 0.499, 1.0);
}

// Function is automatically executed. Here it assigns a color to every pixel.
void main() {
  // Set the color of each pixel to a gradient based its coordinates.
  gl_FragColor = gradient(gl_FragCoord);
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.
