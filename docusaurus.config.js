module.exports = {
  title: "My Shader Journey",
  tagline: "Through The Book of Shaders",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  organizationName: "facebook", // Usually your GitHub org/user name.
  projectName: "docusaurus", // Usually your repo name.
  themeConfig: {
    navbar: {
      title: "💎 Shader Journey",
      links: [
        {
          to: "docs/",
          activeBasePath: "docs",
          label: "Shaders",
          position: "left",
        },
        { to: "blog", label: "Blog", position: "left" },
        {
          href: "https://github.com/stungeye/shader-journey",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Shader Journey",
          items: [
            {
              label: "Shaders (Start Here)",
              to: "docs/",
            },
            {
              label: "Blog",
              to: "blog/",
            },
          ],
        },
        {
          title: "Me Elsewhere",
          items: [
            {
              label: "Shader Toy @stungeye",
              href: "https://www.shadertoy.com/user/stungeye",
            },
            {
              label: "Twitter @stungeye",
              href: "https://twitter.com/stungeye",
            },
            {
              label: "GitHub @stungeye",
              href: "https://github.com/stungeye",
            },
          ],
        },
        {
          title: "External Resources",
          items: [
            {
              label: "The Book of Shaders",
              href: "https://thebookofshaders.com",
            },
            {
              label: "Official OpenGL Shading Language Wiki",
              href:
                "https://www.khronos.org/opengl/wiki/OpenGL_Shading_Language",
            },
          ],
        },
      ],
      copyright: `<a href="https://unlicense.org">Unlicensed</a> by <a href="https://stungeye.com">Kyle Geske</a> ${new Date().getFullYear()}. Website built with Docusaurus.`,
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: "2-hello-gradient",
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          editUrl: "https://github.com/stungeye/shader-journey/edit/master/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: "https://github.com/stungeye/shader-journey/edit/master/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
};
