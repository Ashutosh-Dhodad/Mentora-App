const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Add support for TypeScript files
config.resolver.assetExts.push(
  // Adds support for additional file types
  'db', 'mp3', 'ttf', 'obj', 'png', 'jpg'
);

module.exports = config;
