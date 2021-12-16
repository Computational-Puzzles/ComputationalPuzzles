const withTM = require('next-transpile-modules')(['@maptiler/geocoder']);

module.exports = withTM({
  reactStrictMode: true
});
