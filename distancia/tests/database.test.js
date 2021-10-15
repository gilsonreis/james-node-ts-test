const path = require('path');

const SalvarBancoDeDados = require("../src/database")
const { CalcularDistancia } = require("../src/services")

it ("SalvarBancoDeDados should return 252", async () => {
  const earthRadiusKm = 6371;
  const distanceBetweenTwoPoints = CalcularDistancia(-25.4284, -49.2733, -27.5969, -48.5495, earthRadiusKm);
  const file = path.resolve(__dirname, '..',  'database.txt')
  await expect(SalvarBancoDeDados(-25.4284, -49.2733, -27.5969, -48.5495, distanceBetweenTwoPoints, file)).resolves.toBe(252)
})