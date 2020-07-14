---
id: 3-uniforms
title: 3.0 Uniforms
---

## Chapter 3 - The Book of Shaders

The input "uniforms":

- iResolution
- iMouse
- iTime

Called uniforms as their values are equal across pixel threads.

## Example Shader Using Uniforms

<iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/3tscz7?gui=true&t=10&paused=true&muted=false" allowfullscreen></iframe>

This is an animated shader, so hover and press play.

Trig functions are used to ease R & G by position and time. Mouse-click X changes rate of B easing.

## The GLSL Code

```glsl
// Sinusoidal function shifted and scaled to range betwen 0 and 1.
// See: https://www.desmos.com/calculator/w9jrdpvsmk
float sinEase(float x) {
	return 0.5 * sin(x) + 0.5;
}

// Function is automatically executed. Here it assigns a color to every pixel.
void mainImage(
    			out vec4 fragColor, // Output (r, g, b, a) pixel color
				in vec2 fragCoord   // Input (x, y) image coordinate
			  ) {
    // Set scale according to how far mouse is from left side.
    // 0.0 (full left) to 1.0 (full right)
    // Mouse coordinate is set when left-mouse-button is clicked.
    float blueRateScale = iMouse.x / iResolution.x;

    // Ease back and forth 1 and 100 using time-based sine.
    float stretchFactor = 99.0 * sinEase(iTime) + 1.0;

    // Setting red and green pixel value.
    // Ease back and forth between 0 and 1 based on pixel position
    // and time-based stretch factor.
    float red   = sinEase(fragCoord.x / stretchFactor);
    float green = sinEase(fragCoord.y / stretchFactor);

    // Blue will ease in and out based on time and the x position of the mouse.
    // Ease speed increases from left to right.
    float blue = abs(tan(iTime * blueRateScale));

    // Set the pixel value based on the RGB calculated above.
    fragColor = vec4(red,green,blue,1);
}

// Stung Eye 2020 - Unlicense - https://unlicense.org
// This is free and unencumbered software released into the public domain.
```
