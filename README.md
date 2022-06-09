<img src="https://github.com/snappyimg/snappyimg-php/raw/master/logo.png" width="400">

This is a JavaScript implementation of Snappyimg URL builder. For more information about the service, go to [https://www.snappyimg.com/](https://www.snappyimg.com/).

## Installation

This library is available as [npm package](https://www.npmjs.com/package/snappyimg):

```console
npm install snappyimg
```

## Usage

```javascript
import { Snappyimg, Stage } from 'snappyimg'

const snappyimg = new Snappyimg('appToken', 'appSecret', Stage.Demo)
console.log(snappyimg.buildUrl('https://placekitten.com/2000/1500'))
```

### Additional options

```javascript
import { Snappyimg, Stage, Resize, Gravity, Format } from 'snappyimg'

const snappyimg = new Snappyimg(
	'appToken',
	'appSecret',
	Stage.Demo // Demo | Serve
)
const options = {
	resize: Resize.Fill, // Fill | Fit | Crop
	width: 1920, // number
	height: 1080, // number
	gravity: Gravity.Smart, // Smart | Center | North | South | East | West
	enlarge: true, // boolean
	format: Format.Jpg, // Jpg | Png | Webp
}
console.log(snappyimg.buildUrl('https://placekitten.com/2000/1500', options))
```

### Warning

Don't use this library on frontend if you care to keep your `appSecret` private.
