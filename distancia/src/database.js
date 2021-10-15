const util = require('util');
const fs = require('fs');
const path = require('path');

function SalvarBancoDeDados(l1, b1, l2, b2, distanceBetweenTwoPoints, file) {

  const appendFilePromisified = util.promisify(fs.appendFile);

  return appendFilePromisified(
    file,
    `Local 1: ${l1}, ${b1};  Local 2: ${l2}, ${b2}; A distância entre o Local 1 e o Local 2 é de aproximadamente ${distanceBetweenTwoPoints}KM aproximadamente.\n`,
  ).then(() => {
    return distanceBetweenTwoPoints;
  });
}

module.exports = SalvarBancoDeDados;