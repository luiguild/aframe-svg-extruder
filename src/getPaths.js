import loadSvg from 'load-svg'
import parseSVG from './svg-parser'

const getPaths = file =>
  new Promise((resolve, reject) =>
    loadSvg(file, (err, svg) => {
      if (err) throw reject(err)
      return resolve(parseSVG(svg))
    })
  )

export default getPaths
