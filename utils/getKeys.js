'use strict'

const
  path = require('path'),
  glob = require('glob'),
  fileExists = require('file-exists'),
  getPublicKey = file => /^.+\.pub$/.test(file),
  all_files_mask = path.join(__dirname, '../keys', '*'),
  keyFilesExist = keys => fileExists(keys.publicKey) && fileExists(keys.privateKey)

module.exports = _ => new Promise((resolve, reject) => {

  glob(
    all_files_mask,
    (err, files) => {
      if (err) throw err
      
      const keys = {}
      
      keys.publicKey = files.filter(getPublicKey)[0] || ''
      keys.privateKey = keys.publicKey.replace(/\.pub$/, '')
      
      if (keyFilesExist(keys))
        resolve(keys)
      else
        reject('Some key is missed')
    })
})