const Jimp = require('Jimp');

module.exports = {
    // Simple pixel average function
    avg: pixels => {
        let buff = []
        // each component (r, g, b, a)
        for (let c in pixels[0]) {
            let max = 0
            let count = 0
            for (let i in pixels)
                // only act on pixels that are visible
                if(pixels[i][3] != 0) {
                    max += pixels[i][c]
                    count++
                }
            // Finish simple average for component
            buff.push(Math.round(max / count))
        }
        // Return int version back to program
        return Jimp.rgbaToInt(buff[0], buff[1], buff[2], 255)
    }
}