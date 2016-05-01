var path = require('path');

// Cargar ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite:
//    DATABASE_URL = sqlite:///
//    DATABASE_STORAGE = quiz.sqlite
// Usar BBDD Postgres:
//    DATABASE_URL = postgres://user:passwd@host:port/database

var sequelize = new Sequelize(null, null, null, 
	 						  { dialect:"sqlite",storage: "quiz.sqlite"
				              });

// Importar la definicion de la tabla Quiz de quiz.js
var Quiz = sequelize.import(path.join(__dirname,'quiz'));

//sequelize.sync() crea tabla

sequelize.sync().then(function() {
	return Quiz.count().then(function(c){
		if (c==0){
			return Quiz.create({question:'Capital de Italia', answer: 'Roma'})
			.then(fucntion(){
				console.log('Base de datos inicializada con datos');
			});
		}
	});
}).catch(fucntion(error){
	console.log("Error sincronizando las tablas de la BBDD:", error);
	process.exit(1);
})


exports.Quiz = Quiz;       // exportar definición de tabla Quiz