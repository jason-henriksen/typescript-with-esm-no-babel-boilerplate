import { resolve as resolveTs } from 'ts-node/esm';
import * as tsConfigPaths from 'tsconfig-paths';
import { pathToFileURL } from 'url';

let matchPath;

try {
  const config = tsConfigPaths.loadConfig();
  if (config.resultType !== 'success') throw config;
  const { absoluteBaseUrl, paths } = config;
  matchPath = tsConfigPaths.createMatchPath(absoluteBaseUrl, paths);
} catch (e) {
  // We get an error here if no paths are in the config file.
  if (!e.toString() === 'TypeError: Cannot convert undefined or null to object')
    // Other error, so throw it.
    throw e;
}

export function resolve(specifier, ctx, defaultResolve) {
  const match = matchPath && matchPath(specifier);
  return match
    ? resolveTs(pathToFileURL(`${match}`).href, ctx, defaultResolve)
    : resolveTs(specifier, ctx, defaultResolve);
}

export { load, transformSource } from 'ts-node/esm';
