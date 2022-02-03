import * as ora from 'ora';
import { pathDemo } from '#lib/pathDemo';

export const delayMillis = (delayMs: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, delayMs));

export const greet = (name: string): string => `Hello ${name}`;

export const foo = async (): Promise<boolean> => {
  console.log(greet('World'));
  await ora.oraPromise(delayMillis(1000));
  return true;
};

export const pathDemoWrap = (): string => {
  return pathDemo();
};
