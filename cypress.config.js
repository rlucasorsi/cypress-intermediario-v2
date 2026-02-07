const { defineConfig } = require('cypress');

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true,
      requestMode: true,
      snapshotOnly: true,
    },
    experimentalStudio: true,
  },
  fixturesFolder: false,
  video: false,
});
