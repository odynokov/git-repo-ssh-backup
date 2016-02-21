'use strict'

const
  Git = require('nodegit'),
  path = require('path'),
  makedir = require('makedir').makedir,
  dateformat = require('dateformat'),
  getRepoName =  repo => path.basename(repo, '.git'),
  now = dateformat(new Date(), 'yyyy-mm-d-h-MM-ss'),
  base_path = path.resolve(__dirname, '..', 'backups'),
  clone = (repo, backup_path, options) =>
    Git.Clone(repo, backup_path, options)
      .catch(console.log)
      .then(_ => { console.log(getRepoName(repo), 'OK'.green) })

module.exports = repos => keys => {
  const options = {
    fetchOpts: {
      callbacks: {
        certificateCheck: _ => 1,
        
        credentials: (url, userName) =>
          Git.Cred.sshKeyNew(
            userName,
            keys.publicKey,
            keys.privateKey,
            '') // passphrase for key
      }
    },
    shallow: false
  }

  repos.forEach(repo => {
    const backup_path = path.resolve(base_path, now, getRepoName(repo))
    
    makedir(backup_path, (error, path) => {
      if (error) throw error

      clone(repo, path, options)
    })
  });
}