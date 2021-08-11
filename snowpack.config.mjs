/** @type {import("snowpack").SnowpackUserConfig } */
const config = {
  plugins: ['@snowpack/plugin-react-refresh'],
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
  },
  buildOptions: {
    sourceMap: true,
    jsxInject: "import React from 'react';",
  },
};

export default config;
