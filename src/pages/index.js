import React, { useEffect } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

//import ShaderCanvas from "@signal-noise/react-shader-canvas";
let ShaderCanvas = () => <></>;

if (ExecutionEnvironment.canUseDOM) {
  ShaderCanvas = require("@signal-noise/react-shader-canvas").default;
}

const shader = `
// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

// Based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 _st) {
    vec2 i = floor(_st);
    vec2 f = fract(_st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

#define NUM_OCTAVES 5

float fbm ( in vec2 _st) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    // Rotate to reduce axial bias
    mat2 rot = mat2(cos(0.5), sin(0.5),
                    -sin(0.5), cos(0.50));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(_st);
        _st = rot * _st * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy*6.;
    vec3 color = vec3(0.0);

    vec2 q = vec2(0.);
    q.x = fbm( st + 0.00*u_time);
    q.y = fbm( st + vec2(1.0));

    vec2 r = vec2(0.);
    r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*u_time );
    r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*u_time);

    float f = fbm(st+r);

    color = mix(vec3(0.101961,0.619608,0.666667),
                vec3(0.666667,0.666667,0.498039),
                clamp((f*f)*4.0,0.0,1.0));

    color = mix(color,
                vec3(0,0,0.164706),
                clamp(length(q),0.0,1.0));

    color = mix(color,
                vec3(0.3,1,1),
                clamp(length(r.x),0.0,1.0));

    gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,1.);
} `;

const features = [
  {
    title: <>What is a Shader?</>,
    description: (
      <>
        Shaders are instructions for computing images. They are written in
        programming languages like GLSL and are executed on a GPU.
      </>
    ),
  },
  {
    title: <>What is GLSL?</>,
    description: (
      <>
        GLSL is the official OpenGL Shading Language. It has a syntax based on
        the C programming language.
      </>
    ),
  },
  {
    title: <>What is this Website?</>,
    description: (
      <>
        This is a place for me to document my learning as I work through{" "}
        <a href="http://patriciogonzalezvivo.com/" target="_blank">
          Patricio Gonzalez Vivo
        </a>{" "}
        and{" "}
        <a href="http://jenlowe.net/" target="_blank">
          Jen Lowe
        </a>
        's{" "}
        <a href="https://thebookofshaders.com/" target="_blank">
          Book of Shaders
        </a>
      </>
    ),
  },
];

function Feature({ imageUrl, title, description }) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx("col col--4", styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig = {} } = context;
  return (
    <Layout
      title="Home"
      description="Join me as I learn GLSL shader coding by working through Patricio Gonzalez Vivo and Jen Lowe's Book of Shaders."
    >
      <header className={clsx("hero hero--primary shades", styles.heroBanner)}>
        <ShaderCanvas width={220} height={270} fragShader={shader} />
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                "button button--outline button--secondary button--lg",
                styles.getStarted
              )}
              to={useBaseUrl("blog/")}
            >
              Join Me
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
        <div className={clsx(styles.announcement, styles.announcementDark)}>
          <div className={styles.announcementInner}>
            Learn more on <Link to={useBaseUrl("/blog")}>the blog</Link> or dive
            straight in to <Link to={useBaseUrl("/docs")}>the shaders</Link>.
          </div>
          <div className={styles.announcementInnerSmall}>
            The cloudy shader used in the header is by{" "}
            <a href="http://patriciogonzalezvivo.com/" target="_blank">
              Patricio Gonzalez Vivo
            </a>{" "}
            based on code by{" "}
            <a href="https://casual-effects.com/" target="_blank">
              Morgan McGuire
            </a>
            .
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
