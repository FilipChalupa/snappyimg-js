<img src="https://github.com/snappyimg/snappyimg-php/raw/master/logo.png" width="400">

This is a JavaScript implementation of Snappyimg URL builder. For more information about the service, go to [https://www.snappyimg.com/](https://www.snappyimg.com/).

### Installation

This library is available as [npm package](https://www.npmjs.com/package/@mangoweb/snappyimg):

```console
$ npm install --save-dev @mangoweb/snappyimg
```

### Usage

```javascript
import Snappyimg, { SnappyimgStage } from '@mangoweb/snappyimg'

const snappyimg = new Snappyimg('***', '***', SnappyimgStage.DEMO)
console.log(snappyimg.buildUrl('https://placekitten.com/2000/1500'))
```
