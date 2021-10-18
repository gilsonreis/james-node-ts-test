function GrausParaRadianos(value) {

  if (isNaN(value)) {
    return NaN;
  }

  return (value * Math.PI) / 180
}

function ArcoCosseno(latitude1, longitude1, latitude2, longitude2) {
    //converte coordenadas de graus para radianos
  const l1Radianus = GrausParaRadianos(latitude1);
  const b1Radianus = GrausParaRadianos(longitude1);
  const l2Radianus = GrausParaRadianos(latitude2);
  const b2Radianus = GrausParaRadianos(longitude2);

  return Math.acos(
    Math.sin(l1Radianus) * Math.sin(l2Radianus) +
      Math.cos(l1Radianus) *
        Math.cos(l2Radianus) *
        Math.cos(b2Radianus - b1Radianus),
  )
}

function CalcularDistancia(latitude1, longitude1, latitude2, longitude2, earthRadiusKm) {
  const lambda = ArcoCosseno(latitude1, longitude1, latitude2, longitude2);
  return Math.ceil(Math.sin(lambda) * earthRadiusKm);
}

module.exports = { CalcularDistancia, ArcoCosseno, GrausParaRadianos }