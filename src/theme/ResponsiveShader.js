import React, { useEffect, useState, useRef } from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

const warningShader = "void main() { gl_FragColor = vec4(255,0,0,1); }";
const emptyShader = "void main() { gl_FragColor = vec4(0, 0, 0, 0); }";

function responsiveWidth(windowWidth, maxWidth = 530) {
  let width = windowWidth * 0.8;

  if (width > maxWidth) {
    width = maxWidth;
  }

  return parseInt(width);
}

export const ResponsiveShader = function ({
  maxWidth,
  height,
  fragShader,
  fragShaderPath,
  ...props
}) {
  // Only execute in the browser, not when server-side rendering.
  if (ExecutionEnvironment.canUseDOM) {
    let ShaderCanvas = require("@signal-noise/react-shader-canvas").default;

    const isMountedComponent = useRef(true); // Only true when component is mounted.

    const [width, setWidth] = useState(
      responsiveWidth(window.innerWidth, maxWidth)
    );

    const [fragShaderData, setFragShaderData] = useState(emptyShader);

    async function fetchShader(url) {
      const response = await fetch(url);
      const text = await response.text();
      if (isMountedComponent.current) {
        // Don't attempt to set state if the component is unmounted.
        setFragShaderData(text);
      }
    }

    // Load the fragment shader data either from prop or via a provided path.
    useEffect(() => {
      if (fragShader) {
        setFragShaderData(fragShader);
      } else if (fragShaderPath) {
        fetchShader(fragShaderPath);
      } else {
        setFragShaderData(warningShader);
      }
    }, []);

    // Resize the component if the window size changes.
    useEffect(() => {
      const handleResize = () => {
        setWidth(responsiveWidth(window.innerWidth, maxWidth));
      };

      window.addEventListener("resize", handleResize);

      return () => {
        isMountedComponent.current = false;
        window.removeEventListener("resize", handleResize);
      };
    });

    return (
      <ShaderCanvas
        width={width}
        height={parseInt(height)}
        fragShader={fragShaderData}
        {...props}
      />
    );
  } else {
    return <></>;
  }
};

export default ResponsiveShader;
