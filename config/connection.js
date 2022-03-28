const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;

if (process.env.DATABASE_URL) {
	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialectOptions: {
		  ssl: {
			 require: true,
		  },
		},
	});
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASS,
		{
			host: process.env.DB_HOST,
			dialect: 'mysql',
			port: process.env.DB_PORT,
			pool: {
				max: 5,
				min: 0,
				acquire: 30000,
				idle: 10000
			}
		}
	);
}

module.exports = sequelize;
