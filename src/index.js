import getPaths from './getPaths'
import d3threeD from './d3-threeD'

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.')
}

AFRAME.registerPrimitive('a-svg', {
  defaultComponents: {
    svg: {}
  },
  mappings: {
    src: 'svg.src',
    'proportional-scale': 'svg.proportionalScale',
    'override-color': 'svg.overrideColor',
    'z-factor': 'svg.zFactor',
    extrude: 'svg.extrude'
  }
})

AFRAME.registerComponent('svg', {
  schema: {
    src: {
      type: 'string'
    },
    proportionalScale: {
      type: 'number',
      default: 1
    },
    extrude: {
      type: 'number',
      default: 0.1
    },
    zFactor: {
      type: 'number',
      default: 0.005
    },
    overrideColor: {
      type: 'string'
    }
  },
  $d3g: {},
  init () {
    this.el.setObject3D('mesh', new AFRAME.THREE.Object3D())
    d3threeD(this.$d3g)
  },
  update () {
    if (this.data.src) {
      const svgSrc = document.querySelector(this.data.src).attributes.src.value
      const pathsGroup = new AFRAME.THREE.Group()

      this.data.extrude = parseInt(this.data.extrude) === 0
        ? 0.001
        : this.data.extrude

      this.data.zFactor = parseInt(this.data.zFactor) === 0
        ? 0.001
        : this.data.zFactor

      return getPaths(svgSrc)
        .then(svg => {
          if (svg.length > 0) {
            svg
              .map(elm => {
                return {
                  ...elm,
                  material: new AFRAME.THREE.MeshLambertMaterial({
                    side: AFRAME.THREE.DoubleSide,
                    color: this.data.overrideColor
                      ? this.data.overrideColor
                      : elm.fill
                  })
                }
              })
              .map(elm => {
                return {
                  ...elm,
                  shape: this.$d3g
                    .transformSVGPath(elm.path)
                }
              })
              .map(elm => {
                return {
                  ...elm,
                  shape: new AFRAME.THREE.ExtrudeBufferGeometry(elm.shape, {
                    amount: this.data.extrude,
                    bevelEnabled: false
                  })
                }
              })
              .map(elm => {
                return new AFRAME.THREE.Mesh(elm.shape, elm.material)
              })
              .forEach((elm, indx, arr) => {
                elm.scale.x = (0.0095 * this.data.proportionalScale)
                elm.scale.y = (0.0095 * this.data.proportionalScale)
                elm.scale.z = this.data.overrideColor
                  ? this.data.extrude
                  : (this.data.extrude + (indx * this.data.zFactor))
                elm.rotation.x = Math.PI
                pathsGroup.add(elm)
              })

            this.el.setObject3D('mesh', pathsGroup)
            this.el.getObject3D('mesh').position.z = 0

            // initialize bounding box
            let boundingBox = {
              min: new AFRAME.THREE.Vector3(Number.MAX_VALUE),
              max: new AFRAME.THREE.Vector3(Number.MIN_VALUE)
            }
            let offset = new AFRAME.THREE.Vector3()

            // get bounding box of group
            for (let i = 0; i < pathsGroup.children.length; ++i) {
              let geometry = pathsGroup.children[i].geometry
              geometry.computeBoundingBox()
              let childBox = geometry.boundingBox.getCenter()

              // bbox min
              boundingBox.min.x = Math.min(childBox.x, boundingBox.min.x)
              boundingBox.min.y = Math.min(childBox.y, boundingBox.min.y)
              boundingBox.min.z = this.data.extrude

              // bbox max
              boundingBox.max.x = Math.max(childBox.x, boundingBox.max.x)
              boundingBox.max.y = Math.max(childBox.y * 2, boundingBox.max.y)
              boundingBox.max.z = this.data.extrude
            }

            // get center of bbox
            offset.addVectors(boundingBox.min, boundingBox.max)
            offset.multiplyScalar(-0.5)

            // move all meshes
            for (let i = 0; i < pathsGroup.children.length; ++i) {
              // apply matrix translation
              pathsGroup.children[i].geometry.applyMatrix(new AFRAME.THREE.Matrix4().makeTranslation(offset.x, offset.y, offset.z))
              // update bbox of each mesh
              pathsGroup.children[i].geometry.computeBoundingBox()
            }
          }
        })
    }
  }
})
