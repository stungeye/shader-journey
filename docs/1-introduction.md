---
id: 1-introduction
title: 1 - Introduction
---

Join me on a _shader journey_ through [Patricio Gonzalez Vivo](http://patriciogonzalezvivo.com/) and [Jen Lowe](http://jenlowe.net/)'s [Book of Shaders](https://thebookofshaders.com/).

## Chapter 1 - The Book of Shaders

[Chapter 1 of the Book of Shaders](https://thebookofshaders.com/01/) explains what shaders are. I've distilled some of this information into [a blog post](/blog/shader-journey) but I'll repeat some of it here.

## What Are Shaders?

Shaders are instructions for constructing images on a computer.

Shaders are written such that each pixel can be calculated indepently, meaning that video-card GPUs can parallelize the generation of each pixel. This makes shaders incredibly fast, even for complex generated scenes.

GLSL, the OpenGL Shader Language, is based on the C programming language.

**A few OpenGL / WebGL / GLSL Resources:**

- [The Official GLSL Wiki](https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language)
- [The OpenGL Book](https://openglbook.com/the-book.html)
- [Maxime Euziere WebGL Guide](https://xem.github.io/articles/webgl-guide.html)

## Shader Challenge

I'm going to document my learning on this website as I work through each chapter in [The Book of Shaders](https://thebookofshaders.com/).

**The challenge:**

- Write at least one well-commented GLSL shader per chapter.
- Document my learning side-quests in math and colour theory.
- Play around with recreating my GLSL shaders as [Unreal Engine node-based Materials](https://docs.unrealengine.com/en-US/Engine/Rendering/Materials/HowTo/Main_Material_Node/index.html).

## Chapters Complete So Far

So far I've worked my way through chapters 1 through 5:

- Chapter 1 - Introduction (This Page)
- [Chapter 2 - Hello World](/docs/2-hello-world)
- [Chapter 3 - Uniforms](/docs/3-uniforms)
