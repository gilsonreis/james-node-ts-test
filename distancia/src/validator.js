function ValidarEntrada(latitude1, longitude1, latitude2, longitude2) {
  if (latitude1 < -90 || latitude1 > 90 || longitude1 < -90 || longitude1 > 90)
    throw new RangeError('the arguments latitude1 and longitude1 must be between -90 and 90.');

  if (longitude1 < -180 || longitude1 > 180 || longitude2 < -180 || longitude2 > 180)
    throw new RangeError('the arguments longitude1 and longitude2 must be between -180 and 180.');
}

module.exports = ValidarEntrada