const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.lists = require("./model.js").list(sequelize, Sequelize);
db.category = require("./model.js").category(sequelize, Sequelize);
db.contents = require("./model.js").contents(sequelize, Sequelize);

db.lists.hasOne(db.category) 
db.category.belongsTo(db.lists, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

db.category.hasOne(db.contents)
db.contents.belongsTo(db.category, {
  constraints: true,
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
})

module.exports = db;