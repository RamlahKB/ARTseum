const username = require('./appConfig').username;
const password = require('./appConfig').password;
const dbName = require('./appConfig').dbname;
module.exports = {
    mongoDBUri : `mongodb+srv://${username}:${password}@cluster0.mdxef.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    privateKey : "artseumApp",
    mailPass : 'ram210496',
}


// http://localhost:3000/auth/google-auth

// googleClientID : 111759117883-24pnhsksorfno3lcbqp6jp7e711qhql5.apps.googleusercontent.com
// googleClientSecret : bmk1LirBRyT-2YiDs7yNR0hC      {1}


// googleClientSecret : T5ALGR8Sy9GaUuoitYY-33FR     {2}