#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// Sinusoidal function shifted and scaled to range betwen 0 and 1.
// See: https://www.desmos.com/calculator/w9jrdpvsmk
float sinEase(float x) {
	return 0.5 * sin(x) + 0.5;
}

void main() {
  // Set scale according to how far mouse is from left side.
  // 0.0 (full left) to 1.0 (full right)
  // Mouse coordinate is set when left-mouse-button is clicked.
  float blueRateScale = u_mouse.x / u_resolution.x;

  // Ease back and forth 1 and 100 using time-based sine.
  float stretchFactor = 99.0 * sinEase(u_time) + 1.0;

  // Setting red and green pixel value.
  // Ease back and forth between 0 and 1 based on pixel position
  // and time-based stretch factor.
  float red   = sinEase( gl_FragCoord.x / stretchFactor);
  float green = sinEase( gl_FragCoord.y / stretchFactor);

  // Blue will ease in and out based on time and the x position of the mouse.
  // Ease speed increases from left to right.
  float blue = abs(tan(u_time * blueRateScale));

  // Set the pixel value based on the RGB calculated above.
  gl_FragColor = vec4(red,green,blue,1);
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.