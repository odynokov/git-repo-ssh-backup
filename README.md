# Git repositories backup

Makes a backup of given git repositories through SSH.
Repositories to backup are stored in `repositories.json`.

# How it works

1. Specify repositories you want to backup in `repositories.json`.
2. Put both public and private ssh keys in `keys`.
3. Execute `npm run clone`.

Script will create a new directory in the project root directory with all repositories cloned.
