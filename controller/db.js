const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://test:root@cours-zyx04.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
let db = mongoose.connection; 
db.on('error', function (){ console.log("Erreur lors de la connexion"); }); 
db.once('open', function (){ console.log("Connexion à la base OK"); }); 

module.exports = mongoose