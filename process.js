const // Imports, constants, and lambda functions
    Jimp = require('Jimp'),
    { avg } = require('./utilFn'),
      
    pColor = (a, b, c) => new Promise((resolve, reject) => a.getPixelColor(b, c, resolve)),
    pixelMap = [
        [0, 0],
        [2, 0],
        [0, 2],
        [2, 2]
    ]

function eachPixel(image, original, x, y, centerX, centerY) {
    // fill in the pixels that we KNOW
    image.setPixelColor(original.getPixelColor(x, y), (x * 2), y * 2)

    // gather the pixels around the unknown one
    let pixels = pixelMap.slice()
        .map(i => image.getPixelColor((x * 2) + i[0], (y * 2) + i[1]))
        .map(pixel => Object.values(Jimp.intToRGBA(pixel)))

    // fill in the average
    image.setPixelColor(avg(pixels), (x * 2) + 1, (y * 2) + 1)
}

module.exports = async(err, image, original) => {
    const { width, height } = image.bitmap
    // catch errors
    if (err) return console.error(err)

    const centerX = width / 2,
        centerY = height / 2

    // iterate through each pixels
    for (let x = 0; x < centerX; x++)
        for (let y = 0; y < centerY; y++)
            eachPixel(image, original, x, y, centerX, centerY)

    // write image to file
    image.write('test.png', err => !err || console.log(err))
}