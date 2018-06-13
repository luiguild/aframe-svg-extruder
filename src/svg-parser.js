const parseXml = str => {
  if (typeof self.DOMParser !== 'undefined') {
    return str => {
      const parser = new self.DOMParser()
      return parser.parseFromString(str, 'application/xml')
    }
  }
}

const parseSVG = svgDoc => {
  // concat all the <path> elements to form an SVG path string
  if (typeof svgDoc === 'string') {
    svgDoc = parseXml(svgDoc)
  }
  if (!svgDoc || typeof svgDoc.getElementsByTagName !== 'function') {
    throw new Error('could not get an XML document from the specified SVG contents')
  }

  const paths = [].slice.call(svgDoc.getElementsByTagName('path'))
  return paths.reduce((acc, elm) => {
    const d = elm.getAttribute('d') || ''
    const fill = elm.getAttribute('fill') || ''

    return [
      ...acc,
      {
        path: d.replace(/\s+/g, ' ').trim(),
        fill
      }
    ]
  }, [])
}

export default parseSVG
