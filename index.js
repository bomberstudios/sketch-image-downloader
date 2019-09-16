const path = require('path')
const os = require('os')
const util = require('util')
const fs = require('@skpm/fs')
const sketch = require('sketch')
const FOLDER = path.join(os.tmpdir(), 'com.bomberstudios.sketch-image-downloader')

export default function insertImage(url, parent) {
  return Promise.resolve(getImageFromURL(url).then(imagePath => {
    if (!imagePath) {
      // TODO: something wrong happened, show something to the user
      return
    } else {
      let imageRep = NSImage.alloc().initWithContentsOfFile(imagePath).representations().objectAtIndex(0)
      let w = imageRep.pixelsWide() / 2 // Because Retina
      let h = imageRep.pixelsHigh() / 2 // Because Retina
      let bitmap = new sketch.Image({
        image: imagePath,
        frame: {
          width: w,
          height: h
        },
        parent: parent
      })
      return bitmap
    }
  }))
}

export function getImageFromURL(url) {
  /*
    This function downloads an image from the given URL, and returns a path to the downloaded file, ready to be used by a DataProvider
  */
  // TODO: cache file
  return Promise.resolve(fetch(url)
    .then(res => res.blob())
    .then(saveTempFileFromImageData)
    .catch((err) => {
      console.error(err)
    }))
}

function saveTempFileFromImageData (imageData) {
  const guid = NSProcessInfo.processInfo().globallyUniqueString()
  const imagePath = path.join(FOLDER, `${guid}.jpg`)
  try {
    fs.mkdirSync(FOLDER)
  } catch (err) {
    // probably because the folder already exists
    // TODO: check that it is really because it already exists
  }
  try {
    fs.writeFileSync(imagePath, imageData, 'NSData')
    return imagePath
  } catch (err) {
    console.error(err)
    return undefined
  }
}
