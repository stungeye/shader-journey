---
id: shader-journey
title: Shader Journey
author: Kyle Geske
author_title: Shader Apprentice
author_url: https://stungeye.com
author_image_url: https://avatars3.githubusercontent.com/u/124968?v=4
tags: [comms]
---

Join me on a _shader journey_ through [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/)'s [Book of Shaders](https://thebookofshaders.com/).

### What Are Shaders?

Shaders are written instructions for constructing images on a computer.

Shaders are written such that each pixel can be calculated indepently, meaning that video-card GPUs can parallelize the generation of each pixel. This makes shaders incredibly fast, even for complex generated scenes.

GLSL, [the OpenGL Shader Language](https://www.khronos.org/opengl/wiki/Core_Language_%28GLSL%29), is based on the C programming language.

### Spooky Shader Beauty

Here's a shader by [Shader Toy](https://www.shadertoy.com) user [nimitz](https://www.shadertoy.com/user/nimitz) that recently blew my mind. This scene is built in 250 lines of GLSL, plus another 120 lines for the sound. Hit play on this shader. It's an animated scene.

<iframe width="640" height="360" frameBorder="0" src="https://www.shadertoy.com/embed/4ts3z2?gui=true&t=10&paused=true&muted=false" allowFullScreen></iframe>

Lots to learn before I could attempt to understand this code behind this shader: ray marching, volumeric noise, bump mapping, trig-foo. Heck, just the basics of thinking in parallel in GLSL. :)

### Shader Challenge

I'm going to document my learning as I work through each chapter in [The Book of Shaders](https://thebookofshaders.com/).

The challenge:

- Write at least one well-commented GLSL shader per chapter.
- Document my learning side-quests in math and colour theory.
- Play around with recreating my GLSL shaders as [Unreal Engine node-based Materials](https://docs.unrealengine.com/en-US/Engine/Rendering/Materials/HowTo/Main_Material_Node/index.html).

### Complete Thus Far

So far I've worked my way through chapters 1 through 5:

- [Chapter 2 - Intro to Shaders / Hello Gradient](/docs/)
- [Chapter 3 - Uniforms](/docs/3-uniforms)
- [Chapter 5 - Shaping Functions](/docs/5-shaping-functions)
