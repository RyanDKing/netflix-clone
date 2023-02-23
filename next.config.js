const { webpack } = require("next/dist/compiled/webpack/webpack");

// config.webpack
const criticalCss = execSync(
  ["npx", "tailwind", ["--input", "src/pages/global.scss"], "--minify"]
    .flat()
    .join(" "),
  { cwd: PROJECT_ROOT }
);

config.plugins.push(
  new webpack.DefinePlugin({
    CRITICAL_CSS: JSON.stringify(criticalCss),
  })
);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },
};

module.exports = nextConfig;
