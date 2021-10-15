const util = require('util');
const fs = require('fs');
const path = require('path');
const SalvarBancoDeDados = require('./database')
const ValidarEntrada = require('./validator')
const { CalcularDistancia } = require('./services')


async function run(l1, b1, l2, b2) {
  const earthRadiusKm = 6371;

  ValidarEntrada(l1, b1, l2, b2)

  //calcula distância entre os dois pontos
  const distanceBetweenTwoPoints = CalcularDistancia(l1, b1, l2, b2, earthRadiusKm);

  //salva informações no banco de dados
  const file = path.resolve(__dirname, '..',  'database.txt')
  return SalvarBancoDeDados(l1, l2, b1, b2, distanceBetweenTwoPoints, file);
}

module.exports = run