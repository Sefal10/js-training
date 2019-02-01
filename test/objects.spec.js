var expect = require('expect.js');
var name = require('../src/objects.js');

var myObj = {a: 1, b: 2, c: 3};

describe('objects', function () {
    it('enumera las propiedades de un objeto', function () {
      expect(name.keys(myObj)).to.eql(['a', 'b', 'c']);
    });
});