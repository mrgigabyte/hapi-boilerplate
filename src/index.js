// // const { server } = require('./server')
// // const {  }

// const { server } = require('./server')
// const config = require('./')
// import * as Configs from "./config";
// import * as Database from './models';

// if (process.env.NODE_ENV) {
//     let database = Database.init();
//     console.log(`Running enviroment ${process.env.NODE_ENV}`);

//     //Starting Application Server
//     Server.init().then((server: Hapi.Server) => {
//         server.start(() => {
//             console.log('Server running at:', server.info.uri);
//         });
//     });
// } else {
//     throw Error('Set NODE_ENV to "dev", "staging" or "prod".');
// }
