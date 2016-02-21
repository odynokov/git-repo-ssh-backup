'use strict'

const
  Git = require('nodegit'),
  getRepoName =  require('./getRepoName'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  colors = require('colors'),
  dateformat = require('dateformat'),
  now = dateformat(new Date(), 'yyyy-mm-d-h-MM-ss')

module.exports = repos => keys => {

  const fetchOpts = {
    callbacks: {
      certificateCheck: _ => 1,
      
      credentials: (url, userName) =>
        Git.Cred.sshKeyNew(
          userName,
          keys.publicKey,
          keys.privateKey,
          '')
    }
  }

  repos.forEach(repo => {
    const backup_path = path.resolve(__dirname, '..', now, getRepoName(repo))
    mkdirp(backup_path, (err) => {

      if (err) {
        console.log(err.red)
        return
      }
      
       Git
        .Clone(repo, backup_path, {fetchOpts})
        .then(_ => { console.log(getRepoName(repo), 'OK'.green) })
        .catch(err => { console.log(err.red) })
      
    })
  });
}