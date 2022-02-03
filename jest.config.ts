import * as tsConfigPaths from 'tsconfig-paths';
import { ConfigLoaderSuccessResult } from 'tsconfig-paths';
import { pathsToModuleNameMapper } from 'ts-jest';

// Get the parameters for paths mapping.
let pathsOptions: { prefix: string } | undefined,
  paths: {
    [key: string]: Array<string>;
  } = {};
try {
  const _config = tsConfigPaths.loadConfig();
  if (_config.resultType === 'success') {
    const config: ConfigLoaderSuccessResult = _config;
    ({ paths } = config);
    if (config.absoluteBaseUrl)
      pathsOptions = { prefix: config.absoluteBaseUrl };
  }
} catch (e: any) {
  // We get an error here if no paths are in the config file. Ignore it.
  if (e.toString() !== 'TypeError: Cannot convert undefined or null to object')
    throw e; // Unexpected error, so throw it.
}

export default {
  // To use swc: https://github.com/swc-project/jest
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest'],
  },

  globals: {
    extensionsToTreatAsEsm: ['.ts', '.js'],
    'ts-jest': {
      // without this, you git really frustrating errors.
      useESM: true,
    },
  },

  // this preset is absurdly important and (for me) was really a PITA to discover!
  preset: 'ts-jest/presets/js-with-ts-esm',

  // also important to not have anything in here
  transformIgnorePatterns: [],
  testPathIgnorePatterns: ['/node_modules/', 'dist'],

  // Paths mapping: https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/
  moduleNameMapper:
    Object.keys(paths).length && pathsToModuleNameMapper(paths, pathsOptions),
};
