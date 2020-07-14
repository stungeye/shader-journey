---
id: 2-hello-gradient
title: 2.0 Hello Gradient
---

## Chapter 2 - The Book of Shaders

## Example Shader

<iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/tsBBz3?gui=true&t=10&paused=true&muted=false" allowfullscreen></iframe>

## GLSL Source Code

```glsl
// Color gradient based on a 2D coordinate.
// Takes a vec2 (x, y) coordinate. Returns a vec4 (r, g, b, a) color.
vec4 gradient(vec2 coord) {
    // Normalized pixel coordinates (from 0 to 1) using the image
    // dimensions pulled from vec2 iResolution.
    vec2 uv = coord / iResolution.xy;

    // Return vec4 (r, g, b, a) with red gradated by the pixel's x coord.
    // Green, blue, and alpha are kept constant.
	return vec4(uv.x, 0.364, 0.499, 1.0);

    // Or, involve both the x and y axis:
    // return vec4(uv.x, uv.y, 0.499, 1.0);
}

// Function is automatically executed. Here it assigns a color to every pixel.
void mainImage(
  out vec4 fragColor, // Output (r, g, b, a) pixel color
  in vec2 fragCoord   // Input (x, y) image coordinate
) {
    // Set the color of each pixel to a gradient based its coordinates.
    fragColor = gradient(fragCoord);
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.
```
