const { CalcularDistancia, ArcoCosseno, GrausParaRadianos } = require("../src/services")

it ("GrausParaRadiano should return NaN", () => {
  expect(GrausParaRadianos("TEXTO")).toBeNaN()
});

it ("ArcoCosseno shouldn't return NaN", () => {
  expect(ArcoCosseno(-25.4284, -49.2733, -27.5969, -48.5495)).not.toBeNaN()
});

it ("CalcularDistancia should return Positive number", () => {
  const earthRadiusKm = 6371;
  expect(CalcularDistancia(-25.4284, -49.2733, -27.5969, -48.5495, earthRadiusKm)).toBeGreaterThanOrEqual(0)
})

  // expect(ArcoCosseno(-25.4284, -49.2733, -27.5969, -48.5495)).toBeGreaterThanOrEqual(-1);
  // expect(ArcoCosseno(-25.4284, -49.2733, -27.5969, -48.5495)).toBeLessThanOrEqual(1);