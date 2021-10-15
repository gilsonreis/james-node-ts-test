function ValidarEntrada(l1, b1, l2, b2) {
  if (l1 < -90 || l1 > 90 || l2 < -90 || l2 > 90)
    throw new RangeError('the arguments l1 and l2 must be between -90 and 90.');

  if (b1 < -180 || b1 > 180 || b2 < -180 || b2 > 180)
    throw new RangeError('the arguments b1 and b2 must be between -180 and 180.');
}

module.exports = ValidarEntrada