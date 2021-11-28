# Simple CRUD API

## Istallation guide:
1. Clone this repo
2. Go to the folder `simple-crud-api`
3. Run `npm install` in command line 
4. Install `nodemon` globally `npm install -g nodemon` if you don't have it
5. Run `npm run start:dev` in command line to run in `development` mode
6. Run `npm run start:prod` in command line to run in `production` mode
7. Server will be available on `http://localhost:5000/`

## API usage:
-GET `/person` or `/person/${personId}` returns all persons or person with corresponding `personId`
-POST `/person` creates record about new person and store it in database
-PUT `/person/${personId}` updates record about existing person
-DELETE `/person/${personId}` deletes record about existing person from database
