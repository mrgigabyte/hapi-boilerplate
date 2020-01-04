# Hapi-Boilerplate
Made using hapi.js (obv) and postgres

## Key features: 
* Plugin style architecture, simply write plugins and scale the app.
* uses async/await instead of traditional old-school callbacks
* uses winston-logger, hence transporting logs for future reference and APM integration is available!
* mainly uses 3 node environments: development, testing, production `dev, prod, test`
* easy to run, hassel free.
* easy 3rd party plugin integration, simply write the plugin using [standard hapi documentation](https://hapi.dev/tutorials/plugins/?lang=en_US) and put it in the plugin folder
* based on latest hapi v17+
* hapi-swagger integration, so you don't have to worry about writing a documentation for your REST-API, its automatically generated!

## Technology
* Hapi - Server side framework
* Sequelize - versatile ORM can be used for (postgres, sqlite, Microsoft SQL, mysql )
* Winston Logger - Logger mechanism 
* Hapi-Swagger - documentation generating library
* StandardJS - for linting the code based on the latest ES standards



## How to run?
* *npm install*

```install npx globally or locally
install gulp-cli globally (not necessary but recommended)
make sure npm and node are set to latest (recommended)```

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
5. joi

winston transport logger: log files in the database/log-files or the console. 
