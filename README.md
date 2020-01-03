# Hapi-Boilerplate
Made using hapi.js (obv) and postgres


## How to run?
* *npm install*

install npx globally or locally
install gulp-cli globally (not necessary but recommended)
make sure npm and node are set to latest (recommended)

npm install

`npm run fix` : fixing linting errors
`npm run start`: script for running gulp. Make sure to mention the node environment using `NODE_ENV`

All the `errors` and `info` level data is logged on console and in `app.log` file in dev. mode. 


Minimal structural and lexical changes: 
1. adding a fix option under nodemon to lint the code at runtime
2. ensuring that all the promises are returned and callbacks are called when necessary for the ascyn processes
3. improving npm script


Libraries which might be considered for future work:

1. bcrypt
2. boom 
3. joi
4. jsonwebtoken            
5. node-schedule
6. handlebars
8. chai/mocha
9. stream to promise

Done:

1. good
2. winston
3. sequelize
4. swagger

winston transport logger: log files in the database/log-files or the console. 
