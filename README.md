# aframe-svg-extruder
A-Frame component to extrude your SVG's files and use in WebVR scenes like magic 🌟

<p align="center"><img src="https://raw.githubusercontent.com/luiguild/aframe-svg-extruder/master/readme-image.png"></p>

###### Demo
https://luiguild.github.io/aframe-svg-extruder/

## Usage
#### Development
``` bash
git clone https://github.com/luiguild/aframe-svg-extruder.git
npm install
npm start
```

#### Install
###### Using NPM
``` bash
npm i aframe-svg-extruder
```
###### Using yarn
``` bash
yarn add aframe-svg-extruder
```
###### Use via CDN
``` html
<script src="https://unpkg.com/aframe-svg-extruder@1.0.0/dist/index.min.js"></script>
```

###### Add on your a-scene
``` html
<a-scene>
  <a-asset-item id="mozilla" src="https://raw.githubusercontent.com/luiguild/aframe-svg-extruder/master/example/svg/mozilla-letters.svg"></a-asset-item>

  <!-- If you prefer use entities -->
  <a-entity
    svg="src: #mozilla; proportionalScale: 2; extrude: 1; zFactor: 0.001;"
    position="0 2 -5">
  </a-entity>

  <!-- If you prefer use a web component -->
  <a-svg
    src="#mozilla"
    proportional-scale="2"
    extrude="0.5"
    z-factor="0"
    position="0 1.3 -5"
  >
  </a-svg>
</a-scene>
```

## API
This is the list of the available parameters.

| Parameter | Type | Default | Required | Description |
| :--- | :--- | :--- | :--- | :--- |
| **src** | String | null | true | Pass the `path` of your SVG file |
| **proportionalScale** | Number | 1 | false | Proportionally how many times you want that your file grow |
| **extrude** | Number | 0.1 | false | The depth of the extrusion |
| **zFactor** | Number | 0.005 | false | This will help you control the z-fighting on complex SVG layouts |
| **overrideColor** | String | null | false | Set an `hex (eg: #000000)` color if you want override the original colors of file |

<p style="font-size: 12px">
* kekab-case params for webcomponent |  camelCase for entity
</p>


## Help and contact
PRs are appreciated, issues are welcomed. For any question, ping @luiguild at aframevr in Slack, Twitter or Telegram.
