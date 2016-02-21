const path = require('path')

module.exports = repo => path.basename(repo, '.git')