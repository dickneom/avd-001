var Sequelize = require('sequelize');

var sequelize = new Sequelize('', '', '', {
    dialect: 'sqlite',
    storage: './db/dc.db',
    define: {
        //    timestamps: false,
        freezeTableName: true
    }
});

// conentando los modelos, relaciones en la base de datos en un db objeto
var db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Modelos - Tablas
db.User = require('./users')(sequelize, Sequelize);
db.Dress = require('./dresses')(sequelize, Sequelize);
db.Color = require('./dress_colors')(sequelize, Sequelize);
db.Brand = require('./dress_brands')(sequelize, Sequelize);
db.State = require('./dress_states')(sequelize, Sequelize);
db.Photo = require('./dress_photos')(sequelize, Sequelize);
db.Message = require('./messages')(sequelize, Sequelize);
db.Like = require('./likes')(sequelize, Sequelize);

// Relaciones
// Dress1 - User1 - Un vestido tine registrado un usuario propietario
db.Dress.belongsTo(db.User, {
    foreignKey: 'userId',
    as: 'user'
});

// Dress1 - Color1 - Un vestido registra un color
db.Dress.belongsTo(db.Color, {
    foreignKey: 'colorId',
    as: 'color'
});

// Dress1 - Photos* - Un vestido puede tener varias fotos
db.Dress.hasMany(db.Photo, {
    foreignKey: 'dressId',
    as: 'photos'
});

// Dress1 - Brand1 - Un vestido registra una marca
db.Dress.belongsTo(db.Brand, {
    foreignKey: 'brandId',
    as: 'brand'
});

// Dress1 - State1 - Un vestido registra un estado
db.Dress.belongsTo(db.State, {
    foreignKey: 'stateId',
    as: 'state'
});

// User1 - Dress* - Un usuario esta registrado en muchos vestidos
db.User.hasMany(db.Dress, {
    foreignKey: 'userId',
    as: 'dress'
});

// Message* - User1 - Un mensaje es para un usuario
db.Message.belongsTo(db.User, {
    foreignKey: 'userIdTo',
    as: 'userTo'
});

// Message* - User1 - Un mensaje es enviado por un usuario
db.Message.belongsTo(db.User, {
    foreignKey: 'userIdFrom',
    as: 'userFrom'
});

// USer1 - Message* - Un usuario puede recibir muchos mensajes
db.User.hasMany(db.Message, {
    foreignKey: 'userIdTo',
    as: 'userTo'
});

// USer1 - Message* - Un usuario puede enviar muchos mensajes
db.User.hasMany(db.Message, {
    foreignKey: 'userIdFrom',
    as: 'userFrom'
});

// Dress1 - Like* - Un vestido puede tener muchos likes
db.Dress.hasMany(db.Like, {
    foreignKey: 'dressId',
    as: 'Likes'
});

// Like1 - Dress1 - Un like es para un vestido
db.Like.belongsTo(db.Dress, {
    foreignKey: 'dressId',
    as: 'dress'
});

// User1 - Like* - Un usuario puede dar muchos likes
db.User.hasMany(db.Like, {
    foreignKey: 'userId',
    as: 'Likes'
});

// Like1 - User1 - Un like es dado por un solo usuario
/* db.Like.belongsTo(db.USer, {
  foreignKey: 'userId',
  as: 'user'
}) */

module.exports = db;