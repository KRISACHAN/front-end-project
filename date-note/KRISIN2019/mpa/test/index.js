import 'babel-polyfill';
import es6Promise from 'es6-promise';
es6Promise.polyfill();


// require all test files (files that ends with .spec.js)
const testsContext = require.context('./specs', true, /\.spec$/);
testsContext.keys().forEach(testsContext);

// require all src files except main.js for coverage.
// you can also change this to match only the subset of files that
// you want coverage for.
const srcContext = require.context('core', true, /^\.\/(?!index(\.js)?$)/);
srcContext.keys().forEach(srcContext);
