var expect = require('expect.js');
var name = require('../src/arrays.js');

var myArray = [];

describe('arrays', function () {
  it('extrae el valor de una posición de un array', function () {
    expect(name.out([0,1], 1)).to.be(1);
  });

  it('inserta un valor en una posición de un array', function() {
      expect(name.set(myArray, 1, 12)).to.eql(myArray[1]);
  });

  it('100% error', function(){
      expect(name.error).to.throwException();
  });

//   it('should throw an exception with no numbers', function(){
//     expect(objectStructure.at).withArgs([1,2,3], 'a').to.throwException();
//     });
});