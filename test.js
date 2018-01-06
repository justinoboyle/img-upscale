const Jimp = require('Jimp');
const proc2 = require('./process')
let gradient;

async function process(err, image) {
  return proc2(err, image, gradient)
}

async function _() {
  gradient = await Jimp.read("gradient.png")
  let ops = [
    (x, y) => (Math.sin(x) * 1000)
  ]
  let temp = []

  let image = new Jimp(gradient.bitmap.width, gradient.bitmap.height, (err, image) => process(err, image).catch(console.error))
}

const pColor = (a, b, c) => new Promise((resolve, reject) => a.getPixelColor(b, c, resolve))


_().catch(console.error)