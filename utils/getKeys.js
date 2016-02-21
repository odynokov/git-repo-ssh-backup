'use strict'

const
  path = require('path'),
  glob = require('glob')

const
  getPublicKey = file => /^.+\.pub$/.test(file),
  keys = {},
  all_files_mask = path.join(__dirname, '../keys', '*')
    
module.exports = _ => new Promise((resolve, reject) => 

  glob(
    all_files_mask,
    {},
    (err, files) => {
      keys.publicKey = files.filter(getPublicKey)[0] || ''
      keys.privateKey = keys.publicKey.replace(/\.pub$/, '')

      if (keys.publicKey.length && keys.privateKey.length)
        resolve(keys)
      else
        reject('Some key is missed')
    })
)