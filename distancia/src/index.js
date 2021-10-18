const util = require('util');
const fs = require('fs');
const path = require('path');
const SalvarBancoDeDados = require('./database')
const ValidarEntrada = require('./validator')
const { CalcularDistancia } = require('./services')


async function run(latitude1, longitude1, latitude2, longitude2) {
  const earthRadiusKm = 6371;

  ValidarEntrada(latitude1, longitude1, latitude2, longitude2)

  //calcula distância entre os dois pontos
  const distanceBetweenTwoPoints = CalcularDistancia(latitude1, longitude1, latitude2, longitude2, earthRadiusKm);

  //salva informações no banco de dados
  const file = path.resolve(__dirname, '..',  'database.txt')
  return SalvarBancoDeDados(latitude1, longitude1, latitude2, longitude2, distanceBetweenTwoPoints, file);
}

module.exports = run