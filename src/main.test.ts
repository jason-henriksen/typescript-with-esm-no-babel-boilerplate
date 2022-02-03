import { greet, foo, pathDemoWrap } from './main';
import { pathDemo } from '#lib/pathDemo';

test('the data is peanut butter', () => {
  expect(1).toBe(1);
});

test('greeting', () => {
  expect(greet('Foo')).toBe('Hello Foo');
});

test('fooing', async () => {
  // Normally, I don't advocate for console output during a test.
  // However, this visually shows that the test is correctly loading an ESM module
  // WARNING: The ora module requires a node version that supports the node:process syntax ( v16 or higher )

  return await foo().then((val) => {
    expect(val).toBe(true);
  });
});

test('pathDemo', async () => {
  expect(pathDemo()).toBe('pong');
});

test('pathDemoWrap', async () => {
  expect(pathDemoWrap()).toBe('pong');
});
