const ValidarEntrada = require('../src/validator')

it ("should throw RangeError to l1 and l2 arguments passed -100 and 100", () => {
  try{
    ValidarEntrada(-100, 0, 100, 0)
  } catch(error) {
    expect(error).toEqual(new RangeError('the arguments l1 and l2 must be between -90 and 90.'))
  }
});

it ("should throw RangeError to b1 and b2 arguments passed -200 and 200", () => {
  try{
    ValidarEntrada(0, -200, 0, 200)
  } catch(error) {
    expect(error).toEqual(new RangeError('the arguments b1 and b2 must be between -180 and 180.'))
  }
});