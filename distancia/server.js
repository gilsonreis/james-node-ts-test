const run = require("./src/index")

run(-25.4284, -49.2733, -27.5969, -48.5495).then(value =>
  console.log(value),
)
.catch(err => {
  console.log(err.message)
})

// -25.4284, -49.2733, -27.5969, -48.5495