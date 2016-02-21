'use strict'

const
  repos = require('./repositories'),
  getKeys = require('./utils/getKeys')(),
  cloneRepos = require('./utils/cloneRepos'),
  cloneBySsh = cloneRepos(repos)

getKeys
  .then(cloneBySsh)
  .catch(console.log)
