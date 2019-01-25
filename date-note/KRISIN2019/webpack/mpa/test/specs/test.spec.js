import utils from 'core/utils'
import 'babel-polyfill'
import es6Promise from 'es6-promise'
es6Promise.polyfill()

'use strict';

describe('testing', () => {
  it('testing', () => {
    expect(1 + 1).to.equal(2)
  })
})