---
id: 5-shaping-functions
title: 5.0 Shaping Functions
---

## Chapter 5 - The Book of Shaders

GLSL includes a number of shaping functions like smoothstep. We can also build our own custom ones using built in math functions like sin.

## Example Shader

<iframe width="640" height="360" frameborder="0" src="https://www.shadertoy.com/embed/3tjcDm?gui=true&t=10&paused=true&muted=false" allowfullscreen></iframe>

Sinusoidal background gradient with function plotted over top.

This is an animated shader. Hover and press play.

## GLSL Source Code

```glsl
#define PI 3.14159265358979

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st, float pct){ // (st = texture coordinates) (pct = percentage from 0.0 to 1.0)

  const float width_factor = 0.007;

  return  smoothstep(pct - width_factor, pct, st.y)
          - smoothstep(pct, pct + width_factor, st.y);
}

void mainImage(out vec4 fragColor,  // Output (r, g, b, a) pixel color
               in vec2 fragCoord) { // Input (x, y) image coordinate

	const vec3 plot_colour = vec3(1.,0.,1.); // Colour of our plot.

    vec2 st = fragCoord / iResolution.xy;    // Normalize texture coordinates from 0.0 to 1.0 in x and y.

    float y = sin(st.x * PI + iTime);        // y is a sinusoid based on x position and time.
          y = 0.5 * y + 0.5;                 // Scale and offset y to center plot.

    float plot = plot(st, y);                // Create a plot of y.

    vec3 colour = vec3(y, y, y);             // Black to white background gradient. Also: vec3(y)
         colour *= colour - plot;            // Remove gradient "below" where plot will be draw.
         colour += plot * plot_colour;       // Paint the xy-plot.

	fragColor = vec4(colour, 1.0);           // Set pixel colour.
}
```
