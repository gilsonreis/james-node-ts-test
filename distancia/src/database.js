const util = require('util');
const fs = require('fs');
const path = require('path');

function SalvarBancoDeDados(latitude1, longitude1, latitude2, longitude2, distanceBetweenTwoPoints, file) {

  const appendFilePromisified = util.promisify(fs.appendFile);

  return appendFilePromisified(
    file,
    `Local 1: ${latitude1}, ${longitude1};  Local 2: ${latitude2}, ${longitude2}; A distância entre o Local 1 e o Local 2 é de aproximadamente ${distanceBetweenTwoPoints}KM aproximadamente.\n`,
  ).then(() => {
    return distanceBetweenTwoPoints;
  });
}

module.exports = SalvarBancoDeDados;