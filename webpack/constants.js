const result = {
  modes: {
    dev: 'dev',
    prod: 'prod',
  },
};

result.builds = {
  [result.modes.dev]: 'development',
  [result.modes.prod]: 'production',
};

result.buildType = process.env.BUILD_TYPE ?? result.modes.dev;
result.mode = result.builds[result.buildType];
result.devMode = result.mode === result.builds[result.modes.dev];
result.prodMode = result.mode === result.builds[result.modes.prod];

module.exports = result;
