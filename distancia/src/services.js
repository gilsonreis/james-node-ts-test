function GrausParaRadianos(value) {

  if (isNaN(value)) {
    return NaN;
  }

  return (value * Math.PI) / 180
}

function ArcoCosseno(l1, b1, l2, b2) {
    //converte coordenadas de graus para radianos
  const l1Radianus = GrausParaRadianos(l1);
  const b1Radianus = GrausParaRadianos(b1);
  const l2Radianus = GrausParaRadianos(l2);
  const b2Radianus = GrausParaRadianos(b2);

  return Math.acos(
    Math.sin(l1Radianus) * Math.sin(l2Radianus) +
      Math.cos(l1Radianus) *
        Math.cos(l2Radianus) *
        Math.cos(b2Radianus - b1Radianus),
  )
}

function CalcularDistancia(l1, b1, l2, b2, earthRadiusKm) {
  const lambda = ArcoCosseno(l1, b1, l2, b2);
  return Math.ceil(Math.sin(lambda) * earthRadiusKm);
}

module.exports = { CalcularDistancia, ArcoCosseno, GrausParaRadianos }