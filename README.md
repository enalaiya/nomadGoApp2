## To Run:
Run `make run` in terminal to build docker container and populate database, view site at localhost:3000

## To use
Mouse over items in list to add children, delete, and edit. Press enter to save edits.
Collapse using arrows. Collapsed state presists through reload.

## If there's issues with running it
there's a chance you may need to change `'host.docker.internal'` in [docker-compose](docker-compose.yaml) and [index.js](/backend/index.js) to `'localhost'`
I think it should be 'localhost' but I developed this on a mac and that was what I had to do to get that working.
See the second comment on [this stackoverflow post](https://stackoverflow.com/questions/33357567/econnrefused-for-postgres-on-nodejs-with-dockers) for more info
