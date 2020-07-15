import React from "react";
import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";

export const ResponsiveShader = function ({ maxWidth, ...props }) {
  function responsiveWidth(windowWidth, maxWidth = 530) {
    let width = windowWidth * 0.8;

    if (width > maxWidth) {
      width = maxWidth;
    }

    return width;
  }

  if (ExecutionEnvironment.canUseDOM) {
    let ShaderCanvas = require("@signal-noise/react-shader-canvas").default;

    const [width, setWidth] = React.useState(
      responsiveWidth(window.innerWidth, maxWidth)
    );

    React.useEffect(() => {
      const handleResize = () => {
        setWidth(responsiveWidth(window.innerWidth, maxWidth));
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return <ShaderCanvas width={width} {...props} />;
  } else {
    return <></>;
  }
};

export default ResponsiveShader;
