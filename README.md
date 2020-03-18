# sketch-image-downloader

A Sketch module to handle image downloads and insertion in documents

## Usage

### `insertImage(url, parentLayer)`

Inserts a bitmap layer in `parentLayer` with the contents of the image at `url`.
Returns the image layer as a Promise, so you can chain the function.

```
import sketch from 'sketch'
import insertImage from 'sketch-image-downloader'

insertImage('https://source.unsplash.com/random', sketch.getSelectedDocument().selectedPage)
```

With promises:

```
import sketch from 'sketch'
import insertImage from 'sketch-image-downloader'

insertImage('https://source.unsplash.com/random', sketch.getSelectedDocument().selectedPage).then(layer => {
  console.log(`Inserted layer: ${layer.name}`)
})
```

### `getImageFromURL(url)`

Downloads the image at `url` and returns a path to the local file, ready to use in your `DataProvider` plugins.
Returns the image path as a Promise, so you can chain the function.

```
import sketch from 'sketch'
import getImageFromURL from 'sketch-image-downloader'

getImageFromURL('https://source.unsplash.com/random')
```

With promises:

```
import sketch from 'sketch'
import getImageFromURL from 'sketch-image-downloader'

getImageFromURL('https://source.unsplash.com/random').then(path => {
  console.log(`Image saved to ${path}`)
})
```
