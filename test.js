'use strict';

const main = require('.');
const test = require('tape');

test('assertValidGlobOpts()', t => {
  t.doesNotThrow(
    () => main(),
    'should throw no errors when it takes no arguments.'
  );

  t.throws(
    () => main({}, [], null),
    /^TypeError.*Expected 0, 1 or 2 arguments \(\[<object>, <array>]\), but got 3\./,
    'should throw no errors when it takes too many arguments.'
  );

  t.doesNotThrow(
    () => main({nodir: true}),
    'should throw no errors when it takes a valid glob option.'
  );

  t.throws(
    () => main({cwd: 1}),
    /^TypeError.*node-glob expected `cwd` option to be a directory path \(string\), but got 1 \(number\)\./,
    'should throw an error when it takes an invalid glob option.'
  );

  t.throws(
    () => main({cache: {'1': 2}, realPath: true}),
    /^Error: 2 errors found in the glob options:\n.* {2}1\. .*\n {2}2\. .*/,
    'should throw an error with multiple lines when the object inludes multiple invalid values.'
  );

  t.throws(
    () => main({follow: new Map([[true, false]]), noext: Infinity}),
    /^TypeError/,
    'should throw a type error when every error in the result is type error.'
  );

  t.throws(
    () => main({x: '!!!err!!!'}, [({x}) => new Error(x)]),
    /^Error.*!!!err!!!/,
    'should support custom validation parameter.'
  );

  t.throws(
    () => main({}, new WeakMap()),
    /^TypeError.*Expected an array of functions, but got a non-array value WeakMap {}\./,
    'should invalidate the non-array second aergument.'
  );

  t.end();
});
